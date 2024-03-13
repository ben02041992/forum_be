export const newBoard = async (req, res) => {
  try {
    const { id, title } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const board = await Board.create({
      id,
      title,
    });

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();

    res.status(200).json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing board ID" });
    }

    const board = await Board.findByPk(id);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
