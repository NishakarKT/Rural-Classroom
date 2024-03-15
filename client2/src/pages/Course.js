import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { io } from "socket.io-client";
import Draggable from "react-draggable";
import Webcam from "react-webcam";
import YouTube from "react-youtube";
// contexts
import AppContext from "../contexts/AppContext";
// components
import ChatBox from "../components/ChatBox";
import Chart from "../components/Chart";
// constants
import { COMPANY } from "../constants/vars";
import { BASE, COURSE_GET_ENDPOINT, LECTURE_GET_ENDPOINT, LECTURE_NEW_ENDPOINT, FILE_UPLOAD_ENDPOINT, ATTENDANCE_NEW_ENDPOINT, MATERIAL_GET_ENDPOINT, MATERIAL_NEW_ENDPOINT, MESSAGE_NEW_ENDPOINT, MESSAGE_GET_ENDPOINT } from "../constants/endpoints";
import { UPLOAD_URL } from "../constants/urls";
//utils
import { truncate } from "../utils";
// apis
import { getDoubtsFromImage, getAttendanceFromImage, getFilteredMessages } from "../apis/multimedia";
// mui
import { Box, Container, Grid, Paper, Button, Typography, List, ListItemText, Stack, CardMedia, Dialog, DialogContent, DialogTitle, Badge, IconButton, TextField, ListItemButton, ListItemAvatar, Avatar, Divider, Tooltip, CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { VideoCall, Close, Camera, Add, FileCopy, FilterAlt, FilterAltOff } from "@mui/icons-material";
// vars
const socket = io(BASE);

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Course = () => {
  const myStreamRef = useRef(null);
  const peerStreamRef = useRef(null);
  const { token, user } = useContext(AppContext);
  const { courseId } = useParams();
  const [lectureOpen, setLectureOpen] = useState(false);
  const [doubtsOpen, setDoubtsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessagesFiltered, setIsMessagesFiltered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [doubts, setDoubts] = useState(0);
  const [classStrength, setClassStrength] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [materialFiles, setMaterialsFiles] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => [...prev, { doubts: 0, time: new Date().toLocaleTimeString() }]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (courseId) {
      try {
        const query = { _id: courseId };
        axios
          .get(COURSE_GET_ENDPOINT, { headers: { Authorization: `Bearer ${token}` }, params: { query: JSON.stringify(query) } })
          .then((res) => {
            if (res.data.data.length) setCourse(res.data.data[0]);
            else setCourse(null);
          })
          .catch((err) => {
            console.log(err);
            setCourse(null);
          });
      } catch (err) {
        console.log(err);
        setCourse(null);
      }
    }
  }, [courseId]);

  useEffect(() => {
    (async () => {
      if (isMessagesFiltered) {
        setIsLoading(true);
        const filteredMessages = await getFilteredMessages(messages);
        setIsLoading(false);
        setFilteredMessages(filteredMessages.map((message) => ({ text: message, date: new Date().toISOString() })));
      } else {
        setFilteredMessages(messages);
      }
    })();
  }, [messages, isMessagesFiltered]);

  useEffect(() => {
    if (lecture?._id) {
      try {
        const query = { lecture: lecture._id };
        axios
          .get(MESSAGE_GET_ENDPOINT, { headers: { Authorization: `Bearer ${token}` }, params: { query: JSON.stringify(query) } })
          .then((res) => {
            setMessages(res.data.data);
            setFilteredMessages(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            setMessages([]);
            setFilteredMessages([]);
          });
      } catch (err) {
        console.log(err);
        setMessages([]);
        setFilteredMessages([]);
      }
    }
  }, [lecture]);

  useEffect(() => {
    if (course) {
      // fetch lectures
      try {
        const query = { course: course._id };
        axios
          .get(LECTURE_GET_ENDPOINT, { headers: { Authorization: `Bearer ${token}` }, params: { query: JSON.stringify(query) } })
          .then((res) => {
            if (res.data.data.length) {
              setLecture(res.data.data[res.data.data.length - 1]);
              setLectures(res.data.data.reverse());
            } else {
              setLecture(null);
              setLectures([]);
            }
          })
          .catch((err) => {
            console.log(err);
            setLecture(null);
            setLectures([]);
          });
      } catch (err) {
        console.log(err);
        setLectures([]);
      }
      // fetch materials
      try {
        const query = { course: course._id };
        axios
          .get(MATERIAL_GET_ENDPOINT, { headers: { Authorization: `Bearer ${token}` }, params: { query: JSON.stringify(query) } })
          .then((res) => {
            if (res.data.data.length) {
              setMaterials(res.data.data[0].files || []);
            } else {
              setMaterials([]);
            }
          })
          .catch((err) => {
            console.log(err);
            setMaterials([]);
          });
      } catch (err) {
        console.log(err);
        setMaterials([]);
      }
    }
  }, [course]);

  useEffect(() => {
    socket.on("doubts", ({ doubts, date }) => {
      setChartData((prev) => [...prev, { doubts, time: new Date(date).toLocaleTimeString() }]);
    });
    socket.on("message", ({ from, fromName, text, date }) => {
      setMessages((messages) => [...messages, { from, fromName, text, date }]);
      setFilteredMessages((messages) => [...messages, { from, fromName, text, date }]);
    });
    // join room
    socket.emit("join", { room: courseId });
    // reset
    return () => {
      socket.off();
    };
  }, [user]);

  useEffect(() => {
    (async () => {
      if (capturedImage) {
        setIsLoading(true);
        try {
          const imageBlob = await fetch(capturedImage).then((r) => r.blob());
          const doubts = await getDoubtsFromImage(imageBlob);
          const attendance = await getAttendanceFromImage(imageBlob);
          setDoubts(doubts);
          setAttendance(attendance);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }
    })();
  }, [capturedImage]);

  const captureImage = () => {
    const capturedImage = myStreamRef.current.getScreenshot();
    setCapturedImage(capturedImage);
    setDoubtsOpen(true);
  };

  const handleMessage = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
      const text = e.target.text.value;
      socket.emit("message", { room: courseId, from: user._id, fromName: user.name, text });
      e.target.reset();
      axios
        .post(MESSAGE_NEW_ENDPOINT, { course: courseId, lecture: lecture?._id, from: user._id, fromName: user.name, text, date: new Date().toISOString() }, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log("message created");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typeof e === "string") {
      socket.emit("message", { room: courseId, from: user._id, fromName: user.name, text: e });
    } else {
      console.log("error in handling message");
    }
  };

  const handleLecture = async (e) => {
    e.preventDefault();
    const edits = {};
    new FormData(e.target).forEach((value, key) => (edits[key] = value)); // FormData to JS object
    edits["course"] = courseId;
    edits["date"] = new Date().toISOString();
    try {
      setIsLoading(true);
      axios
        .post(LECTURE_NEW_ENDPOINT, edits, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          alert("Your lecture has been uploaded!");
          setLectures((lectures) => [res.data.data, ...lectures]);
          setLectureOpen(false);
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Your lecture has NOT been updated!");
          setLectureOpen(false);
          setIsLoading(false);
        });
    } catch (err) {
      alert("Your lecture has NOT been updated!");
      setLectureOpen(false);
      setIsLoading(false);
    }
  };

  const handleMaterials = async (e) => {
    e.preventDefault();
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    // upload files
    const formData = new FormData(),
      fileNames = [];
    // change file name for each file before uploading
    materialFiles.forEach((file, index) => {
      const fileName = user.role + "." + user.email + ".material." + data.name + "." + index + "." + file.name.split(".").at(-1);
      fileNames.push(fileName);
      formData.append("files", file, fileName);
    });
    try {
      setIsLoading(true);
      axios
        .post(FILE_UPLOAD_ENDPOINT, formData, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const urls = Object.values(res.data.data);
          if (urls.length) {
            const materialData = {};
            materialData["name"] = data["name"];
            materialData["files"] = fileNames;
            materialData["course"] = courseId;
            axios
              .post(MATERIAL_NEW_ENDPOINT, materialData, { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => {
                setMaterials(res.data.data.files);
                setMaterialsOpen(false);
                setIsLoading(false);
              })
              .catch((err) => {
                alert("Your study materials have NOT been uploaded!");
                setMaterialsFiles([]);
                setMaterialsOpen(false);
                setIsLoading(false);
              });
          }
        })
        .catch((err) => {
          alert("Your study materials have NOT been uploaded!");
          setMaterialsFiles([]);
          setMaterialsOpen(false);
          setIsLoading(false);
        });
    } catch (err) {
      alert("Your study materials have NOT been uploaded!");
      setMaterialsFiles([]);
      setMaterialsOpen(false);
      setIsLoading(false);
    }
  };

  const handleDoubts = async () => {
    socket.emit("doubts", { room: courseId, doubts });
    setDoubtsOpen(false);
    setCapturedImage(null);
  };

  const handleAttendance = async () => {
    if (lecture?._id && attendance?.length && classStrength) {
      try {
        axios
          .post(ATTENDANCE_NEW_ENDPOINT, { coordinator: user?._id, lecture: lecture._id, attendance, percentage: (attendance.length / classStrength) * 100 }, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            setAttendance([]);
            setDoubtsOpen(false);
            setCapturedImage(null);
          })
          .catch((err) => {
            setDoubtsOpen(false);
            alert("Attendance has NOT been taken!");
          });
      } catch (err) {
        setDoubtsOpen(false);
        alert("Attendance has NOT been taken!");
        console.log(err);
      }
    }
  };

  return (
    <Container maxWidth="100%">
      <Helmet>
        <title>
          {course?.name || "Course"} | {COMPANY}
        </title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1} pb={2}>
                  <Typography color="primary" variant="h6" flex={1} gutterBottom>
                    Live Class
                  </Typography>
                  {user?.role === "teacher" ? (
                    <Button
                      variant="contained"
                      color={"primary"}
                      startIcon={<VideoCall />}
                      onClick={() => {
                        setTimeout(() => setLectureOpen(true), 0);
                      }}
                    >
                      New Lecture
                    </Button>
                  ) : null}
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ position: "relative" }}>
                  {lecture ? (
                    <YouTube
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        width: "100%",
                      }}
                      videoId={lecture.youtubeId}
                      opts={{
                        height: "300",
                        width: "100%",
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                    />
                  ) : null}
                  {user?.role === "teacher" ? <video autoPlay muted ref={myStreamRef} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "5px" }} /> : null}
                  {user?.role !== "teacher" ? <video autoPlay ref={peerStreamRef} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "5px" }} /> : null}
                  {user?.role !== "teacher" ? (
                    <div style={{ position: "fixed", zIndex: 9999, bottom: 16, right: 16, borderRadius: "5px", overflow: "hidden" }}>
                      <div style={{ position: "relative", height: "200px", width: "200px", display: "grid", placeItems: "center" }}>
                        <Webcam ref={myStreamRef} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} height={200} width={200} muted />
                        <IconButton sx={{ position: "absolute", transition: "all 0.2s", backgroundColor: "rgba(0, 0, 0, 0.5) !important", "&:hover": { transform: "scale(1.1)" } }} onClick={captureImage}>
                          <Camera sx={{ color: "white" }} />
                        </IconButton>
                      </div>
                    </div>
                  ) : null}
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={user?.role === "teacher" ? 4 : 12}>
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spaacing={2} pb={2}>
                  <Typography color="primary" variant="h6" flex={1} gutterBottom>
                    Discussion
                  </Typography>
                  {user?.role === "teacher" ? (
                    isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Tooltip title={isMessagesFiltered ? "Show all" : "Show less"}>
                        <IconButton onClick={() => setIsMessagesFiltered(!isMessagesFiltered)}>{isMessagesFiltered ? <FilterAlt /> : <FilterAltOff />}</IconButton>
                      </Tooltip>
                    )
                  ) : null}
                </Stack>
                <ChatBox messages={filteredMessages} handleMessage={handleMessage} />
              </Paper>
            </Grid>
            {user?.role === "teacher" ? (
              <Grid item xs={12} sm={8}>
                <Paper sx={{ p: 2 }}>
                  <Typography color="primary" variant="h6" flex={1} gutterBottom>
                    Live Doubts
                  </Typography>
                  <div style={{ width: "100%", height: "300px" }}>
                    <Chart data={chartData} />
                  </div>
                </Paper>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" justifyContent={"space-between"} alignItems="center" spacing={1}>
                  <Typography color="primary" variant="h6" gutterBottom>
                    Lectures
                  </Typography>
                </Stack>
                {lectures.length ? (
                  <List sx={{ width: "100%" }}>
                    {lectures.map((lecture) => (
                      <>
                        <ListItemButton
                          alignItems="flex-start"
                          onClick={() => {
                            setLecture(lecture);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <VideoCall />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={truncate(lecture.name, 40)} secondary={truncate(lecture.description, 80)} />
                        </ListItemButton>
                        <Divider />
                      </>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" color="text.secondary" align="center" sx={{ py: "50px" }}>
                    No lectures yet!
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" justifyContent={"space-between"} alignItems="center" spacing={1}>
                  <Typography color="primary" variant="h6" gutterBottom>
                    Study Materials
                  </Typography>
                  {user?.role === "teacher" ? (
                    <Button variant="contained" startIcon={<Add />} onClick={() => setMaterialsOpen(true)}>
                      New
                    </Button>
                  ) : null}
                </Stack>
                <Box sx={{ width: "100%", p: 1, pt: 2 }}>
                  {materials.map((material, index) => (
                    <Badge onClick={() => window.open(UPLOAD_URL + material)} badgeContent={materials.length - index} color="secondary" sx={{ mr: 2, cursor: "pointer" }}>
                      <FileCopy color="error" fontSize="large" />
                    </Badge>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={materialsOpen} onClose={() => setMaterialsOpen(false)} PaperComponent={PaperComponent}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography color="primary" variant="h6" gutterBottom>
            New Study Material
          </Typography>
        </DialogTitle>
        <IconButton
          onClick={() => setMaterialsOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleMaterials}>
            <Grid container p={2} spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required name="name" label="Name" fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="file"
                      label="Files"
                      fullWidth
                      variant="outlined"
                      onChange={(e) => setMaterialsFiles(Array.from(e.target.files))}
                      inputProps={{
                        multiple: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton fullWidth sx={{ mt: 2 }} disabled={isLoading} loading={isLoading} type="submit" variant="contained">
                  Upload
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={lectureOpen} onClose={() => setLectureOpen(false)} PaperComponent={PaperComponent}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography color="primary" variant="h6">
            New Lecture
          </Typography>
        </DialogTitle>
        <IconButton
          onClick={() => setLectureOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleLecture}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField required name="name" label="Name" fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required name="youtubeId" label="YouTube Video ID" fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required multiline rows={4} name="description" label="Description" fullWidth variant="outlined" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton fullWidth disabled={isLoading} loading={isLoading} type="submit" variant="contained">
                  Create
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={doubtsOpen} onClose={() => setDoubtsOpen(false)} PaperComponent={PaperComponent}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography color="primary" variant="h6" gutterBottom>
            How to use the captured image?
          </Typography>
        </DialogTitle>
        <IconButton
          onClick={() => setDoubtsOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CardMedia
                    component="img"
                    image={capturedImage}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2}>
                    <TextField required value={doubts} onChange={(e) => setDoubts(e.target.value)} label="Doubts" fullWidth variant="outlined" />
                    <LoadingButton fullWidth disabled={isLoading} loading={isLoading} variant="contained" onClick={handleDoubts}>
                      Send Doubts
                    </LoadingButton>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2}>
                    <TextField required value={classStrength} onChange={(e) => setClassStrength(e.target.value)} label="Class Strength" fullWidth variant="outlined" />
                    <LoadingButton fullWidth disabled={isLoading} loading={isLoading} color="success" variant="contained" onClick={handleAttendance}>
                      Take Attendance
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Course;
