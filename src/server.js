require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRouter = require("./userlist/routes"); 
const messageRouter = require("./messagelist/routes"); 
const gameRouter = require("./gamelist/routes"); 

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(messageRouter);
app.use(gameRouter);

app.listen(port, () => {
  
  console.log(`Server is listening on port ${port}`);
});
