import User from "./model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    const user = await User.create({ username, email, password });

    return res
      .status(201)
      .json({ success: true, message: "User created", user });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error",
        source: "createUser",
        error: error.message,
      });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(201).json({ message: "All Users: ", allUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  req = res.send({ message: "userbyID" });
};

export const loginUser = async (req, res) => {
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
        expiresIn: process.env.EXPIRY,
      }
    );

    res.cookie("4rum", token, { httpOnly: true, maxAge: 6000 });
    return res.status(200).json({
      success: true,
      message: `${username} logged in successfully`,
      user: req.user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    await User.findByIdAndUpdate(
      req.user.id,
      { verified: false },
      { setVerified: true }
    );
  }
  return res.status(500).json({
    success: false,
    message: "sever error",
    source: "verifyUser",
    error: error.message,
  });
};

export const updateUserById = async (req, res) => {
  req = res.send({ message: "updateuserbyID" });
};

export const deleteUserById = async (req, res) => {
  req = res.send({ message: "deleteuserbyID" });
};

export const logOut = async (req, res) => {};

