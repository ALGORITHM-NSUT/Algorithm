import React, { useEffect, useContext, useState } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';
import PopupModal from './PopupModal';

export const LeaderboardList = ({ toggleModal }) => {
	const { leaderboard, fetchLeaderboard } = useContext(LeaderboardContext);
	const [selectedMember, setSelectedMember] = useState(null); // For modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

	useEffect(() => {
		fetchLeaderboard();
	}, []);

	const handleToggleModal = () => {
    // setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

	return (
		<>
			<div className='w-2/3 mx-auto p-6 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg'>
				<h1 className='text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200'>Leaderboard</h1>
				<ul className='w-full items-center flex flex-col justify-between drop-shadow-lg'>
					{leaderboard.map((member, index) => (
						<LeaderboardListMember
						key={index}
						toggleModal={handleToggleModal}
						rank={index + 1}
						name={member.name}
						handle={member.handle}
						score={member.score}
						/>
					))}
				</ul>
			</div>
			
			{isModalOpen && (
        <PopupModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          // title={`Details for ${selectedMember?.name}`}
          content={
            <div className='w-48 h-48 bg-red-600'>
              {/* <p><strong>Handle:</strong> {selectedMember?.handle}</p>
              <p><strong>Rank:</strong> #{leaderboard.indexOf(selectedMember) + 1}</p>
              <p><strong>Score:</strong> {selectedMember?.score}</p> */}
							I AM MODAL
            </div>
          }
        />
      )}
		</>
	);
};