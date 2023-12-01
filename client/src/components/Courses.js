import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Courses = () => {
  const navigate= useNavigate();
  const { userRole, courses } = useContext(useGlobalContext);

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>{`${userRole === "teacher" ? "My " : ""}Courses`}</Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        sx={{
          width: "70%",
          mt: 3,
        }}
      >
        {courses &&
          courses.map((course) => (
            <Button onClick={() => navigate("/course/" + course._id)} variant="outlined" fullWidth>
              {course.name}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default Courses;
