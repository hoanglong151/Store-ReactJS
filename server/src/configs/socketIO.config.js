const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: process.env.CLIENT_URL,
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

httpServer.listen(8080);

module.exports = io;
