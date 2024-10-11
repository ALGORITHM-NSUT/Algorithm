import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase_sdk';
import { handleLogin } from '../controllers/auth';

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'TechNews'];
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

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

        <div className="hidden md:block">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => handleLogin(navigate)}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign In
            </button>
          )}
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
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="block text-center bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => handleLogin(navigate)}
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
}