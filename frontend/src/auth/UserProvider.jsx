import React, { createContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/me`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        if (response.status === 401) {
          // 401 status typically means unauthorized, indicating the token may have expired
          alert('Your session has expired. Please log in again.');
          setUser(null);
        }
        else if (response.ok) {
          const data = await response.json();
          setUser(data.member);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
