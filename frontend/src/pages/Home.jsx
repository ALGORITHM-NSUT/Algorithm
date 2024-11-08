import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';

import OpacityLoader from '../components/OpacityLoader';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <HeroSection />
        </div>
      </div>
    </>
  );
};

export default Home;
