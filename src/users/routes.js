import express from "express";

import { updateUserById, logIn, signup, logout } from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import { signJwt, verifyJwt, comparePassword } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", signup, hashPassword);
router.post("/login", logIn, comparePassword, signJwt);
router.put("/update/:id", verifyJwt, updateUserById);
router.delete("/logout", verifyJwt, logout);

export default router;
