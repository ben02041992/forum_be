import express from "express";

import {
  getAllMessages,
  postNewMessage,
  deleteMessageById,
} from "./controllers.js";

const router = express.Router();

router.get("/", getAllMessages);

router.post("/newMessage", postNewMessage);

router.delete("/delete/:id", deleteMessageById);

export default router;
