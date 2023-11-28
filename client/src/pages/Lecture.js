

import Chart from "../components/Chart";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import Chat from "./Chat";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import VideocamIcon from '@mui/icons-material/Videocam';
import UploadIcon from '@mui/icons-material/Upload';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Peer } from "peerjs";
import '../styles/Lecture.css';

const user = { _id: "6524cdd255568cea7c54eb10" };
const lectureId = "652521e3c889daf0886d4678";
const socket = io("http://localhost:3000");

export default function Lecture() {
  const [role, setRole] = useState("coordinator");
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [doubts, setDoubts] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleMicToggle = () => {
    setIsMicOn((prev) => !prev);
    // Implement logic to toggle microphone
  };

  const handleCameraToggle = () => {
    // setIsCameraOn((prev) => !prev);
    setIsCameraOn((prev) => !prev);

    // Access the media stream tracks
    const tracks = myStreamRef.current.srcObject.getTracks();

    // Toggle the camera track
    tracks.forEach((track) => {
      if (track.kind === "video") {
        track.enabled = !isCameraOn;
      }
    });
    
  };

  const handleVolumeToggle = () => {
    setIsVolumeOn((prev) => !prev);
    // Implement logic to toggle volume
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen((prev) => !prev);
    // Implement logic to toggle fullscreen
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
    // Implement logic to toggle pause/play
  };

  const handleSettingsClick = () => {
    // Implement logic for settings
    console.log("Settings clicked");
  };

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
    <>
      <div className="Live_stream" style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h1>Live Stream</h1>
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <p>
                  <h1>Teacher</h1>
                </p>
                <video ref={myStreamRef} autoPlay muted style={{ width: "700px", height: "400px", objectFit: "cover" }} />
              </div>
            </div>
            <div className="icons">
              <VolumeUpRoundedIcon onClick={handleVolumeToggle} style={{ cursor: "pointer" }} />
              {isMicOn ? (
                <MicNoneRoundedIcon onClick={handleMicToggle} style={{ cursor: "pointer", transition: "color 0.3s", ":hover": { color: "#00FF00" } }} />
              ) : (
                <VolumeOffRoundedIcon onClick={handleMicToggle} style={{ cursor: "pointer" }} />
              )}
              {isCameraOn ? (
            <VideocamIcon onClick={handleCameraToggle} style={{ cursor: "pointer" }} />
          ) : (
            <VideocamOffIcon onClick={handleCameraToggle} style={{ cursor: "pointer" }} />
          )}
          <SettingsIcon onClick={handleSettingsClick} style={{ cursor: "pointer" }} />
           {isFullscreen ? (
                <FullscreenExitIcon onClick={handleFullscreenToggle} style={{ cursor: "pointer" }} />
              ) : (
                <FullscreenIcon onClick={handleFullscreenToggle} style={{ cursor: "pointer" }} />
              )}
          
              <UploadIcon style={{ cursor: "pointer" }} />
            </div>
            <p>
              <h1>Doubts</h1>
            </p>
            <div style={{ width: "100%", height: "300px" }}>
              <Chart data={chartData} />
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Chat socket={socket} username={username} room={room} />
          <div style={{ marginTop: "10px" }}>
            <input type="number" placeholder="Doubts" value={doubts} onChange={(e) => setDoubts(e.target.value)} />
            <button onClick={handleDoubts}>Doubts</button>
          </div>
        </div>
      </div>
    </>
  );
}

