const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: '*'
	}
});

let rooms = {}

io.on("connection", (socket) => {
	console.log("user connected");
	socket.on("join", room => {
		// rooms[room] = {
		// 	type: "mobile",
		// 	socket
		// }
		console.log(`mobile joined the room ${room}`)
		socket.join(room);
		if (Object.keys(rooms[room]).length > 0) {
			socket.to(room).emit("connected");
		}
	});

})

server.listen(5000, () => {
	console.log("Server started on port 5000");
});