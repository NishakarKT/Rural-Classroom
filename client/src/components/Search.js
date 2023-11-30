import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCLick = (e) => {
    if ((e.type === "keydown" && search.trim() && e.which === 13) || (e.type === "click" && search.trim())) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <OutlinedInput
      endAdornment={
        <InputAdornment position="end">
          <IconButton sx={{ all: "initial", mt: 0.5 }} onClick={handleCLick} disableTouchRipple size="medium">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      sx={{
        m: 1,
      }}
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleCLick}
    />
  );
};

export default Search;
