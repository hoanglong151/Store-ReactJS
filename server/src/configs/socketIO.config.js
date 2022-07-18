const { createServer } = require("http");
const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: "https://cleanfood.vercel.app/",
// });

const io = new Server({
  cors: "https://cleanfood-yq8rp9dc9-hoanglong151.vercel.app/",
});

io.on("connection", (socket) => {
  alert("OK");
  socket.on("payment", (arg) => {
    // socket.broadcast.emit("message", { message: "Update Bills" });
    io.emit("message", { message: "Update Bills" });
  });
  socket.on("updateBill", (arg) => {
    // socket.broadcast.emit("message", { message: "Update Bills" });
    io.emit("message", { message: "Update Bills" });
  });
});

// httpServer.listen(8080);

module.exports = io;
