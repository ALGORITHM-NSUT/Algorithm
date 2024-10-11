import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // FontAwesome user icon (install react-icons if not already installed)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu state

  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'TechNews'];

  return (
    <nav style={{ backgroundColor: '#10111f' }} className="text-white p-4 sticky top-0 z-50 py-3 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div className="flex-shrink-0">
          <Link to={'/home'}>
            <img src="src/assets/logo.png" alt="Algorithm" className="h-16" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-10 text-lg justify-center flex-grow">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={`/${link.toLowerCase().replace(/\s+/g, '')}`} 
              className="hover:text-gray-300 relative group"
            >
              {link}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
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

        {/* User Profile Icon (for large screens) */}
        <div className="hidden md:flex items-center">
          <Link to="/userProfile" className="hover:text-gray-300">
            <FaUserCircle className="w-8 h-8 text-white" />
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 mt-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={`/${link.toLowerCase().replace(/\s+/g, '')}`}
                className="block text-center text-white hover:text-gray-300 relative group"
              >
                {link}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}
            {/* User Profile Link in the dropdown */}
            <Link to="/userProfile" className="block text-center text-white hover:text-gray-300">
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


