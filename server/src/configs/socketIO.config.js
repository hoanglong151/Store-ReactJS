const { Server } = require("socket.io");

function connectSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: "http://localhost:3000/",
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
}

module.exports = connectSocket;
