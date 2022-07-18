// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   /* options */
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("payment", (arg) => {
//     // socket.broadcast.emit("message", { message: "Update Bills" });
//     io.emit("message", { message: "Update Bills" });
//   });
//   socket.on("updateBill", (arg) => {
//     // socket.broadcast.emit("message", { message: "Update Bills" });
//     io.emit("message", { message: "Update Bills" });
//   });
// });

// httpServer.listen(8080);

// // server.listen(process.env.PORT || 8080, (err, server) => {
// //   console.log("OK");
// // });

// module.exports = io;
