import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  // const [socket, setSocket] = useState(null);
  const socket = useRef(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leaderboard/show`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      const sortedData = data.data;
      sortedData.sort((a, b) => b.score - a.score);

      sessionStorage.setItem("leaderboardData", JSON.stringify(sortedData));
      setLeaderboard(sortedData);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(import.meta.env.SOCKET_BACKEND_URL); // Initialize socket only once
      console.log('Connected to Socket.IO server');

      socket.current.on('connect', () => {
        console.log('Socket connected');
      });

      socket.current.on('refresh-standings', (data) => {
        console.log('Refreshing standings:', data.message);
        fetchLeaderboard(); 
      });
    }

    fetchLeaderboard(); 

    return () => {
      if (socket.current) {
        socket.current.off('refresh-standings');
        socket.current.disconnect();
        console.log('Socket disconnected');
      }
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
