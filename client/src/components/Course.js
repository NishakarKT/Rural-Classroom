import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { COURSE_GET_ENDPOINT, LECTURE_GET_ENDPOINT } from "../constants/endpoints";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { token } = useContext(useGlobalContext);
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);

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
  }, [courseId]);

  useEffect(() => {
    if (course) {
      // fetch lectures
      try {
        const query = { _id: { $in: course.lectures || [] } };
        axios
          .get(LECTURE_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
          .then((res) => setLectures(res.data.data || []))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [course]);

  return course ? (
    <div>
      <p>{course._id}</p>
      <p>{course.name}</p>
      <p>{course.teacher}</p>
      <h2>Letcures</h2>
      {lectures.map((lecture) => (
        <button onClick={() => navigate("/lecture/" + lecture._id)}>{lecture.title}</button>
      ))}
    </div>
  ) : null;
};

export default Course;
