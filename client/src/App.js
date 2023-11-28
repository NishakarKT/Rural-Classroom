import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/layout/Footer";
import Drawer from "./components/layout/Drawer";
import Calendar from "./components/layout/Calendar";
import Profile from './pages/Profile';
import LoginSignup from './pages/LoginSignup';
import Help from './pages/Help';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Term';
import Faq from './pages/Faq';
import Class1 from './pages/Class1';
import Class2 from './pages/Class2';
import Class3 from './pages/Class3';
import Lecture from "./pages/Lecture";


const App = () => {

  return (
    <>


<BrowserRouter>
    {/* {!isLoginPage && <Drawer />} */}
    <Drawer />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/auth/login" element={<LoginSignup/>} />
        <Route exact path="/help" element={<Help/>} />
        <Route exact path="/privacy" element={<Privacy/>} />
        <Route exact path="/term" element={<Terms/>} />
        <Route exact path="/faq" element={<Faq/>} />
        <Route exact path="/Class1" element={<Class1/>} />
        <Route exact path="/Class2" element={<Class2/>} />
        <Route exact path="/Class3" element={<Class3/>} />
        <Route exact path="/lecture" element={<Lecture/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </>
  );
};

export default App;
