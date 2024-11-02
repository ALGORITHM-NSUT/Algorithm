import React, { createContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/me', {
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

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
