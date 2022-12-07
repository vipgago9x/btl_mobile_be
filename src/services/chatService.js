const chatDatabase = require("../database/chatDatabase");

const getChatList = async (id) => {
  return await chatDatabase.getChatList(id);
};
const readUserMessage = async (id1, id2) => {
  return await chatDatabase.readUserMessage(id1, id2);
};

const getUserMessages = async (id1, id2, pageSize, pageNumber) => {
  return await chatDatabase.getUserMessages(id1, id2, pageSize, pageNumber);
};


module.exports = {
  getChatList,
  readUserMessage,
  getUserMessages,
};
