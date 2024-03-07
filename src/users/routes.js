import express from "express";

import { userLogin } from "./controllers.js";
import { createUser } from "./controllers.js";
import { deleteUser } from "./controllers.js";
import { getUserById } from "./controllers.js";
import { updateUserById } from "./controllers.js";

import { hashPass } from "../middleware/auth.js";
import { comparePass } from "../middleware/auth.js";
import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.post("/signup", hashPass, createUser);
router.post("/login", comparePass, verifyJwt, userLogin);
router.get("/:id", getUserById);
router.put("/updateUser/:id", updateUserById);
router.delete("/:userId", deleteUser);

export default router;
