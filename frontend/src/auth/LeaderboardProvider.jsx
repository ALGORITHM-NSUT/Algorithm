import React, { createContext, useState, useEffect, useCallback } from 'react';

const LeaderboardContext = createContext();

const LeaderboardProvider = ({ children }) => {
	const [leaderboard, setLeaderboard] = useState([]);
	const fetchLeaderboard = useCallback(async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leaderboard/show`, {
				method: 'GET',
			});
			const data = await response.json();

			const membersData = data.data;
			membersData.sort((a, b) => b.score - a.score);

			setLeaderboard(data.data);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
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