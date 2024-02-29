import React, { useState, useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
// apis
import { speechToText } from "../apis/multimedia";
// mui
import { Box, Stack, TextField, IconButton, CircularProgress } from "@mui/material";
import { Mic, MicOff, Send } from "@mui/icons-material";
import ChatMessage from "./ChatMessage";
// vars
const mimeType = "audio/webm;codecs=opus";

const ChatBox = ({ messages, handleMessage }) => {
  const chatBoxRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    (async () => {
      if (mediaBlobUrl) {
        setIsLoading(true);
        try {
          const mediaBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
          const blobWithMimeType = new Blob([mediaBlob], { type: mimeType });
          const text = await speechToText(blobWithMimeType);
          handleMessage(text);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }
    })();
  }, [mediaBlobUrl]);

  const handleMic = () => {
    if (status === "idle" || status === "stopped") {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <Box component="form" onSubmit={handleMessage} sx={{ width: "100%" }}>
      <Stack ref={chatBoxRef} sx={{ p: 2, maxHeight: "300px", overflowX: "hidden", overflowY: "auto" }}>
        {messages.map((message, index) => (
          <ChatMessage key={"chat" + index} message={message} />
        ))}
      </Stack>
      <Stack direction="row" alignItems="flex-end" spacing={1}>
        {isLoading ? <CircularProgress size="1.5rem" /> : <IconButton onClick={handleMic}>{status === "idle" || status === "stopped" ? <MicOff color="primary" /> : <Mic color="error" />}</IconButton>}
        <TextField fullWidth variant="standard" label="Type your message." placeholder="Ex:- I have a doubt!" name="text" type="text" />
        <IconButton type="submit">
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatBox;
