import React, { useEffect, useContext, useState } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';
import PopupModal from './PopupModal';
import { Typography } from '@mui/material';
import { Code, DataObject, DataArray } from '@mui/icons-material';

export const LeaderboardList = ({ currentPageData }) => {
	const { leaderboard, fetchLeaderboard } = useContext(LeaderboardContext);
	const [selectedMember, setSelectedMember] = useState(null); // For modal content
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

	useEffect(() => {
		fetchLeaderboard();
	}, []);

	const handleToggleModal = (member) => {
		setSelectedMember(member);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedMember(null);
		setIsModalOpen(false);
	};

	return (
		<>
			<div className='w-11/12 mx-auto p-6'>
				<h1 className='text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200'>Leaderboard</h1>
				<ul>
					{currentPageData.map((member, index) => (
						<LeaderboardListMember
							key={index}
							toggleModal={handleToggleModal}
							member={member}
							rank={index + 1}
						// name={member.name}
						// handle={member.handle}
						// score={member.score}
						/>
					))}
				</ul>
			</div>
			{isModalOpen && (
				<PopupModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					title={selectedMember?.name}
					content={
						<>
							<div className='items-center'>
								<p><Code sx={{ color: 'text.primary', mr: 1 }}></Code><strong>Leetcode:</strong> {Math.floor(selectedMember?.leetcodeRank)}</p>
								<hr />
								<p><DataObject sx={{ color: 'text.primary', mr: 1 }}></DataObject><strong>Codeforces:</strong> {Math.floor(selectedMember.codeforcesRank)}</p>
								<hr />
								{/* <p><DataArray sx={{ color: 'text.primary', mr: 1 }}></DataArray><strong>CodeChef:</strong> {selectedMember?.codeChef}</p>
								<hr /> */}
							</div>
						</>
					}
				/>
			)}
		</>
	);
};