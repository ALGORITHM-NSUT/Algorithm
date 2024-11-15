import React, { useEffect, useState, useContext } from "react";
import Core from "../components/Core";
import FloatingBackground from './FloatingBackground';
import Loader from "../components/Loader";
import About from "../components/About";
import ScrollPrompt from "../components/ScrollPrompt"; // Import ScrollPrompt
import { AboutContext } from "../auth/UserProvider";

const AboutPage = () => {
  const {members, setMembers, aboutLoading, fetchMembers} = useContext(AboutContext);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedMembers = sessionStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    } else if (!aboutLoading) {
      fetchMembers();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollPrompt(false);  // Hide the prompt after scroll
      } else {
        setShowScrollPrompt(true);  // Show the prompt when scrolled back to top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (aboutLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <FloatingBackground />
        <About />
        {showScrollPrompt && <ScrollPrompt />} {/* Only show ScrollPrompt when state is true */}
        <Core members={members} />
      </div>
    </div>
  );
};

export default AboutPage;
