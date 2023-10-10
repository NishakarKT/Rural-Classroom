// config
import "./config/config.js";

// imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Router from "./routes.js";
import http from "http";
import { Server } from "socket.io";
import NodeMediaServer from "node-media-server";

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

// initialize Node-Media-Server
const nms = new NodeMediaServer({
    rtmp: {
      port: process.env.NMS_RTMP_PORT || 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: process.env.NMS_HTTP_PORT || 8001,
      allow_origin: '*',
    },
  });
  nms.run();

// set up sockets
io.on("connection", (socket) => {
  console.log("A user connected");
  // handle joining a room (room ~ lecture _id)
  socket.on("join", (room) => {
    socket.join(room);
  });
  // handle messages
  socket.on("message", ({room, from, text}) => {
    io.to(room).emit("message", {from, text, date: new Date().toISOString()});
  });
  // handle disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// listen
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
