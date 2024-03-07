const express = require('express');
const messageRouter = express.Router(); 
const { get, post, put, deleteMessage } = require("./controller"); 


messageRouter.get('/messagelist/get', get);

messageRouter.post('/messagelist/post', post);

messageRouter.put('/messagelist/put/:id', put);

messageRouter.delete('/messagelist/delete/:id', deleteMessage);

module.exports = messageRouter; 