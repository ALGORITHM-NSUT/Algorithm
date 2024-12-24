import React, { useEffect, useContext, useState } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';
import PopupModal from './PopupModal';

export const LeaderboardList = ({ toggleModal }) => {
	const { leaderboard, fetchLeaderboard } = useContext(LeaderboardContext);

	useEffect(() => {
		fetchLeaderboard();
	}, []);

	// const [modal, setModal] = useState(false);
	
	// const toggleModal = () => {
	// 	console.log('modal click')
	// 	setModal(!modal);
	// }

	return (
		<>
			<div className='w-2/3 mx-auto p-6 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg'>
				<h1 className='text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200'>Leaderboard</h1>
				<ul className='w-full items-center flex flex-col justify-between drop-shadow-lg'>
					{leaderboard.map((member, index) => (
						<LeaderboardListMember
						key={index}
						toggleModal={toggleModal}
						rank={index + 1}
						name={member.name}
						handle={member.handle}
						score={member.score}
						/>
					))}
				</ul>
				{/* { (
					<PopupModal toggleModal={toggleModal} />
				)} */}
			</div>
			{/* <PopupModal toggleModal={toggleModal} /> */}
		</>
	);
};