import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import EditResume from "./components/EditResume";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";
import Home from "./components/Home";
import MyResume from "./components/MyResume";


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/dashboard/resume/:_id/edit" element={<EditResume/>}/>
        <Route path="/myresume/:_id/view" element={<MyResume/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
