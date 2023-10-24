import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import LiveStream from "./components/LiveStream";
import Home from "./components/Home";

// const user = { _id: "6524cdd255568cea7c54eb10" };
// const lectureId = "652521e3c889daf0886d4678";
// const socket = io("http://localhost:8000");

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/live' element={<LiveStream/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
