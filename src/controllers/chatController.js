const chatService = require("../services/chatService");

const getChatList = async (req, res) => {
  const data = await chatService.getChatList(req.body.currentUserId);
  if (!data.ok) {
    return res.status(500).send({
      ok: false,
      payload: null,
      message: data.message,
    });
  }
  res.send({
    ok: true,
    payload: data.users,
    message: "",
  });
};

const readUserMessage = async (req, res) => {
  const data = await chatService.readUserMessage(req.query.id1, req.query.id2);
  if (!data.ok) {
    return res.status(500).send({
      ok: false,
      payload: null,
      message: data.message,
    });
  }
  res.send({
    ok: true,
    payload: null,
    message: "",
  });
};


const getUserMessages = async (req, res) => {
  const data = await chatService.getUserMessages(
    req.query.id1,
    req.query.id2,
    req.query.pageSize,
    req.query.pageNumber
  );
  if (!data.ok) {
    return res.status(500).send({
      ok: false,
      payload: null,
      message: data.message,
    });
  }
  res.send({
    ok: true,
    payload: data.messages,
    message: "",
  });
};


module.exports = {
  getChatList,
  readUserMessage,
  getUserMessages,
};
