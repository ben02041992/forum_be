import User from "./model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
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

export const logIn = async (req, res) => {
  const { id, username, email, name } = req.user;

  try {
    const token = JWT.sign(
      { id, email, username, name },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60000),
    });

    return res.status(200).json({
      success: true,
      message: `account ${email} has logged in`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { loggedIn: false }, { new: true });

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