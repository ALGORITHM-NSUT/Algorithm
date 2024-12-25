import React from 'react';

const LeaderboardListMember = ({ toggleModal, member, rank }) => {
	return (
		<li 
		onClick={() => toggleModal(member)} 
		className='py-4 px-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 my-1'>
			<div className='flex items-center justify-between w-full'>
				<span className="text-lg font-bold text-gray-700 dark:text-gray-300 w-10">#{rank}</span>
				<div className='ml-8'>
					<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">{member.handle}</p>
				</div>
				<div className='flex-grow'>
					<p className="text-lg font-semibold text-blue-600 dark:text-blue-400 justify-self-end">
						{member.score}
					</p>
				</div>
			</div>
		</li >
	);
};

export default LeaderboardListMember;