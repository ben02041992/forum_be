import express from "express";
import { getBoards, newBoard, getBoardById } from "./controllers.js";

import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getBoards);
router.get("/:id", getBoardById);
router.post("/post", newBoard);

export default router;
