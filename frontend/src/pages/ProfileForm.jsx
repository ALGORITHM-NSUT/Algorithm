import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Registercard';
import FloatingBackground from './FloatingBackground';

const LoginPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (

    
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-6 flex-grow justify-center items-center bg-cover min-h-screen">
        <FloatingBackground />
        <Register />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
