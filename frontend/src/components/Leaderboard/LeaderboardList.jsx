import React, { useEffect, useContext, useState } from 'react';
import { LeaderboardContext } from '../../auth/LeaderboardProvider';
import LeaderboardListMember from './LeaderboardListMember';
import PopupModal from './PopupModal';
import { Typography } from '@mui/material';
import { Code, DataObject, DataArray } from '@mui/icons-material';
import { UserContext } from '../../auth/UserProvider';

export const LeaderboardList = ({
  currentPageData,
  currentPage,
  membersPerPage,
}) => {
  const { user } = useContext(UserContext);
  const { leaderboard, fetchLeaderboard, userIndex } =
    useContext(LeaderboardContext);

  const [selectedMember, setSelectedMember] = useState(null); // For modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

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
      <div className="w-full md:w-8/12 mx-auto px-6">
        <h1 className="md:text-[80px] mb-5 md:leading-[6rem] leading-tight text-4xl font-bold text-gray-800 dark:text-gray-200 font-mono">
          Leaderboard
        </h1>
        <ul>
          {user &&
            userIndex !== -1 &&
            currentPage !== Math.floor(userIndex / membersPerPage + 1) && (
              <div className="mb-4">
                <LeaderboardListMember
                  toggleModal={handleToggleModal}
                  member={leaderboard[userIndex]}
                  rank={userIndex + 1}
                  isFirstPage={currentPage === 1}
                  isUser={true}
                />
              </div>
            )}
          {currentPageData.map((member, index) => (
            <LeaderboardListMember
              key={index}
              toggleModal={handleToggleModal}
              member={member}
              rank={index + 1 + (currentPage - 1) * membersPerPage}
              isFirstPage={currentPage === 1}
              isUser={
                userIndex !== -1 &&
                index + (currentPage - 1) * membersPerPage === userIndex
              }
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
              <div className="items-center">
                <p className="flex justify-between">
                  <div>
                    <Code sx={{ color: 'text.primary', mr: 1 }}></Code>
                    <strong>Leetcode:</strong>{' '}
                    {selectedMember.leetcodeRank === 0 ||
                    selectedMember.leetcodeRank === null
                      ? 'null'
                      : Math.floor(selectedMember?.leetcodeRank)}
                  </div>
                  <div className="max-w-28 line-clamp-1">
                    {selectedMember.leetcodeHandle !== 'N/A' && (
                      <span style={{ opacity: 0.5 }}>
                        {selectedMember?.leetcodeHandle}
                      </span>
                    )}
                  </div>
                </p>
                <hr />
                <p className="flex justify-between">
                  <div>
                    <DataObject
                      sx={{ color: 'text.primary', mr: 1 }}
                    ></DataObject>
                    <strong>Codeforces:</strong>{' '}
                    {selectedMember.codeforcesRank === 0 ||
                    selectedMember.codeforcesRank === null
                      ? 'null'
                      : Math.floor(selectedMember.codeforcesRank)}
                  </div>
                  <div className="max-w-28 line-clamp-1">
                    {selectedMember.codeforcesHandle !== 'N/A' && (
                      <span style={{ opacity: 0.5 }}>
                        {selectedMember?.codeforcesHandle}
                      </span>
                    )}
                  </div>
                </p>
                <hr />
              </div>
            </>
          }
        />
      )}
    </>
  );
};
