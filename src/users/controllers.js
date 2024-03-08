import User from "./model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    const user = await User.create({ username, email, password });

    return res
      .status(201)
      .json({ success: true, message: "User created", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "createUser",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { id, username, email, password } = req.user;

    const token = jwt.sign(
      { id: id, username, email, password },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRE,
      }
    );

    res.cookie("Auth", token, { httpOnly: true, maxAge: 900000 });
    await User.findOne(id, { isOnline: true }, { new: true });

    return res.status(200).json({
      success: true,
      message: `${username} logged in`,
      user: req.user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "loginUser",
      error: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    await User.findByIdAndUpdate(
      req.user.id,
      { isOnline: false },
      { new: true }
    );
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "verifyUser",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { isOnline: false }, { new: true });

    res.clearCookie("Auth");

    return res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "logoutUser",
      error: error.message,
    });
  }
};

export const onlineUsers = async (req, res) => {
  try {
    const users = await User.findAll({ online: true }, ["username", "online"]);

    return res.status(200).json({
      success: true,
      source: "onlineUsers",
      message: "Online users",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "onlineUsers",
      error: error.message,
    });
  }
};
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User updated", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "updateUserById",
      error: error.message,
    });
  }
};