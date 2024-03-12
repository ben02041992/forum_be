import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "./users/routes.js";
import boardRouter from "./boards/routes.js";
import messageRouter from "./messages/routes.js";

import User from "./users/model.js";
import Board from "./boards/model.js";
import Message from "./messages/model.js";

const port = process.env.PORT || 8080;
const secret = process.env.SECRET;
const app = express();

const syncTables = async () => {
  Board.hasMany(Message);
  Message.belongsTo(Board);

  await User.sync();
  await Board.sync();
  await Message.sync();
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use("/users", userRouter);
userRouter.use(express.Router());
messageRouter.use(express.Router());
boardRouter.use(express.Router());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Healthy" });
});

app.get("/cookie", (req, res) => {
  res.cookie(req.token, secret, { httpOnly: true, signed: true }).send;
});

app.get("/", (req, res) => {
  res.cookie(req.signedCookies);
});

app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.use("/boards", boardRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  syncTables();
});
