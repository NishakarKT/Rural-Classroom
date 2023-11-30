import React, { useContext, useState } from "react";
import axios from "axios";
import { Box, Button, Dialog, DialogActions, DialogTitle, InputLabel, TextField } from "@mui/material";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { COURSE_NEW_ENDPOINT, FILE_UPLOAD_ENDPOINT } from "../constants/endpoints";

const AddCourseDialog = ({ open, handleClose }) => {
  const { user, token } = useContext(useGlobalContext);
  const [materials, setMaterials] = useState([]);
  const [picture, setPicture] = useState("");

  const uploadMaterials = (files) => {
    const formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("files", files[key]);
    }
    if (files.length) {
      try {
        axios
          .post(FILE_UPLOAD_ENDPOINT, formData, { headers: { Authorization: "Bearer " + token } })
          .then((res) => {
            setMaterials(Object.values(res.data.data));
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const uploadPicture = (files) => {
    const formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("files", files[key]);
    }
    if (files.length) {
      try {
        axios
          .post(FILE_UPLOAD_ENDPOINT, formData, { headers: { Authorization: "Bearer " + token } })
          .then((res) => {
            setPicture(Object.values(res.data.data)[0]);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (user?._id && token) {
      const data = {
        name: form["name"].value,
        teacher: user._id,
        picture,
        materials,
      };
      axios
        .post(COURSE_NEW_ENDPOINT, data, { headers: { Authorization: "Bearer " + token } })
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          handleClose();
        });
    } else {
      console.log("missing user or token");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Add new Course</DialogTitle>
        <Box sx={{ mx: 3 }}>
          <Box>
            <InputLabel sx={{ mb: 1, ml: 0.5 }}>Name of the Course:</InputLabel>
            <TextField required fullWidth sx={{ mb: 2 }} name="name" placeholder={"Ex:- Machine Learning"} />
          </Box>
          <Box>
            <InputLabel sx={{ mb: 1, ml: 0.5 }}>Material :</InputLabel>
            <TextField
              type="file"
              required
              inputProps={{
                multiple: true,
                // accept: 'image/*',
              }}
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => uploadMaterials(e.target.files)}
            />
          </Box>
          <Box>
            <InputLabel sx={{ mb: 1, ml: 0.5 }}>Picture :</InputLabel>
            <TextField
              type="file"
              required
              fullWidth
              inputProps={{
                accept: "image/*",
              }}
              sx={{ mb: 2 }}
              onChange={(e) => uploadPicture(e.target.files)}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Course
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddCourseDialog;
