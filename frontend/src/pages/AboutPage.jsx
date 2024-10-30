import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Core from "../components/Core";

const AboutPage = () => {
  return (
    <div className="flex flex-col bg-polygon bg-cover w-full ">
      <Navbar />
      <div className="flex-grow mb-24">
        <Core />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;


