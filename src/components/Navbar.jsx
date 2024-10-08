// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../utils/firebase_sdk'; // Import your auth object
import { handleLogin } from '../controllers/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'TechNews'];
  const navigate = useNavigate();

  // Function to handle sign out
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out using Firebase auth
      setIsLoggedIn(false); // Update login status
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Check user authentication status on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Update login status based on user state
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <nav style={{ backgroundColor: '#10111f' }} className="text-white p-4 sticky top-0 z-50 py-3 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center h-22">
        <div className="flex-shrink-0">
          <Link to={'/home'}>
            <img src="src/assets/logo.png" alt="Algorithm" className="h-16" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-10 text-lg justify-center flex-grow">
          {navLinks.map((link, index) => (
            <Link key={index} to={`/${link.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-gray-300">
              {link}
            </Link>
          ))}
        </div>

        {/* Conditional Sign In / Sign Out button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} // Call handleLogout on click
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => handleLogin(navigate)} // Call handleLogin
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign In
            </button>
          )}
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
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} // Call handleLogout
                className="block text-center bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => handleLogin(navigate)} // Call handleLogin
                className="block text-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
