import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const user = { _id: "6524cdd255568cea7c54eb10" };
const lectureId = "652521e3c889daf0886d4678";
const socket = io("http://localhost:8000");

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [streamURL, setStreamURL] = useState("");

  useEffect(() => {
    socket.emit("join", lectureId);
    socket.on("message", ({ from, text, date }) => {
      setMessages((messages) => [...messages, { from, text, date }]);
    });
    socket.on("streamURL", (url) => {
      setStreamURL(url);
    });
    return () => socket.off();
  }, []);

  const handleMessages = () => {
    socket.emit("message", { room: lectureId, from: user._id, text });
  };

  return (
    <div className="App">
      <h1>Live Stream</h1>
      {streamURL && <video src={streamURL} controls />}
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
    </div>
  );
};

export default App;
