import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu state
  const [selectedLink, setSelectedLink] = useState(''); // State for active link
  const location = useLocation();

  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'TechNews', 'Feedback'];


  useEffect(() => {
      const currentPath = location.pathname.split('/')[1];
      setSelectedLink(currentPath || 'home');
  }, [location]);

  return (
    <nav style={{ backgroundColor: '#10111f' }} className="text-white p-4 sticky top-0 z-50 py-1">
      <div className="mx-auto flex justify-between items-center h-14">
        <div className="flex-shrink-0">
          <Link to={'/home'}>
            <img src="/static/logo.png" alt="Algorithm" className="h-16" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-10 text-lg justify-center flex-grow">
          {navLinks.map((link, index) => {
            const linkPath = link.toLowerCase().replace(/\s+/g, '');
            return (
              <Link
                key={index}
                to={`/${linkPath}`}
                className={`hover:text-gray-300 relative group ${
                  selectedLink === linkPath ? 'underline-active' : ''
                }`}
                onClick={() => setSelectedLink(linkPath)}
              >
                {link}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                    selectedLink === linkPath ? 'scale-x-100' : 'scale-x-0'
                  } group-hover:scale-x-100`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* User Profile Icon (for large screens) */}
        <div className="hidden md:flex items-center">
          <Link to="/Login" className="hover:text-gray-300">
            <FaUserCircle className="w-8 h-8 text-white" />
          </Link>
        </div>
      </div>

      {/* Mobile Nav Links with Downward Animation */}
      <div
        className={`will-change-transform will-change-opacity md:hidden transition-all duration-1000 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col space-y-6 mt-4">
          {navLinks.map((link, index) => {
            const linkPath = link.toLowerCase().replace(/\s+/g, '');
            return (
              <Link
                key={index}
                to={`/${linkPath}`}
                className={`block text-center text-white hover:text-gray-300 relative group transition duration-300 ease-in-out`}
                onClick={() => {
                  setSelectedLink(linkPath);
                  setIsOpen(false); // Close the menu on selection
                }}
                aria-label={`Go to ${link}`}
              >
                <span
                  className={`block ${selectedLink === linkPath ? 'font-semibold' : ''}`}
                >
                  {link}
                </span>
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                    selectedLink === linkPath ? 'scale-x-100' : 'scale-x-0'
                  } group-hover:scale-x-100`}
                ></span>
              </Link>
            );
          })}
          {/* Profile Link */}
          <Link
            to="/Login"
            className="block text-center text-white hover:text-gray-300 relative group transition duration-300 ease-in-out"
            onClick={() => setIsOpen(false)}
            aria-label="Go to Profile"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;