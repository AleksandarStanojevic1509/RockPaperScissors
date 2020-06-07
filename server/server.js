const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Game = require('./serverSideGameLogic')

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;
let waitU = ''

io.on("connection", (sock) => {

    if (waitingPlayer) {
        new Game(waitingPlayer, sock, waitU)
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit("message", "Waiting for an opponent!");
    }

    // server dobija poruke od soketa (sock.on) i salje ih svima na serveru (io.emit)
    sock.on("message", (text) => {
        io.emit("message", text);
    });

});

server.on("error", (err) => {
console.error("Error:", err);
});


server.listen(8180, () => {
console.log("PRS started on 8181");
});
