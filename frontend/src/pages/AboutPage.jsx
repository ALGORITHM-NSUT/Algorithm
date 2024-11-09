import React, { useEffect, useState } from "react";
import Core from "../components/Core";
import FloatingBackground from './FloatingBackground';
import Loader from "../components/Loader";
import About from "../components/About";
import ScrollPrompt from "../components/ScrollPrompt"; // Import ScrollPrompt

const AboutPage = () => {
  const [members, setMembers] = useState({ withSubPosition: [], withoutSubPosition: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkDataValidity = () => {
      const storedMembers = sessionStorage.getItem('members');
      return storedMembers ? JSON.parse(storedMembers) : null;
    };

    const storedMembers = checkDataValidity();

    if (storedMembers) {
      setMembers(storedMembers);
      setIsLoading(false);
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/core`)
        .then((response) => response.json())
        .then((data) => {
          const withSubPosition = data.members.filter(member => member.subPosition);
          const withoutSubPosition = data.members.filter(member => !member.subPosition);
          sessionStorage.setItem('members', JSON.stringify({ withSubPosition, withoutSubPosition }));
          setMembers({ withSubPosition, withoutSubPosition });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching members:', error);
        });
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

  if (isLoading) {
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
