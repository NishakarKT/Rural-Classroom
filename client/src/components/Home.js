import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import Lectures from "./Lectures";
import Tests from "./Tests";
import AddCourseDialog from "./AddCourseDialog";
import { useGlobalContext } from "../hooks/useGlobalContext";
import CreateProfile from "./CreateProfile";

const Home = () => {
  const { user } = useContext(useGlobalContext);

  const [open, setOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (user?._id) setEditProfile(!user?.name);
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setEditProfile(false);
  };

  return (
    <div>
      <Grid container spacing={2} height={"100vh"}>
        <Grid item xs={2}>
          <Sidebar openCourseDialog={handleOpen} />
        </Grid>
        <Grid item xs={10}>
          <Nav />
          <Lectures />
          <Tests />
        </Grid>
      </Grid>
      <AddCourseDialog open={open} handleClose={handleClose} />
      <CreateProfile open={editProfile} handleClose={handleCloseEdit} />
    </div>
  );
};

export default Home;
