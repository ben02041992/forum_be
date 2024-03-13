import Board from "./model.js";

// POST==================================================
export const newBoard = async (req, res) => {
    try{
      const { game } = req.body;
      const board = await Board.create({ game })
      return res.status(201).json({
        success: true,
        message: "Board created",
        board
      })
    }
    catch(error){
      return res.status(500).json({
      success: false,
      message: "Server error",
      source: "newBoard",
      error: error.message,
    });
    }
  };

// GET======================================================
export const getBoards = async(req, res) => {
    try{
        const boards = await Board.findAll({});
        return res.status(200).json({
          success: true,
          message: "Got all boards",
          boards
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            source: "getBoards",
            error: error.message,
          });
    }
};
export const getBoardById = async(req, res) =>{
  try{
    const board = await Board.findOne({ where: { id: req.params.boardId } });
    if(board){
      return res.status(200).json({
        success: true,
        message: "Got board",
        board
      })
    }
    else{
      throw new Error(`Board with id '${req.params.boardId}' not found`);
    }
  }
  catch(error){
    res.status(500).json({
        success: false,
        message: "Server error",
        source: "getBoardById",
        error: error.message,
      });

  }
};
