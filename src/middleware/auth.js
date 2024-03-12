import bcrypt from "bcrypt";
import User from "../users/model.js";
import e from "express";

export const hashPass = async (req, res, next) => {
  console.log(req.body);
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  try {
    // if (!password) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Password is required" });
    // }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;
    console.log(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const comparePass = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    console.log(req.body);
    // if (!password || !email) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and password are required",
    //   });
    // }

    const user = await User.findOne({ where: { username: req.body.username } });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        source: "match",
      });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    console.log(req.user);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      source: "comparePassword",
      errormessage: error.message,
      error: error,
    });
  }
};
