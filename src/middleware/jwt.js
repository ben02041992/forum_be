import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  res.json({ token });
  next();
};

export const verifyJwt = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    const verify = await jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) throw err;
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
