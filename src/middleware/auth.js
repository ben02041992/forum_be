import bcrypt from "bcrypt";

export const hashPass = async (req, res, next) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  try {
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const hashed = await bcrypt.hash(password, saltRounds);
    req.body.password = hashed;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      source: "hashPassword",
      error: error.message,
    });
  }
};

export const comparePass = async (req, res, next) => {
  try {
    const { password, username } = req.body;

    if (!password || !username) {
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
      password,
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      user.password;
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };

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
