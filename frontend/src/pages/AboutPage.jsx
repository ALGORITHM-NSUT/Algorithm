import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Core from "../components/Core";
import FloatingBackground from './FloatingBackground';

const AboutPage = () => {
  return (
    <div className="flex flex-col w-full ">
      <Navbar />
      <div className="flex-grow mb-24">
        <FloatingBackground />
        <Core />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;


