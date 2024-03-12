import Message from "./model.js";
import Board from "../boards/model.js";

// GET==================================================

export const getMessages = async(req, res) => {
  try{
    const messages = await Message.findAll({});
    return res.status(501).json({
      success: true,
      message: "Got messages",
      messages
    })
  }
  catch(error){
    return res.status(500).json({
    success: false,
    message: "Server error",
    source: "getMessages",
    error: error.message,
  });
  }
};

export const getMessagesByBoard = async(req, res) => {
  try{
    const messages = await Message.findAll({ where: { boardId: req.params.boardId }});
    const board = await Board.findOne({ where: {id: req.params.boardId} });
    return res.status(501).json({
      success: true,
      message: `Got messages from the '${board.game}' board`,
      messages
    })
  }
  catch(error){
    return res.status(500).json({
    success: false,
    message: "Server error",
    source: "getMessages",
    error: error.message,
  });
  }
};

export const getMessageById = async(req,res) => {
  try{
    const message = await Message.findOne({ where: { id: req.params.id } });
    if(message){
      return res.status(501).json({
        success: true,
        message: "Got message",
        message
      })
    }
    else{
      throw new Error(`Message with id '${req.params.id}' not found`);
    }
  }
  catch(error){
    res.status(500).json({
        success: false,
        message: "Server error",
        source: "getMessageById",
        error: error.message,
      });
  }
}

// POST==================================================
export const newMessage = async (req, res) => {
  try{
    const { username, content, boardId } = req.body;
    const message = await Message.create({username, content, boardId});
    return res.status(501).json({
      success: true,
      message: "Message sent",
      message
    })
  }
  catch(error){
    return res.status(500).json({
    success: false,
    message: "Server error",
    source: "newMessage",
    error: error.message,
  });
  }
};

// PUT ====================================================
export const updateMessageById = async(req,res)=> {
  try{
    const oldMsg = await Message.findOne({ where: { id: req.params.id } });
    const newMessageData = {
      username: oldMsg.username,
      content: req.body.content,
      boardId: oldMsg.boardId
    }
    await Message.update(newMessageData, { where: { id: req.params.id } });
    const newMsg = await Message.findOne({ where: { id: req.params.id } });
    return res.status(501).json({
      success: true,
      message: `Message with id '${req.params.id}' has been updated`,
      "old message data": oldMsg.content,
      "new message data": newMsg.content,
    })
  }
  catch(error){
    return res.status(500).json({
    success: false,
    message: "Server error",
    source: "updateMessageById",
    error: error.message,
  });
  }
}

// DELETE==================================================
export const deleteMessageById = async(req, res) => {
  try{
    const message = await Message.findOne({ where: { id: req.params.id } });
    if(message){
      await Message.destroy({where: { id: req.params.id} });
      return res.status(501).json({
        success: true,
        message: `Message with id '${req.params.id}' was deleted`,
        message
      })
    }
    else{
      throw new Error(`Message with id '${req.params.id}' not found`);
    }
  }
  catch(error){
    res.status(500).json({
        success: false,
        message: "Server error",
        source: "deleteMessageById",
        error: error.message,
      });
  }
};
