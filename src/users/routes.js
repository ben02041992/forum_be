import express from "express";

import {
  updateUserById,
  logIn,
  signup,
  loggedIn,
  logout,
} from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import { signJwt, verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", signup, hashPass);
router.post("/login", logIn, comparePass, signJwt);
router.put("/update/:id", verifyJwt, updateUserById);
router.delete("/logout", verifyJwt, logout);

export default router;
