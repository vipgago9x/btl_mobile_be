const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatList = async (id) => {
  try {
    const queryUser = `
    select id, email, fullname, avatar,
    (select "isRead" from "Message" where ("Message"."recipientUserId" = ${id} and "Message"."senderUserId" = "User"."id") 
      or ("Message"."senderUserId" = ${id} and "Message"."recipientUserId" = "User"."id") 
    order by "Message"."id" limit 1) as "isRead"
      from "User" where "User".status != 0 and EXISTS(select "id" from "Message" where ("Message"."recipientUserId" = ${id} and "Message"."senderUserId" = "User"."id") 
      or ("Message"."senderUserId" = ${id} and "Message"."recipientUserId" = "User"."id")) order by 
      (select "id" from "Message" where ("Message"."recipientUserId" = ${id} and "Message"."senderUserId" = "User"."id") 
      or ("Message"."senderUserId" = ${id} and "Message"."recipientUserId" = "User"."id") 
    order by "Message"."id" limit 1)
    limit 50
    `;
    const users = await prisma.$queryRawUnsafe(queryUser);
    return {
      ok: true,
      users: users,
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    };
  } finally {
    prisma.$disconnect();
  }
};

const readUserMessage = async (id1, id2) => {
  try {
    id1 = parseInt(id1);
    id2 = parseInt(id2);
    await prisma.message.updateMany({
      where: {
        OR: [
          { AND: [{ senderUserId: id1 }, { recipientUserId: id2 }] },
          { AND: [{ senderUserId: id2 }, { recipientUserId: id1 }] },
        ],
      },
      data: {
        isRead: true,
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    };
  } finally {
    prisma.$disconnect();
  }
};

const getUserMessages = async (id1, id2, pageSize, pageNumber) => {
  try {
    id1 = parseInt(id1);
    id2 = parseInt(id2);
    pageSize = parseInt(pageSize);
    pageNumber = parseInt(pageNumber);
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { AND: [{ senderUserId: id1 }, { recipientUserId: id2 }] },
          { AND: [{ senderUserId: id2 }, { recipientUserId: id1 }] },
        ],
      },
      orderBy: [{ id: "asc" }],
    });
    return {
      ok: true,
      messages,
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    };
  } finally {
    prisma.$disconnect();
  }
};


const saveUserMessage = async (
  senderUserId,
  recipientUserId,
  content,
  type
) => {
  try {
    senderUserId = parseInt(senderUserId);
    recipientUserId = parseInt(recipientUserId);
    type = parseInt(type);
    const messages = await prisma.message.create({
      data: {
        senderUser: {
          connect: { id: senderUserId },
        },
        recipientUser: {
          connect: { id: recipientUserId },
        },
        type: type,
        content: content,
        status: 1,
      },
    });
    return {
      ok: true,
      messages,
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    };
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  getChatList,
  readUserMessage,
  getUserMessages,
  saveUserMessage,
};
