import express from "express";

import { createMessage, getMessagesById } from "../Messages/controller";

const router = express.Router();

messageRouter.get("/:userId", getMessagesByUser);
messageRouter.post("/newMessage", createMessage);

export default messageRouter;
