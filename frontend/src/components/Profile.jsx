import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile'))); // State to store user info
  const [addPass, setAddPass] = useState(false);
  const navigate = useNavigate();

  // Redirect to login page if user is not found after loading
  useEffect(() => {
    if (!user) {
      navigate('/login');  // Redirect to login if no user found
    }
  }, [user, navigate]);

  // Logout user
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',  // Assuming logout is a GET request
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",  // Send cookies with request
      });

      if (response.ok) {
        localStorage.clear();
        setUser(null);  // Clear user info after logout
        alert('Logged out successfully!');
        navigate('/');  // Redirect to the home page after logging out
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p className="text-lg mb-4">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2"
          >
            Logout
          </button>
          <br />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
