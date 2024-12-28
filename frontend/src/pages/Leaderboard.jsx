import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/UserProvider';
import { LeaderboardList } from '../components/Leaderboard/LeaderboardList';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Pagination from '../components/Leaderboard/Pagination';
import { LeaderboardContext } from '../auth/LeaderboardProvider';
import Loader from '../components/Loaders/Loader';

const Leaderboard = () => {
  // Receive `user` as a prop or from context
  const {
    leaderboard,
    fetchLeaderboard,
    setLeaderboard,
    leaderboardLoading,
    setLeaderboardLoading,
  } = useContext(LeaderboardContext);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [membersPerPage, setMembersPerPage] = useState(10); // members per page
  const lastMemberIndex = currentPage * membersPerPage;
  const firstMemberIndex = lastMemberIndex - membersPerPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cachedLeaderboard = sessionStorage.getItem('leaderboardData');
    if (cachedLeaderboard) {
      setLeaderboard(JSON.parse(cachedLeaderboard));
      setLeaderboardLoading(false); // Show data instantly if cached
    }
    if (!leaderboardLoading) {
      fetchLeaderboard();
    }
  }, []);

  if (leaderboardLoading) {
    return <Loader />;
  }

  const currentPageData = leaderboard.slice(firstMemberIndex, lastMemberIndex);

  const { user } = useContext(UserContext);

  return (
    <div className="flex-grow relative flex flex-col items-center justify-center text-center min-h-screen py-10">
      <LeaderboardList
        currentPageData={currentPageData}
        currentPage={currentPage}
        membersPerPage={membersPerPage}
      />
      <Pagination
        totalMembers={leaderboard.length}
        membersPerPage={membersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Conditionally render Join Now button if no user is logged in */}
      {!user && (
        <Link to="/login" className="mt-10">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Join Now
          </button>
        </Link>
      )}
    </div>
  );
};

export default Leaderboard;
