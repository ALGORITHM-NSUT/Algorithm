import React, { createContext, useState, useEffect, useCallback } from 'react';
import {io} from 'socket.io-client';
const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

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
    } finally {
      setLeaderboardLoading(false);
    }
  });

  useEffect(() => {
    const socket = io(import.meta.env.SOCKET_BACKEND_URL);
    fetchLeaderboard();
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('refresh-standings', (data)=>{
      console.log('refreshing standings: ', data.message);
      fetchLeaderboard();
    });

    return () => {
      socket.off('refresh-standings');
      socket.disconnect();
    };
  }, [fetchLeaderboard]);

  return (
    <LeaderboardContext.Provider
      value={{
        leaderboard,
        setLeaderboard,
        fetchLeaderboard,
        leaderboardLoading,
        setLeaderboardLoading,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export { LeaderboardContext, LeaderboardProvider };
