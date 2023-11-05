import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#1976d2", color: "white" , bottom: 0, position: 'relative', width: "100%",}}
      >
        <Box
          sx={{
            mt: 80,
            bottom: 0,
            mb: 1,
            pt:3,
            "& svg": {
              fontSize: "30px",
              cursor: "pointer",
              mr: 2,
              mb: 0,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          {/* icons */}
          <InstagramIcon />
          <TwitterIcon />
          <GitHubIcon />
          <YouTubeIcon />
        </Box>
        <Typography
          sx={{
            "@media (max-width:600px)": {
              fontSize: "30px",
              color: "black",
            },
          }}
        >
          All Rights Reserved &copy; RuralEduConnect
        </Typography>
      </Box>
    </>
  );
};

export default Footer;