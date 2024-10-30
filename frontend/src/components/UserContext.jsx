import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Function to fetch user data on app load
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/me", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Check for user data when the app loads
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
