import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./users/routes.js";
import User from "./users/model.js";
// import Conversation from "./conversation/model.js";

const port = process.env.PORT || 8080;

const app = express();

const syncTables = async () => {
  await User.sync();
  // await Conversation.sync();
};

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Healthy" });
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  syncTables();
  console.log("DB Connected");
});

export default app;
