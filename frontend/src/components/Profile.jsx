import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);  // State to store user info
  const [loading, setLoading] = useState(true);  // State for loading
  const navigate = useNavigate();

  // Fetch user details from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",  // Required to send cookies along
        });

        const data = await response.json();

        console.log(data);

        if (response.ok && data.user) {
          setUser(data.user);  // Set the user data if they are logged in
        } else {
          setUser(null);  // No user is logged in
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);  // Set user to null in case of error
      } finally {
        setLoading(false);  // Stop loading after data is fetched
      }
    };

    fetchUserData();
  }, []);

  // Redirect to login page if user is not found after loading
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');  // Redirect to login if no user found
    }
  }, [user, loading, navigate]);

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

  if (loading) {
    return <div className="text-center">Loading...</div>;  // Show loading spinner while fetching data
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p className="text-lg mb-4">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
