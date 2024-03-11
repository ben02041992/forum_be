import Message from "./model.js";

// GET==================================================

export const getMessages = (req, res) => {
  res.json(message);
};
// POST==================================================
export const newMessage = (req, res) => {
  const newMessage = req.body;
  res.status(200).json(newMessage);
};

// DELETE==================================================
export const deleteMessageById = (req, res) => {
  const messageId = req.params.id;
  messageList = messageList.filter((message) => message.id !== messageId);
  res.json({ message: "Message deleted successfully" });
};
