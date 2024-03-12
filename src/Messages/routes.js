import express from "express";

import { getMessages, newMessage, deleteMessageById, getMessagesByBoard, getMessageById, updateMessageById } from "./controllers.js";

const router = express.Router();

router.get("/", getMessages);

router.get("/board/:boardId", getMessagesByBoard);

router.post("/newMessage", newMessage);

router.get("/:id", getMessageById);

router.put("/:id", updateMessageById);

router.delete("/delete/:id", deleteMessageById);

export default router;
