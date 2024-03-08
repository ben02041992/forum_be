import Message from "./model.js";

// GET==================================================

export const getAllMessages = (req, res) => {
  res.json(messageList);
};
// POST==================================================
export const postNewMessage = (req, res) => {
  const newMessage = req.body;
  message.push(newMessage);
  res.json(newMessage);
};
// PUT==================================================
export const ReplyToBoard = (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = req.body;
  message = message.map((message) =>
    message.id === messageId ? updatedMessage : message
  );
  res.json(updatedMessage);
};
// DELETE==================================================
export const deleteMessageById = (req, res) => {
  const messageId = req.params.id;
  messageList = messageList.filter((message) => message.id !== messageId);
  res.json({ message: "Message deleted successfully" });
};
