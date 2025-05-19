import { Server } from "socket.io";
import http from "http"
import app from "../app"

const server = http.createServer(app)
const io = new Server(server,{cors:{origin:"*"}})

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    socket.on ("updateCart",(cart)=>{
        io.emit("cartUpdated",cart)
    })

    socket.on("disconnect",()=>console.log("user disconnected"))
})

export  {server,io}


