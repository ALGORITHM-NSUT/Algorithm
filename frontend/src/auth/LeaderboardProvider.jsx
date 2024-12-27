import React, { createContext, useState, useEffect, useCallback } from 'react';

const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leaderboard/show`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();

      const sortedData = data.data;
      sortedData.sort((a, b) => b.score - a.score);

      sessionStorage.setItem('leaderboardData', JSON.stringify(sortedData));
      setLeaderboard(sortedData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  });

  return (
    <LeaderboardContext.Provider
      value={{ leaderboard, setLeaderboard, fetchLeaderboard }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export { LeaderboardContext, LeaderboardProvider };
