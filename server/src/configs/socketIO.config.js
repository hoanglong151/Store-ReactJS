const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: "http://localhost:3000",
});

// const io = new Server({
//   cors: "http://localhost:3000",
// });

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

console.log("Connected");

// httpServer.listen(process.env.PORT);

module.exports = io;
