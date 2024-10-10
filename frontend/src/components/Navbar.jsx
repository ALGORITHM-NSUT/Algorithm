import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../utils/firebase_sdk'; // Import your Firebase auth config

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(null); // Error handling

  const navLinks = ['Home', 'About', 'Leaderboard', 'Projects', 'TechNews'];
  const navigate = useNavigate();

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true); // Update login state
      setIsModalOpen(false); // Close modal after successful sign-in
      setEmail(''); // Reset email field
      setPassword(''); // Reset password field
    } catch (error) {
      setError('Invalid email or password'); // Handle login error
      console.error("Error signing in:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update login state
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Set login state based on user
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
            <Link key={index} to={`/${link.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-gray-300">
              {link}
            </Link>
          ))}
        </div>

        {/* Sign In / Sign Out button */}
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
              onClick={() => setIsModalOpen(true)} // Open modal
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
                onClick={handleLogout} 
                className="block text-center bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)} // Open modal
                className="block text-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal for email and password input */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Sign In</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <button 
              onClick={handleSignIn} 
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded w-full transition duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="mt-4 text-red-600 hover:text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
