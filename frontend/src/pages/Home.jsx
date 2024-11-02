import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Loader from '../components/Loader'; // Import your Loader component

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader /> 
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <HeroSection />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
