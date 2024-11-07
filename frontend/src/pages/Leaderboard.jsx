import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingBackground from './FloatingBackground';
import Loader from '../components/Loader';

const Leaderboard = () => {
return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1 className="mb-40 md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center font-mono">Coming Soon!</h1>
      <div className="flex-grow">
        <FloatingBackground />
        
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;