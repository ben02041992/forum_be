const express = require('express');
const { Router } = require("express");
const gameRouter = Router(); 
const { get, post, put, deleteGame } = require("./controller");


gameRouter.get('/gamelist/get', get);

gameRouter.post('/gamelist/post', post);

gameRouter.put('/gamelist/put/:id', put);

gameRouter.delete('/gamelist/delete/:id', deleteGame);

module.exports = gameRouter; 
