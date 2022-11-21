const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');

const mysql = require('mysql2');
const { isStringObject } = require('util/types');

let users = [];

// Connection to MySQL database //
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "chat",
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

// Backend server //
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log(`$: ${socket.id} just connected`);
    socket.on("newUser", (data) => {
        users.push(data);
        io.emit("newUserResponse", users);
    });
    socket.on("addElem", (username) => {
        con.query(`INSERT INTO users(username) VALUES("${username}")`)
    });
    socket.on("message", (data) => {
        io.emit("messageResponse", data);
    });
    socket.on("disconnect", () => {
        users = users.filter((user) => user.socketID !== socket.id);
        io.emit("newUserResponse", users);
        socket.disconnect();
        console.log("$: a user just disconnected");
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "Hello world",
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});