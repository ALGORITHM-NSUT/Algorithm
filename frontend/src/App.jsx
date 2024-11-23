import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Tech_news from "./pages/Tech_news";
import ProfileForm from "./pages/ProfileForm";
import Projects from "./pages/Projects";
import LoginPage from "./pages/LoginPage";
import EmailVerify from "./pages/EmailVerify";
import './App.css';
import NotFound from "./pages/NotFound";
import PasswordReset from "./pages/PasswordReset";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import FloatingBackground from "./pages/FloatingBackground";

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = React.useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeRef} className="page">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technews" element={<Tech_news />} />
            <Route path="/join-us" element={<ProfileForm />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify/:id" element={<EmailVerify />} />
            <Route path="/resetpass/:id" element={<PasswordReset />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow relative">
          <FloatingBackground className="absolute inset-0 flex flex-col items-center justify-center text-center" />
          <div className="relative z-10">
            <AnimatedRoutes />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;