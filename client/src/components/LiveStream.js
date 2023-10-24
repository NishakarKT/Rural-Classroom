import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
// components
import Chart from "./Chart";

const user = { _id: "6524cdd255568cea7c54eb10" };
const lectureId = "652521e3c889daf0886d4678";
const socket = io("http://localhost:8000");

const LiveStream = () => {
  const [role, setRole] = useState("coordinator");
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [doubts, setDoubts] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    socket.on("doubts", ({ doubts, date }) => {
      setChartData((prev) => [...prev, { doubts, time: new Date(date).toLocaleTimeString() }]);
    });
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
            const call = peer.call(peerId, stream);
            call.on("stream", (peerStream) => {
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
            socket.emit("stream", { room: lectureId, peerId: id });
          });
          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (peerStream) => {
              console.log("peer stream");
              if (peerStreamRef.current) {
                peerStreamRef.current.srcObject = peerStream;
              }
            });
          });
        }
        // join room
        socket.emit("join", { room: lectureId });
      }
    });
    // reset
    return () => {
      socket.off();
    };
  }, [role]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => [...prev, { doubts: 0, time: new Date().toLocaleTimeString() }]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMessages = () => {
    socket.emit("message", { room: lectureId, from: user._id, text });
  };

  const handleDoubts = () => {
    socket.emit("doubts", { room: lectureId, doubts });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h1>Live Stream</h1>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <p>Teacher</p>
              <video ref={peerStreamRef} autoPlay style={{ width: "200px", height: "200px", objectFit: "cover" }} />
            </div>
            <div>
              <p>Me</p>
              <video ref={myStreamRef} autoPlay muted style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            </div>
          </div>
          <p>Doubts</p>
          <div style={{ width: "100%", height: "300px" }}>
            <Chart data={chartData} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
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
        <br />
        <input type="number" placeholder="Doubts" value={doubts} onChange={(e) => setDoubts(e.target.value)} />
        <button onClick={handleDoubts}>Doubts</button>
      </div>
    </div>
  );
};

export default LiveStream;
