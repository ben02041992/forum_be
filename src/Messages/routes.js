import express from "express";

import { getMessages, newMessage, deleteMessageById } from "./controllers.js";

const router = express.Router();

router.get("/", getMessages);

router.post("/newMessage", newMessage);

router.delete("/delete/:id", deleteMessageById);

export default router;
