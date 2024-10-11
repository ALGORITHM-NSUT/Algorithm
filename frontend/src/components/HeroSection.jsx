import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start({
      y: [50, 0],
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const handleJoinUsClick = () => {
    navigate("/join-us");
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen text-white py-10 w-full bg-[#191e2e] overflow-hidden">
      <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="src/assets/gifgif.gif"
          alt="Background animation"
      />


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center mt-10 p-4"
      >
        <div className="flex items-center justify-center mb-4 flex-wrap">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="src/assets/algo.png"
            alt="Logo"
            className="w-24 h-18 md:w-32 md:h-24 lg:w-40 lg:h-30 mr-4"
          />
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[180px] text-gray-200 font-bold mt-2 font-sans"
          >
            Algorithm
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-bold text-center mb-4 font-sans"
        >
          <p className="hidden sm:block">Code . Set . Go</p>
          <p className="block sm:hidden">Code</p>
          <p className="block sm:hidden">Set</p>
          <p className="block sm:hidden">Go</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl max-w-3xl text-gray-400 text-center mb-8 px-4 font-sans"
        >
          Join us to explore, learn, and innovate together!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="relative z-10 mb-20"
      >
        <Link
          to="/join-us"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#4c56d7] rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#3a42a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c56d7]"
          onClick={handleJoinUsClick}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#6a11cb] to-[#2575fc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
          <span className="relative z-10 flex items-center">
            <span className="mr-2">Join Now</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}