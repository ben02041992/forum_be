import express from "express";

import { createMessage, getMessagesById } from "../Messages/controller";

const router = express.Router();

messageRouter.get("/messages/:id", getMessagesById);
messageRouter.post("/newMessage", createMessage);

export default messageRouter;
