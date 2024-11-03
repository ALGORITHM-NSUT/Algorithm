import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Core from "../components/Core";
import FloatingBackground from './FloatingBackground';
import Loader from "../components/Loader"; // Make sure you have a Loader component

const AboutPage = () => {
  const [members, setMembers] = useState({ withSubPosition: [], withoutSubPosition: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDataValidity = () => {
      const storedMembers = sessionStorage.getItem('members');
      const lastFetchTime = sessionStorage.getItem('lastFetchTime');
      const currentTime = new Date().getTime();
      
      // If there is no last fetch time or it's been more than 7 days (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      if (!lastFetchTime || (currentTime - lastFetchTime) > 7 * 24 * 60 * 60 * 1000) {
        return false; // Data is stale, need to fetch new data
      }
      return storedMembers ? JSON.parse(storedMembers) : null; // Return stored members or null if none
    };

    const storedMembers = checkDataValidity();

    if (storedMembers) {
      // If valid data exists in local storage, set it to state
      setMembers(storedMembers);
      setIsLoading(false); // Set loading to false after loading from local storage
    } else {
      // Fetch data from API if not valid in local storage
      fetch('http://localhost:5000/core')
        .then((response) => response.json())
        .then((data) => {
          const withSubPosition = data.members.filter(member => member.subPosition);
          const withoutSubPosition = data.members.filter(member => !member.subPosition);

          // Store fetched data in local storage
          sessionStorage.setItem('members', JSON.stringify({ withSubPosition, withoutSubPosition }));
          sessionStorage.setItem('lastFetchTime', new Date().getTime()); // Store the current time

          // Set state with the fetched data
          setMembers({ withSubPosition, withoutSubPosition });
          setIsLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error('Error fetching members:', error);
          setIsLoading(false); // Set loading to false even if there's an error
        });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex-grow mb-24">
            <FloatingBackground />
            <Core members={members} /> 
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AboutPage;
