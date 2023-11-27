import React, { useState } from 'react'
import { useGlobalContext as GlobalContext } from './hooks/useGlobalContext';

const GlobalContextProvider = ({
  children,
}) => {

  const [user,setUser] = useState(localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null);
  const [token,setToken] = useState(localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null);
  const [userRole,setUserRole] = useState('teacher');
  const [courses,setCourses] = useState(['abc','pqr','xyz']);
  const [lectures,setLectures] = useState([
    {
      id: 'asfda',
      name: 'SFPEA',
    },
    {
      id:'fasd',
      name:'SOME',
    },
    {
      id: 'asfda',
      name: 'SFPEA',
    },
    {
      id: 'asfda',
      name: 'SFPEA',
    },
    {
      id:'fasd',
      name:'SOME',
    },
    {
      id: 'asfda',
      name: 'SFPEA',
    },
]);
  const [tests,setTests] = useState([
    {
      id: 'faewrap',
      name: 'something',
      course: 'javac ourse', // course _id
      questions: [
        {
          question: 'What is 2+2',
          options: [
            {
              key: 'A', // A, 1, a, i, etc.
              value: '5', // option text
            },
            {
              key: 'B', // A, 1, a, i, etc.
              value: '2', // option text
            },
            {
              key: 'C', // A, 1, a, i, etc.
              value: '7', // option text
            },
            {
              key: 'D', // A, 1, a, i, etc.
              value: '4', // option text
            },
          ],
          answer: '4', // key value of correct option
          responses: [
            // {
            //   id: { type: String, required: true }, // coordinator _id + "_" + roll number
            //   response: { type: String, required: true }, // key value of option
            // },
          ],
        },
        {
          question: 'What is 2+2',
          options: [
            {
              key: 'A', // A, 1, a, i, etc.
              value: '5', // option text
            },
            {
              key: 'B', // A, 1, a, i, etc.
              value: '2', // option text
            },
            {
              key: 'C', // A, 1, a, i, etc.
              value: '7', // option text
            },
            {
              key: 'D', // A, 1, a, i, etc.
              value: '4', // option text
            },
          ],
          answer: '4', // key value of correct option
          responses: [
            // {
            //   id: { type: String, required: true }, // coordinator _id + "_" + roll number
            //   response: { type: String, required: true }, // key value of option
            // },
          ],
        },
        {
          question: 'What is 12+22',
          options: [
            {
              key: 'A', // A, 1, a, i, etc.
              value: '15', // option text
            },
            {
              key: 'B', // A, 1, a, i, etc.
              value: '22', // option text
            },
            {
              key: 'C', // A, 1, a, i, etc.
              value: '17', // option text
            },
            {
              key: 'D', // A, 1, a, i, etc.
              value: '34', // option text
            },
          ],
          answer: '34', // key value of correct option
          responses: [
            {
              id: 'reara',
              response: 'D. 34',
            },
            {
              id: 'reara',
              response: 'A. 14',
            },
          ],
        },
      ],
    }
  ]);

  const context={
    user,
    setUser,
    token,
    setToken,
    userRole,
    setUserRole,
    courses,
    setCourses,
    tests,
    setTests,
    lectures,
    setLectures,
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider