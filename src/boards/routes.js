import express from "express";
import { getBoards, getBoardById, newBoard } from "./controllers.js";

import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getBoards);

router.get("/board/:boardId", getBoardById);

router.post("/createBoard", /*verifyJwt,*/ newBoard);

export default router;
