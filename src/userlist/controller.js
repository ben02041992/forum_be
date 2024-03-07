const User = require("./model");

//===================================login====================================//


const login = async (req, res) => {
  try {
    
    if (req.authCheck) {
      const user = {
        id: req.authCheck.id,
        username: req.authCheck.username,
      };

      res
        .status(201)
        .json({ message: "persistant login successful", user: user });
      return;
    }

   
    const user = {
      id: req.user.id,
      username: req.user.username,
      
    };

    res.status(201).json({ message: "login success", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};


//===================================signUpUser====================================//
const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ message: "user added", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
    

//===================================Get allUsers====================================//

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "all users", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

//===================================getOneUser====================================//

const getOneUser = async (req, res) => {
  res.status(201).json({ message: "login success", user: req.user });
};

//=====================================deleteUser==================================//
const deleteUser = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userToDelete = await User.findOne({
      where: { id: userId },
    });

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    await userToDelete.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {

    res.status(500).json({ message: error.message, error: error });
  }
};

//=====================================deleteAllUsers==================================//
const deleteAllUsers = async (req, res) => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
    });

    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: error.message, error: error });
  }
};
//=====================================updateUser==================================//
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the request parameters" });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const key in req.body) {
      user[key] = req.body[key];
    }
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
   
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  login: login,
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  deleteUser: deleteUser,
  deleteAllUsers: deleteAllUsers,
  updateUser: updateUser,
};