import React, { useEffect, useContext, useState } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';
import PopupModal from './PopupModal';
import { Typography } from '@mui/material';

export const LeaderboardList = () => {
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
			<div className='w-full mx-auto p-6'>
				<h1 className='text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200'>Leaderboard</h1>
				<ul>
					{leaderboard.map((member, index) => (
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
          // title={`Details for ${member?.name}`}
          content={
						<>
							<Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
								{selectedMember.name}
							</Typography>
							<div className='items-center'>
								<p><strong>Leetcode:</strong> {selectedMember?.leetcode}</p>
								<p><strong>Codeforces:</strong> {selectedMember.codeForces}</p>
								<p><strong>CodeChef:</strong> {selectedMember?.codeChef}</p>
							</div>
						</>
          }
        />
      )}
		</>
	);
};