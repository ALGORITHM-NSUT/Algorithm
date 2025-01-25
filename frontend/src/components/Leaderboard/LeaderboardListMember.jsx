import React from 'react';

const LeaderboardListMember = ({
  toggleModal,
  member,
  rank,
  isFirstPage,
  isUser,
}) => {
  const rankStyles = [
    {
      border: '3px solid transparent',
      borderImage: 'linear-gradient(rgb(234 179 8), rgb(161 98 7 / 1))',
      borderImageSlice: 1,
    }, // 1st
    {
      border: '3px solid transparent',
      borderImage: 'linear-gradient(rgb(255 255 255), rgb(255 255 255 / 1))',
      borderImageSlice: 1,
    }, // 2nd
    {
      border: '3px solid transparent',
      borderImage: 'linear-gradient(rgb(217 119 6), rgb(146 64 14 / 1))',
      borderImageSlice: 1,
    }, // 3rd
  ];

  const topRankOutsideGlow = [
    'shadow-[0_0px_8px_rgba(234,179,8,1)]',
    'shadow-[0_0px_8px_rgba(255,255,255,1)]',
    'shadow-[0_0px_8px_rgba(217,119,6,1)]',
  ];
  const topRankInsideGlow = [
    'shadow-[inset_0_0px_14px_rgba(234,179,8,1)]',
    'shadow-[inset_0_0px_14px_rgba(255,255,255,1)]',
    'shadow-[inset_0_0px_14px_rgba(217,119,6,1)]',
  ];

  const isTopRank = rank <= 3;

  const style = isTopRank ? rankStyles[rank - 1] : {};

  return (
    <div
      className={`w-full cursor-pointer
        ${isUser && !isTopRank ? 'shadow-[0_0px_8px_rgba(150,0,255,1)]' : ''} 
        ${isTopRank ? topRankOutsideGlow[rank - 1] : ''} 
        overflow-hidden rounded-md my-1.5`}
    >
      <li
        onClick={() => toggleModal(member)}
        style={style}
        className={`w-full 
          ${isTopRank ? topRankInsideGlow[rank - 1] : ''} 
          ${
            isUser
              ? 'bg-gradient-to-r from-gray-700/60 via-slate-500/60 to-gray-700/60'
              : 'dark:bg-gray-700/60'
          } 
          overflow-hidden py-5 px-4 border-solid rounded-sm 
          dark:hover:bg-gray-600 my-[0px] duration-75 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-md font-bold text-gray-700 dark:text-gray-300 w-10">
            #{rank}
          </span>
          <div className="ml-8 text-left">
            <p className="text-md font-medium text-gray-900 dark:text-gray-100">
              {member.name}
            </p>
          </div>
          {isUser && <p className="ml-2 font-semibold">(You)</p>}
          <div className="flex-grow">
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 justify-self-end">
              {(Math.round(member.score * 100) / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default LeaderboardListMember;
