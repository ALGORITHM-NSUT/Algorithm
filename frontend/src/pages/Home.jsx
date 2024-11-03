import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import OpacityLoader from '../components/OpacityLoader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
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
      
      {isLoading && <OpacityLoader />} {/* Display loader on top of content */}
    </>
  );
};

export default Home;
