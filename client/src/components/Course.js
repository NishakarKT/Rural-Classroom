import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import { BASE, COURSE_GET_ENDPOINT, LECTURE_GET_ENDPOINT, TEST_GET_ENDPOINT } from "../constants/endpoints";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Grid, Typography } from "@mui/material";
import Nav from "./Nav";
import CourseSidebar from "./CourseSidebar";
import CourseTests from "./CourseTests";
import CourseLectureCard from "./CourseLectureCard";

const Course = () => {
  const { courseId } = useParams();
  const { token } = useContext(useGlobalContext);
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [tests, setTests] = useState([]);
  const [play,setPlay] = useState(false);
  const [thumbnail,setThumbnail] = useState(null);
  const [title,setTitle] = useState(null);
  const [desc,setDesc] = useState(null);

  useEffect(() => {
    // fetch course
    try {
      const query = { _id: courseId };
      axios
        .get(COURSE_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
        .then((res) => (res.data.data?.length ? setCourse(res.data.data[0]) : null))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [courseId, token]);

  useEffect(() => {
    if (course) {
      // fetch lectures
      try {
        const query = { _id: { $in: course.lectures || [] } };
        axios
          .get(LECTURE_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
          .then((res) => {
            setLectures(res.data.data || [])
            setThumbnail(`${BASE}/${res.data.data[0].thumbnail.replaceAll(' ','%20')}`);
            setTitle(res.data.data[0].title);
            setDesc(res.data.data[0].description);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [course, token]);

  useEffect(() => {
    if (course) {
      // fetch tests
      try {
        const query = { _id: { $in: course.tests || [] } };
        axios
          .get(TEST_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
          .then((res) => setTests(res.data.data || []))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [course, token]);
  console.log(lectures);
  return course ? (
    // <div>
    //   <p>{course._id}</p>
    //   <p>{course.name}</p>
    //   <p>{course.teacher}</p>
    //   <h2>Letcures</h2>
    //   {lectures.map((lecture) => (
    //     <button onClick={() => navigate("/lecture/" + lecture._id)}>{lecture.title}</button>
    //   ))}
    // </div>
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <CourseSidebar />
        </Grid>
        <Grid item xs={10}>
          <Nav />
          <Typography
            sx={{
              fontSize: "2.5em",
              fontWeight: 600,
              mb:3,
            }}
          >{course.name}</Typography>
          {/* <img src={`${BASE}/${course.picture.replaceAll(' ','%20')}`} alt='Pic' /> */}
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <>
              {lectures.length && 
                <ReactPlayer 
                  url={`${BASE}/${lectures[0].url}`} 
                  controls={true} 
                  width={'1181px'} 
                  height={'664px'} 
                  playing={play}
                  light={thumbnail}
                  onClickPreview={()=>setPlay(true)}
                />}
                <Typography
                  sx={{
                    fontSize: "1.5em",
                    fontWeight:500,
                    mt: 2,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                  }}
                >
                  {desc}
                </Typography>
                <Typography variant='h5' fontWeight={600} sx={{mt:3}}>
                  Chat Box
                </Typography>
              </>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h4' fontWeight={600} sx={{mb:2}}>Other Lectures</Typography>
              {lectures && lectures.length && lectures.map(lecture => (
                <CourseLectureCard 
                  lecture={lecture} 
                  setThumbnail={setThumbnail}
                  setTitle={setTitle}
                  setDesc={setDesc}
                />
              ))}
            </Grid>
          </Grid>
          <CourseTests test={tests} />
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default Course;
