import React, { useEffect, useState } from "react";
import Core from "../components/Core";
import FloatingBackground from './FloatingBackground';
import Loader from "../components/Loader";

const AboutPage = () => {
  const [members, setMembers] = useState({ withSubPosition: [], withoutSubPosition: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    const checkDataValidity = () => {
      const storedMembers = sessionStorage.getItem('members');
      return JSON.parse(storedMembers);
    };

    const storedMembers = checkDataValidity();

    if (storedMembers) {
      setMembers(storedMembers);
      setIsLoading(false);
    } else {
      fetch(import.meta.env.VITE_BACKEND_URL+ `/core`)
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
        <div className="flex flex-col w-full">
          <div className="flex-grow mb-24">
            <FloatingBackground />
            <Core members={members} />
          </div>
        </div>
    </React.Fragment>
  );
};

export default AboutPage;
