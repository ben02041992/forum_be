import User from "../users/model.js";
import bcrypt from "bcrypt";
;
export const hashPass = async (req, res, next) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  try {
    const hashedPass = (req.body.password = await bcrypt.hash(
      req.body.password,
      saltRounds
    ));
    req.body.password = hashedPass;
    const data = hashedPass
    console.log(data)
    next();
  } catch (error) {
    console.log({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

export const comparePass = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ where: { email } });

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};
