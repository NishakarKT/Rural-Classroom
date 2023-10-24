import React, { useState } from 'react'
import { useGlobalContext as GlobalContext } from './hooks/useGlobalContext';

const GlobalContextProvider = ({
  children,
}) => {

  const [user,setUser] = useState(null);
  const [userRole,setUserRole] = useState('coordinator');
  const [courses,setCourses] = useState(['abc','pqr','xyz']);
  const [lectures,setLectures] = useState([
    {
      id:'fasd',
      name:'SOME',
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
      id:'fasd',
      name:'SOME',
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
    {
      id:'fasd',
      name:'SOME',
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

  const context={
    user,
    setUser,
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