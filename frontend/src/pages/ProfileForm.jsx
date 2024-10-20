import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Registercard';

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-polygon flex-grow justify-center items-center bg-cover">
        <Register />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
