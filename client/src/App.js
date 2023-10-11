import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Peer } from "peerjs";

const user = { _id: "6524cdd255568cea7c54eb10" };
const lectureId = "652521e3c889daf0886d4678";
const socket = io("http://localhost:8000");

const App = () => {
  const [role, setRole] = useState("coordinator");
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", ({ from, text, date }) => {
      setMessages((messages) => [...messages, { from, text, date }]);
    });
    // my stream
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (myStreamRef.current) {
        myStreamRef.current.srcObject = stream;
        // set up peer for receiving livestream
        const peer = new Peer();
        socket.on("stream", ({ peerId }) => {
          if (peerId) {
            console.log("peer id " + peerId);
            const call = peer.call(peerId, stream);
            call.on("stream", (peerStream) => {
              console.log(peerId);
              console.log("peer stream" + peerStream);
              if (peerStreamRef.current) {
                peerStreamRef.current.srcObject = peerStream;
              }
            });
          }
        });
        // set up peer for sending livestream
        if (role === "teacher") {
          const peer = new Peer();
          peer.on("open", (id) => {
            console.log("id " + id)
            socket.emit("stream", { room: lectureId, peerId: id });
          });
          peer.on("call", (call) => {
            console.log("call");
            call.answer(stream);
            call.on("stream", (peerStream) => {
              if (peerStreamRef.current) {
                peerStreamRef.current.srcObject = peerStream;
              }
            });
          });
        }
        // join room
        socket.emit("join", lectureId);
      }
    });
    // reset
    return () => {
      socket.off();
    };
  }, [role]);

  const handleMessages = () => {
    socket.emit("message", { room: lectureId, from: user._id, text });
  };

  return (
    <div className="App">
      <h1>Live Stream</h1>
      <div>
        <p>Teacher</p>
        <video ref={peerStreamRef} autoPlay style={{ width: "100px", height: "100px" }} />
        <p>Me</p>
        <video ref={myStreamRef} autoPlay muted style={{ width: "100px", height: "100px" }} />
      </div>
      <h2>Chat</h2>
      <div>
        {messages.map((message, index) => (
          <div key={lectureId + index}>
            <p>{message.text}</p>
            <p>{message.from}</p>
            <p>{new Date(message.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={() => handleMessages()}>Send</button>
      <button onClick={() => setRole((role) => (role === "coordinator" ? "teacher" : "coordinator"))}>{role}</button>
    </div>
  );
};

export default App;
