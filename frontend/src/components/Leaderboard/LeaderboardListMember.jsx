import React from 'react';

const LeaderboardListMember = ({ toggleModal, member, rank, isFirstPage }) => {
	const rankStyles = [
		{
			border: "2px solid transparent",
			borderImage: "linear-gradient(rgb(234 179 8), rgb(161 98 7 / 0))",
			borderImageSlice: 1,
		}, // 1st
		{
			border: "2px solid transparent",
			borderImage: "linear-gradient(rgb(255 255 255), rgb(255 255 255 / 0))",
			borderImageSlice: 1,
		}, // 2nd
		{
			border: "2px solid transparent",
			borderImage: "linear-gradient(rgb(217 119 6), rgb(146 64 14 / 0))",
			borderImageSlice: 1,
		} // 3rd
	];
	// TODO: MAKE THE GRADIENT BORDERS ROUNDED (FOR THE TOP 3 RANKS)

	const isTopRank = rank <= 3;

	const style = (isFirstPage && isTopRank) ? rankStyles[rank - 1] : {}; // for the border gradients (top 3 ranks)

	return (
		<li
			onClick={() => toggleModal(member)}
			style={style}
			className={`${isTopRank ? "" : "rounded-md"} py-4 px-4 dark:bg-gray-700/60 shadow-sm 
							hover:bg-gray-50 dark:hover:bg-gray-600 my-1.5 transition-colors duration-400 backdrop-blur-md`}
		>
			<div className='flex items-center justify-between w-full'>
				<span className="text-lg font-bold text-gray-700 dark:text-gray-300 w-10">#{rank}</span>
				<div className='ml-8 text-left'>
					<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">{member.codeforcesHandle}</p>
				</div>
				<div className='flex-grow'>
					<p className="text-lg font-semibold text-blue-600 dark:text-blue-400 justify-self-end">
						{(Math.round(member.score * 10000) / 100).toFixed(2)}
						{/* this makes sure that the number is displayed upto 2 decimal places */}
					</p>
				</div>
			</div>
		</li >
	);
};

export default LeaderboardListMember;