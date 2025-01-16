import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { UserContext } from './UserProvider';

const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const [userIndex, setUserIndex] = useState(-1);

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
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (!isLoading && leaderboard.length > 0) {
      if (user) {
        const index = leaderboard.findIndex((obj) => obj.name === user.name);
        setUserIndex(index);
      } else {
        setUserIndex(-1); // No user logged in
      }
    }
  }, [isLoading, user, leaderboard]);

  return (
    <LeaderboardContext.Provider
      value={{
        leaderboard,
        setLeaderboard,
        fetchLeaderboard,
        leaderboardLoading,
        setLeaderboardLoading,
        userIndex,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export { LeaderboardContext, LeaderboardProvider };
