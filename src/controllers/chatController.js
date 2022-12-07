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
    payload: {
      users: data.users,
      groups: data.groups,
    },
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

const readGroupMessage = async (req, res) => {
  const data = await chatService.readGroupMessage(req.query.id);
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

const getGroupMessages = async (req, res) => {
  const data = await chatService.getGroupMessages(
    req.query.id,
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
    payload: { messages: data.messages, admin: data.admin },
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

const createGroupChat = async (req, res) => {
  const data = await chatService.createGroupChat(
    req.body.currentUserId,
    req.body.name
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
    payload: { id: data.groupId },
    message: "",
  });
};
const deleteGroupChat = async (req, res) => {
  const data = await chatService.deleteGroupChat(req.query.id);
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
const getGroupChatUsers = async (req, res) => {
  const data = await chatService.getGroupChatUsers(req.query.id);
  if (!data.ok) {
    return res.status(500).send({
      ok: false,
      payload: null,
      message: data.message,
    });
  }
  res.send({
    ok: true,
    payload: data.data,
    message: "",
  });
};
const addGroupChatUser = async (req, res) => {
  const data = await chatService.addGroupChatUser(req.body.id, req.body.email);
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
const removeGroupChatUser = async (req, res) => {
  const data = await chatService.removeGroupChatUser(
    req.query.id,
    req.query.userId
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
    payload: null,
    message: "",
  });
};
module.exports = {
  getChatList,
  readGroupMessage,
  readUserMessage,
  getGroupMessages,
  getUserMessages,
  createGroupChat,
  deleteGroupChat,
  getGroupChatUsers,
  addGroupChatUser,
  removeGroupChatUser,
};
