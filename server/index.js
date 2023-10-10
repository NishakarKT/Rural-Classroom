// config
import "./config/config.js";

// imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Router from "./routes.js";
import http from "http";
import { Server } from "socket.io";

// initialize express
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// set up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// set up cors
app.use(cors());

// set up static files
app.use(express.static("uploads"));

// set up routes
app.use("/", Router);

// set up sockets
io.on("connection", (socket) => {
  // handle joining a room
  socket.on("join", (room) => {
    socket.join(room);
  });
  // handle messages
  socket.on("message", (room, msg) => {
    io.to(room).emit("message", msg);
  });
  // handle disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
