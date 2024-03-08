import express from "express";

import {
  updateUserById,
  verifyUser,
  loginUser,
  createUser,
  getUserById,
  logOut,
} from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import verifyJwt from "../middleware/jwt.js";

const router = express.Router();

console.log(hashPass, createUser);

router.post("/signup", hashPass, createUser);
router.post("/login", comparePass, loginUser);
router.get("/verifyUser", verifyJwt, verifyUser);
router.get("/:id", verifyJwt, getUserById);
router.put("/update/:id", updateUserById);
router.delete("/logout", verifyJwt, logOut);

export default router;
