import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/join-us");
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen text-white py-10 w-full bg-[#191e2e] overflow-hidden">
    
      <video
        autoPlay
        loop
        muted
        poster="src/assets/vid_ss.png"
        preload = "none"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="src/assets/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center mt-10 p-4">
        <div className="flex items-center justify-center mb-4 flex-wrap">
          <img
            src="src/assets/algo.png"
            alt="Logo"
            className="w-24 h-18 md:w-32 md:h-24 lg:w-40 lg:h-30 mr-4"
          />
          {/* Gradually decreasing font size for the Algorithm text */}
          <h1 className="text-7xl md:text-[130px] lg:text-[250px] text-gray-200 font-bold mt-2">
            Algorithm
          </h1>
        </div>

        <div className="text-gray-300 font-bold text-center mb-4">
          <p className="text-xl lg:text-5xl">Code . Set . Go</p>
        </div>

        <p
          className="text-lg sm:text-xl max-w-3xl text-gray-400 text-center mb-8 px-4 font-sans"
        >
          Join us to explore, learn, and innovate together!
        </p>
      </div>

      <div className="relative z-10 mb-20">
        <Link
          to="/join-us"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#4c56d7] rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#3a42a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c56d7]"
          onClick={handleJoinUsClick}
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-2">Join Now</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
