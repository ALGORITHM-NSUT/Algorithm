import React from 'react';

const LeaderboardListMember = ({ rank, name, handle, score }) => {
	return (
		<li className='flex items-center justify-between py-4 px-4 bg-white dark:bg-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600'>
			<div className='flex items-center'>
				<span className="text-lg font-bold text-gray-700 dark:text-gray-300 w-10">#{rank}</span>
				<div className='ml-4'>
					<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">{handle}</p>
				</div>
				<p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{score}</p>
			</div>
		</li>
	);
};

export default LeaderboardListMember;