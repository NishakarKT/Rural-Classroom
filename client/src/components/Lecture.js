import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import axios from "axios";
// constants
import { BASE, FILE_UPLOAD_ENDPOINT, LECTURE_EDIT_ENDPOINT } from "../constants/endpoints";
// components
import Chart from "./Chart";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useReactMediaRecorder } from "react-media-recorder";

const socket = io(BASE);

const LiveStream = () => {
  const { lectureId } = useParams();
  const { user, token } = useContext(useGlobalContext);
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [messages, setMessages] = useState([]);
  const [doubts, setDoubts] = useState(0);
  const [chartData, setChartData] = useState([]);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

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
                console.log("on stream");
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
              console.log("teacher");
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

  const handleSave = async () => {
    const mediaBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    if (mediaBlob) {
      const formData = new FormData();
      formData.append("files", mediaBlob, "lecture.mp4");
      await fetch(FILE_UPLOAD_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const url = Object.values(data.data)[0];
          axios
            .patch(LECTURE_EDIT_ENDPOINT, { query: { _id: lectureId }, edits: { url } }, { headers: { Authorization: "Bearer " + token } })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        });
    }
  };

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
                <button onClick={() => (status === "idle" || status === "stopped" ? startRecording() : stopRecording())}>{status === "idle" || status === "stopped" ? "Start" : "Stop"}</button>
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
            {mediaBlobUrl ? (
              <div>
                <p>Recorded Video</p>
                <video src={mediaBlobUrl} controls style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                <button onClick={() => handleSave()}>Save</button>
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
