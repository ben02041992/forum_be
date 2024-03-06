const Router = require("express");

const router = express.Router();

import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../users/controllers";

router.get("/", displayHome);
router.get("/users", getUsers);
router.post("/signup", createUser);
router.delete("/removeUser", deleteUser);
router.put("/updateUser", updateUser);

module.exports = router;
