const gameList = require("./model");

// GET all games
const get = (req, res) => {
  res.json(gameList);
};

// POST a new game
const post = (req, res) => {
  const newGame = req.body;
  gameList.push(newGame);
  res.json(newGame);
};

// PUT (update) a game by ID
const put = (req, res) => {
  const gameId = req.params.id;
  const updatedGame = req.body;
  gameList.forEach((game, index) => {
    if (game.id === gameId) {
      gameList[index] = updatedGame;
    }
  });
  res.json(updatedGame);
};

// DELETE a game by ID
const deleteGame = (req, res) => {
  const gameId = req.params.id;
  gameList = gameList.filter(game => game.id !== gameId);
  res.json({ message: 'Game deleted successfully' });
};

module.exports = {
  get:get,
  post: post,
  put: put,
  deleteGame: deleteGame,
};

