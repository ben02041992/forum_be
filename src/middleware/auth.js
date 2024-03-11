import bcrypt from "bcrypt";
import User from "../users/model.js";

export const hashPass = async (req, res, next) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  try {
    const password = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    req.body.password = hashedPassword;

    next();

    return { data };
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

    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        source: "match",
        error: error.message,
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
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "comparePassword",
      error: error.message,
    });
  }
};
