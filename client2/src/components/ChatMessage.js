import React, { useContext } from "react";
// contexts
import AppContext from "../contexts/AppContext";
// mui
import { Stack, Typography } from "@mui/material";

const ChatMessage = ({ message }) => {
  const { user } = useContext(AppContext);
  return (
    <Stack sx={{ width: "fit-content", ml: message.from === user?._id ? "auto" : "" }}>
      <Typography variant="body1" color="text.primary">
        {message.fromName}
      </Typography>
      <Typography variant="body1" color="white" p={1} borderRadius={"10px"} backgroundColor={message.from === user?._id ? "primary.main" : "secondary.main"} sx={{ paddingRight: "96px", paddingBottom: "16px", position: "relative" }}>
        {message.text}
        <Typography variant="body2" color="white" sx={{ position: "absolute", right: 6, bottom: 6, fontSize: "10px" }}>
          {new Date(message.date).toLocaleTimeString()}
        </Typography>
      </Typography>
    </Stack>
  );
};

export default ChatMessage;
