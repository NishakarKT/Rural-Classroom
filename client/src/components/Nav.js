import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import HamMenu from "./HamMenu";

const Nav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ flexGrow: 1 }}>
        <Link to={"/"}>LOGO</Link>
      </Typography>
      <Search />
      <HamMenu />
    </Box>
  );
};

export default Nav;
