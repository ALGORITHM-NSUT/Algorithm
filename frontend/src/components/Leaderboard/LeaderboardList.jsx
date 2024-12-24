import React, { useEffect, useContext } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';

export const LeaderboardList = () => {
	const { leaderboard, fetchLeaderboard } = useContext(LeaderboardContext);
	useEffect(() => {
		fetchLeaderboard();
	}, []);

	return (
		<div className='w-full mx-auto p-6'>
			<h1 className='text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200'>Leaderboard</h1>
			<ul>
				{leaderboard.map((member, index) => (
					<LeaderboardListMember
						key={index}
						rank={index + 1}
						name={member.name}
						handle={member.handle}
						score={member.score}
					/>
				))}
			</ul>
		</div>
	);
};