export const newBoard = (req, res) => {
  const board = req.body;
  board.push(newBoard);
  res.json(board);
};

export const getBoards = (req, res) => {};
