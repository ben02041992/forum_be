import express from "express";

 
import {
  updateUserById,
  successfulLogin,
  userLogin,
  createUser,
  getUserById,
  deleteUserById,
} from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", hashPass, createUser);
router.post("/login", comparePass, verifyJwt, userLogin);
router.get("/home", successfulLogin);
router.get("/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

export default router;
