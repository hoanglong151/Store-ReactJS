const { Server } = require("socket.io");
const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
    cors: {
      origin: "https://cleanfood.vercel.app",
    },
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
};

module.exports = initSocket;
