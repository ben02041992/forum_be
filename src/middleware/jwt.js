export const signJwt = async (req, res, next) => {
  const cookies = req.headers.cookies;
  const user = req.user;
  token = cookies;

  try {
    const token = jwt.sign(
      { id: id, username, email, password },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRE,
      }
    );
    console.log(token);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
      source: "signjwt",
      error: error.message,
    });
  }
};

export const verifyJwt = async (req, res, next) => {
  const cookies = req.headers.cookie;

  const token = cookies;

  console.log(token);

  if (!token) {
    res.clearCookie("Auth");
    return res
      .status(401)
      .json({ success: false, source: "verifyJwt", message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("Auth");
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
};
