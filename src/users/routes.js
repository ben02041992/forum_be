import express from "express";

import {
  updateUserById,
  login,
  register,
  verifyUser,
  logout,
} from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import verifyJwt from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", hashPass, register);
router.post("/login", comparePass, login);
router.get("/verify", verifyJwt, verifyUser);
router.put("/update/:id", verifyJwt, updateUserById);
router.delete("/logout", verifyJwt, logout);

export default router;
