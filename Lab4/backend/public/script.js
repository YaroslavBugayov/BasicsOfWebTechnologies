let name
const input = prompt("Enter your name", "Unknown user")
name = input !== "" ? input : "Unknown user"

const socket = io()
const form = document.getElementById("form")
const message = document.getElementById("message_field")
const container = document.getElementById("container")

socket.emit("name", name)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    socket.emit("message", `${name}: ${message.value}`)
    message.value = ""
})

socket.on("message", (message) => {
    const li = document.createElement("li")
    li.className = "message"
    li.innerText = message
    container.appendChild(li)
});

socket.on("login", (message) => {
    const li = document.createElement("li")
    li.className = "log"
    li.innerText = message
    container.appendChild(li)
});

socket.on("logout", (message) => {
    const li = document.createElement("li")
    li.className = "log"
    li.innerText = message
    container.appendChild(li)
});