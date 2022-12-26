require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("./configs/config");

// Libraries
const express = require("express");
var cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");

// Routes
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1ChatRouter = require("./v1/routes/chatRoutes");
const v1FileRouter = require("./v1/routes/fileRoutes");
const v1CategoryRouter = require("./v1/routes/categoryRoutes");
const v1ItemRouter = require("./v1/routes/itemRoutes");
const v1CardRouter = require("./v1/routes/cartRoutes");

// Middlewares
const authMiddleWare = require("./middlewares/authMiddleware");
const redocsGenerates = require("./services/redocsGenerates");

const app = express();
const http = require("http").Server(app);
const socketio = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 3000;

// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PROJECT API DOCS",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
      },
    ],
    // Paths to files containing OpenAPI definitions
  },
  apis: ["./src/v1/routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});
app.get("/api-docs", async function (req, res) {
  // console.log('specs' ,swaggerUi.setup(specs, { explorer: true }))
  var html = await redocsGenerates.setupExpressSwagger("/", app, specs, null);
  const sendPage = () => {
    // Content-Security-Policy: worker-src 'self' blob:
    res.setHeader(
      "Content-Security-Policy",
      "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * " +
      "'unsafe-inline' 'unsafe-eval'; child-src * 'unsafe-inline' " +
      "'unsafe-eval' blob:; worker-src * 'unsafe-inline' 'unsafe-eval' blob:; " +
      "connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';"
    );
    // whoosh
    res.send(html);
  };
  sendPage();
});
// Use
app.use(cors());
app.use(bodyParser.json());
app.use("/v1/file", v1FileRouter);
app.use("/v1/auth", v1AuthRouter);

app.use(authMiddleWare.requireAuth);
app.use("/v1/chat", v1ChatRouter);
app.use("/v1/category", v1CategoryRouter);
app.use("/v1/item", v1ItemRouter);
app.use("/v1/cart", v1CardRouter);

let socketList = [];

setInterval(() => {
  for (let i = 0; i < socketList.length; i++) {
    for (let j = 0; j < socketList[i].socketIds.length; j++) {
      if (
        socketio.sockets.sockets.get(socketList[i].socketIds[j]) &&
        socketio.sockets.sockets.get(socketList[i].socketIds[j]).connected
      ) {
      } else {
        socketList[i].splice(j, 1);
        j--;
      }
    }
  }
}, 15000);

// Socket
const chatDatabase = require("./database/chatDatabase");
socketio.on("connection", (socket) => {
  let isExisted = false;
  let payload;
  if (!socket.handshake.headers.authorization || socket.handshake.headers.authorization == "" || socket.handshake.headers.authorization.split(" ").length < 2) {

  } else {

    try {
      payload = jwt.verify(
        socket.handshake.headers.authorization.split(" ")[1],
        config.jwt_secret_key
      );
    } catch (e) {
      socket.disconnect();
    }
    for (let i = 0; i < socketList.length; i++) {
      if (socketList[i].userId === payload.id) {
        socketList[i].socketIds.push(socket.id);
        isExisted = true;
        break;
      }
    }
    if (!isExisted) {
      socketList.push({ userId: payload.id, socketIds: [socket.id] });
    }
    console.log(socketList);
  }

  socket.on("sendUserMessage", async (data) => {
    const res = await chatDatabase.saveUserMessage(
      payload.id,
      data.recipientUserId,
      data.content,
      data.type
    );
    console.log(res);
    if (!res.ok) {
      socket
        .to(socket.id)
        .emit("sendUserMessageFailure", { message: res.message });
    }
    let counter = 0;
    let mustSendIds = [];
    for (let i = 0; i < socketList.length; i++) {
      if (
        socketList[i].userId === payload.id ||
        socketList[i].userId === data.recipientUserId
      ) {
        counter += 1;
        mustSendIds.push(...socketList[i].socketIds);
        if (counter >= 2) break;
      }
    }
    console.log(mustSendIds);
    socket
      .to(mustSendIds)
      .emit("receiveUserMessage", { ...data, senderUserId: payload.id });
  });

  socket.on("disconnect", () => {
    console.log("Got disconnect: ", socket.id);
    for (let i = 0; i < socketList.length; i++) {
      for (let j = 0; j < socketList[i].socketIds.length; j++) {
        if (socketList[i].socketIds[j] === socket.id) {
          socketList[i].socketIds.splice(j, 1);
        }
      }
    }
    console.log(socketList);
  });
  socket.emit("hello", { text: "hello" });
});

http.listen(PORT, () => {
  console.log("Server up and running...");
});
