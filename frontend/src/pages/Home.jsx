import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';

import OpacityLoader from '../components/OpacityLoader';
import LighthouseScene from '../components/LightHouseScene';
import FloatingBackground from './FloatingBackground';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <div className="flex flex-col gradient-background min-h-screen">
        <div className="flex-grow">
          {/* <FloatingBackground /> */}
          <HeroSection />
        </div>
      </div>
    </>
  );
};

export default Home;
