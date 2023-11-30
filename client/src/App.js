import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// // constants
// import { BASE } from "./constants/endpoints";
// components
import LiveStream from "./components/LiveStream";
import Home from "./components/Home";
// import Home from "./pages/Home";
import Test from "./components/Test";
// import Calendar from "./components/layout/Calendar";
// import Profile from "./pages/Profile";
import LoginSignup from "./components/LoginSignup";
// import Help from "./pages/Help";
// import Privacy from "./pages/Privacy";
// import Terms from "./pages/Term";
// import Faq from "./pages/Faq";
// import Class1 from "./pages/Class1";
// import Class2 from "./pages/Class2";
// import Class3 from "./pages/Class3";
import { useGlobalContext } from "./hooks/useGlobalContext";
import CreateProfile from "./components/CreateProfile";

// const user = { _id: "6524cdd255568cea7c54eb10" };
// const lectureId = "652521e3c889daf0886d4678";
// const socket = io(BASE);

const App = () => {
  const { token } = useContext(useGlobalContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/auth/login" />} />
          <Route path="/live/:lectureId" element={<LiveStream />} />
          <Route path="/test/:testId" element={<Test />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          {/* <Route exact path='/' element={<Home />} /> */}
          {/* <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/profile" element={<Profile />} /> */}
          <Route exact path="/auth/login" element={!token ? <LoginSignup /> : <Navigate to="/" />} />
          {/* <Route exact path="/help" element={<Help/>} />
          <Route exact path="/privacy" element={<Privacy/>} />
          <Route exact path="/term" element={<Terms/>} />
          <Route exact path="/faq" element={<Faq/>} />
          <Route exact path="/Class1" element={<Class1/>} />
          <Route exact path="/Class2" element={<Class2/>} />
          <Route exact path="/Class3" element={<Class3/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
