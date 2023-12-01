import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
// constants
import { BASE } from "../constants/endpoints";
// components
import Chart from "./Chart";
import { useGlobalContext } from "../hooks/useGlobalContext";

const socket = io(BASE);

const LiveStream = () => {
  const { lectureId } = useParams();
  const { user } = useContext(useGlobalContext);
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);
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
    if (user?._id) {
      window.navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        if (myStreamRef.current) {
          myStreamRef.current.srcObject = stream;
          // set up peer for receiving livestream
          const peer = new Peer();
          socket.on("stream", ({ peerId }) => {
            if (peerId) {
              const call = peer.call(peerId, stream);
              call.on("stream", (peerStream) => {
                console.log("on stream")
                if (peerStreamRef.current) {
                  peerStreamRef.current.srcObject = peerStream;
                }
              });
            }
          });
          // set up peer for sending livestream
          if (user?.role === "teacher") {
            const peer = new Peer();
            peer.on("open", (id) => {
              console.log("teacher")
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
    }
    // reset
    return () => {
      socket.off();
    };
  }, [user, refresh]);

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
            {user?.role ? (
              <div>
                <button onClick={() => setRefresh((refresh) => !refresh)}>Refresh</button>
                <p>Teacher</p>
                <video ref={peerStreamRef} autoPlay style={{ width: "200px", height: "200px", objectFit: "cover" }} />
              </div>
            ) : null}
            {user?.role ? (
              <div>
                <p>Me</p>
                <video ref={myStreamRef} autoPlay muted style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              </div>
            ) : null}
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
        <br />
        <input type="number" placeholder="Doubts" value={doubts} onChange={(e) => setDoubts(e.target.value)} />
        <button onClick={handleDoubts}>Doubts</button>
      </div>
    </div>
  );
};

export default LiveStream;
