const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let rooms = {};

io.on("connection", (socket) => {
  socket.on("join", ({ room, type }) => {
    if (type === "web") {
      rooms[room] = {
        web: socket.id,
        mobile: null,
      };
      socket.join(room);
    } else if (type === "mobile") {
      if (rooms[room]) {
        rooms[room].mobile = socket.id;
        socket.join(room);
        socket.to(room).emit("mobile-connected");
      } else {
        socket.emit("error", "Room not found");
      }
    }

    console.log(rooms);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    const mobileSocket = rooms[room]?.mobile;
    if (mobileSocket) {
      socket.to(mobileSocket).emit("web-disconnected");
      io.sockets.sockets.get(mobileSocket).leave(room);
    }
    delete rooms[room];
  });
});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});
