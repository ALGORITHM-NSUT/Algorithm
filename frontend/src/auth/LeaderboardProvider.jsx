import React, { createContext, useState, useEffect, useCallback } from 'react';

const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
	const [leaderboard, setLeaderboard] = useState([]);
	const fetchLeaderboard = useCallback(async () => {
		// Dummy data for now
		setLeaderboard([
			{ name: 'Alice', handle: 'alice123', score: 1200, leetcode: 2345 , codeForces: 1764 , codeChef: 9872 },
			{ name: 'Bob', handle: 'bob99', score: 1100, leetcode: 9038, codeForces: 7422, codeChef: 9284 },
			{ name: 'Charlie', handle: 'charlie', score: 1050, leetcode: 9874, codeForces:2736 , codeChef:5392 },
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