const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const User = require("./users/model");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  );
  next();
});
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Healthy" });
});

const syncTables = async () => {
  await User.sync();
};

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  syncTables();
  console.log("DB Connection is running");
});
