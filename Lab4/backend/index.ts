import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 3000;

app.use(express.static("public"))

io.on("connection", socket => {
    let username = "User"
    socket.on(`name`, (name) => {
        username = name
        io.emit("login", `${username} connected`)
        console.log(`${username} connected`)
    })

    socket.on("message", (message) => {
        io.emit("message", message)
        console.log(message)
    })

    socket.on("disconnecting", () => {
        io.emit("logout", `${username} disconnected`)
        console.log(`${username} disconnected`)
    })
})

server.listen(port, () => console.log(`Server has been started on port ${port}`))