import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'Contact Us'];

  return (
    <nav style={{ backgroundColor: '#10111f' }} className="text-white p-4 sticky top-0 z-50 py-3 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center h-22">
        
        <div className="flex-shrink-0">
          <img src="src/assets/logo.png" alt="Algorithm" className="h-16" />
        </div>

        <div className="hidden md:flex space-x-10 text-lg justify-center flex-grow">
          {navLinks.map((link, index) => (
            <Link key={index} to={`/${link.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-gray-300">
              {link}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

      </div>

      {/* Dropdown Menu for small screens */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 mt-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={`/${link.toLowerCase().replace(/\s+/g, '')}`}
                className="block text-center text-white hover:text-gray-300"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
