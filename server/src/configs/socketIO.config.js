// const express = require("express");
// const app = express();
// const server = require("http").createServer(app, {
//   cors: {
//     origin: "*",
//   },
// });
// const io = require("socket.io")(server);
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("payment", (arg) => {
    // socket.broadcast.emit("message", { message: "Update Bills" });
    io.emit("message", { message: "Update Bills" });
  });
  socket.on("updateBill", (arg) => {
    // socket.broadcast.emit("message", { message: "Update Bills" });
    io.emit("message", { message: "Update Bills" });
  });
});

httpServer.listen(process.env.PORT || 8080);

// server.listen(process.env.PORT || 8080, (err, server) => {
//   console.log("OK");
// });

module.exports = io;
