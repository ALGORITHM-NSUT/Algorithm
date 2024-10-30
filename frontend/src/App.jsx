import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Tech_news from "./pages/Tech_news";
import ProfileForm from "./pages/ProfileForm";
import Projects from "./pages/Projects";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import EmailVerify from "./pages/EmailVerify";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/technews" element={<Tech_news />} />
        <Route path="/join-us" element={<ProfileForm />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify/:id" element={<EmailVerify />} />
        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
