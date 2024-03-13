import express from "express";

import { getBoards, getBoardById, getBoardByName, newBoard } from "./controllers.js";


import { verifyJwt } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getBoards);

router.get("/board/:boardId", getBoardById);

router.get("board/game/:game", getBoardByName);

router.post("/createBoard", /*verifyJwt,*/ newBoard);

export default router;
