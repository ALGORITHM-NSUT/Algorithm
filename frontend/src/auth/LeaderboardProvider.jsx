import React, { createContext, useState, useEffect, useCallback } from 'react';

const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
	const [leaderboard, setLeaderboard] = useState([]);
	const fetchLeaderboard = useCallback(async () => {
		// Dummy data for now
		setLeaderboard([
			{ name: 'Alice', handle: 'alice123', score: 1200 },
			{ name: 'Bob', handle: 'bob99', score: 1100 },
			{ name: 'Charlie', handle: 'charlie', score: 1050 },
		]);
	});
	useEffect(() => {
		fetchLeaderboard();
	}, []);
	return (
		<LeaderboardContext.Provider value={{ leaderboard, setLeaderboard, fetchLeaderboard }}>
			{children}
		</LeaderboardContext.Provider>
	)
};

export { LeaderboardContext, LeaderboardProvider };