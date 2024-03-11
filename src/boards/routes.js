import express from "express";
import { getBoards, newBoard } from "./controllers.js";

import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getBoards);

router.post("/post", verifyJwt, newBoard);

export default router;
