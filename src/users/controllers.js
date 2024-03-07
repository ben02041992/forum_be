import User from "./model.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, password fields required",
      });
    }

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      const user = await User.create({
        email,
        username,
        password,
      });
      res.status(201).json({
        success: true,
        message: `User: ${username} created successfully. Please login to continue.`,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;
  try {
    const user = await User.findOne({ email });
    if (user) {
      await jwt.sign(user, secret, { expiresIn: 1000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  req = res.send({ message: "updateuserbyID" });
};

export const deleteUserById = async (req, res) => {
  req = res.send({ message: "deleteuserbyID" });
};

export const deleteUser = async (req, res) => {};
