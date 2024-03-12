import express from "express";

import { updateUserById, logIn, signup, logout } from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import { signJwt, verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", hashPass, signup);
router.post("/login", comparePass, logIn);
router.put("/update/:id", verifyJwt, updateUserById);
router.delete("/logout", verifyJwt, logout);

export default router;
