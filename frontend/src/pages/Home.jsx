import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import OpacityLoader from '../components/OpacityLoader';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <HeroSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
