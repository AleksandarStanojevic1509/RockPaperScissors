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

io.on("connection", (sock) => {
// console.log('someon conected')


    if (waitingPlayer) {
        // waitingPlayer.on("username", (user) => {
        //     console.log('waiting ' + user)
        // });
        
        // sock.on("username", (user) => {
        //     console.log('sok ' + user)
        // });
        
        new Game(waitingPlayer, sock)
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit("message", "Waiting for an opponent!");
    }

    // server dobija poruke od soketa (sock.on) i salje ih svima na serveru (io.emit)
    sock.on("message", (text) => {
        io.emit("message", text);
    });

    sock.on("username", (user) => {
        io.emit("username", user)
    });

    // server dobija poteze od soketa (sock.on) i salje ih svima na serveru (io.emit)
    // sock.on("game", (turn) => {
    //     io.emit("game", turn);
    // });
});

server.on("error", (err) => {
console.error("Error:", err);
});

server.listen(8001, () => {
console.log("PRS started on 8080");
});
