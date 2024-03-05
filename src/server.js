import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Healthy" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
