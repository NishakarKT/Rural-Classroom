import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import LectureCard from "./LectureCard";

const Lectures = () => {
  const { user, lectures } = useContext(useGlobalContext);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        mb: lectures.length > 4 ? 8 : 4,
      }}
    >
      <Typography>{`${user?.role === "teacher" ? "Upcoming " : ""}Lectures`}</Typography>
      <Grid container gap={2} sx={{ my: 2 }}>
        {lectures &&
          (lectures.length === 0 ? (
            <Grid item xs={12}>
              <Typography> No lectures to show</Typography>
            </Grid>
          ) : (
            (isExpanded ? lectures : lectures.slice(0, 4)).map((lecture) => <LectureCard lecture={lecture} key={lecture.id} />)
          ))}
      </Grid>
      {lectures.length > 4 && (
        <Button
          onClick={() => setIsExpanded((x) => !x)}
          variant="text"
          sx={{
            float: "right",
            mr: 8,
          }}
        >
          {isExpanded ? "Show less..." : "Show more..."}
        </Button>
      )}
    </Box>
  );
};

export default Lectures;
