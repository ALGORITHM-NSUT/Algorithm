import React from 'react';

const Modal = ({ isOpen, onClose, onSignIn, email, setEmail, password, setPassword, error }) => {
  if (!isOpen) return null; // Only render the modal if it is open

  return (
    <div className="fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto overflow-hidden">
        <h2 className="text-2xl mb-4">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button 
          onClick={onSignIn} 
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded w-full transition duration-300"
        >
          Sign In
        </button>
        <button 
          onClick={onClose} 
          className="mt-4 text-red-600 hover:text-red-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
