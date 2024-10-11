import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/join-us"); // Redirects to the form page
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen text-white py-10 w-full bg-[#191e2e] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="src/assets/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center mt-10 p-4">
        <div className="flex items-center justify-center mb-4 flex-wrap">
          <img
            src="src/assets/algo.png"
            alt="Logo"
            className="w-32 h-24 md:w-40 md:h-32 lg:w-50 lg:h-36 mr-4"
          />
          {/* Gradually decreasing font size for the Algorithm text */}
          <h1 className="text-7xl md:text-[130px] lg:text-[250px] text-gray-200 font-bold mt-2">
            Algorithm
          </h1>
        </div>

      <div className="text-gray-300 font-bold text-center mb-4">
        <p className="text-xl lg:text-5xl">Code . Set . Go</p>
      </div>



        <p className="text-lg sm:text-xl max-w-3xl text-gray-400 text-center mb-8 px-4">
          Join us to explore, learn, and innovate together!
        </p>

        <div className="flex space-x-4">
          <Link
            to="/join-us"
            className="bg-[#4c56d7] text-white rounded-full px-6 py-3 text-lg hover:shadow-lg transition duration-300"
          >
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
