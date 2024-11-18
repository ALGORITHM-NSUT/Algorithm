import React, { useEffect, useState, useContext } from 'react';
import HeroSection from '../components/HeroSection';
import { UserContext } from '../auth/UserProvider';

const Home = () => {
  const { user, isLoading } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <div className="gradient-background min-h-screen">
        <div className="flex-grow">
          {/* <FloatingBackground /> */}
          <HeroSection user={user} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Home;
