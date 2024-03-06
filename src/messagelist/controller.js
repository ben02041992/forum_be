const messageList = require("./model");

// GET==================================================

const get = (req, res) => {
  res.json(messageList);
};
// POST==================================================
const post = (req, res) => {
  const newMessage = req.body;
  messageList.push(newMessage);
  res.json(newMessage);
};
// PUT==================================================
const put = (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = req.body;
  messageList = messageList.map(message => (message.id === messageId ? updatedMessage : message));
  res.json(updatedMessage);
};
// DELETE==================================================
const deleteMessage = (req, res) => {
  const messageId = req.params.id;
  messageList = messageList.filter(message => message.id !== messageId);
  res.json({ message: 'Message deleted successfully' });
};

module.exports = {
  get: get,
  post:post,
  put: put,
  deleteMessage: deleteMessage,
};
