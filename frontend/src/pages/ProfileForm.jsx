import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Registercard';

const LoginPage = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="bg-polygon flex justify-center items-center h-screen bg-cover">
        <Register />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
