import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// export const verifyToken = async (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   res.json({ token });
//   next();
// };

const verifyJwt = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token)

  if (!token) {
    res.clearCookie("x-access-token")
    return res.status(401).json({ success: false, source: 'jwt'
    , message: 'No valid token'})
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET, (err, user) => {
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "unauthorized"});
  }
};

export default verifyJwt