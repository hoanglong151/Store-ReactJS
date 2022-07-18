const { createServer } = require("http");
const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: "http://localhost:3000",
// });

const io = new Server({
  cors: "https://cleanfood-yq8rp9dc9-hoanglong151.vercel.app/",
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

console.log("Connected");

// httpServer.listen(8080);

module.exports = io;
