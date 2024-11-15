import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <div className=" gradient-background min-h-screen">
        <div className="flex-grow">
          {/* <FloatingBackground /> */}
          <HeroSection />
        </div>
      </div>
    </>
  );
};

export default Home;
