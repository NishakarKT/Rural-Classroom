import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext as GlobalContext } from "./hooks/useGlobalContext";
import { LOCALSTORAGE } from "./constants/variables";
import { AUTH_TOKEN_ENDPOINT, COURSE_GET_ENDPOINT } from "./constants/endpoints";

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE))?.token);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    if (token) {
      try {
        axios
          .post(AUTH_TOKEN_ENDPOINT, {}, { headers: { Authorization: "Bearer " + token } })
          .then((res) => setUser(res.data.data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  useEffect(() => {
    if (user?.role) {
      try {
        const query = { _id: { $in: user.courses || []} };
        axios
          .get(COURSE_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
          .then((res) => setCourses(res.data.data || []))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  }, [user, token]);

  const context = {
    user,
    setUser,
    token,
    setToken,
    courses,
    setCourses,
    tests,
    setTests,
    lectures,
    setLectures,
  };

  return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
