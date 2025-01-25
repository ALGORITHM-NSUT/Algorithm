import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/UserProvider';
import { LeaderboardList } from '../components/Leaderboard/LeaderboardList';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Pagination from '../components/Leaderboard/Pagination';
import { LeaderboardContext } from '../auth/LeaderboardProvider';
import Loader from '../components/Loaders/Loader';
import LeaderboardListMember from '../components/Leaderboard/LeaderboardListMember';

const Leaderboard = () => {
  // Receive `user` as a prop or from context
  const { user } = useContext(UserContext);
  const {
    leaderboard,
    fetchLeaderboard,
    setLeaderboard,
    leaderboardLoading,
    setLeaderboardLoading,
    userIndex,
  } = useContext(LeaderboardContext);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [membersPerPage, setMembersPerPage] = useState(10); // members per page
  const lastMemberIndex = currentPage * membersPerPage;
  const firstMemberIndex = lastMemberIndex - membersPerPage;

  // const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cachedLeaderboard = sessionStorage.getItem("leaderboardData");
    if (cachedLeaderboard) {
      setLeaderboard(JSON.parse(cachedLeaderboard));
      setLeaderboardLoading(false); // Show data instantly if cached
    }
    if (!leaderboardLoading) {
      fetchLeaderboard();
    }
  }, []);


  const handleRefreshStandings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/leaderBoard/showranking', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data); // Update leaderboard data
        sessionStorage.setItem('leaderboardData', JSON.stringify(data)); // Cache it
        console.log('Standings refreshed successfully.');
      } else {
        console.error('Failed to refresh standings.');
      }
    } catch (error) {
      console.error('Error while refreshing standings:', error);
    } finally {
      setLoading(false);
    }
  };


  if (leaderboardLoading) {
    return <Loader />;
  }

  const currentPageData = leaderboard.slice(firstMemberIndex, lastMemberIndex);

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
      {user && user?.admin && user?.name === "Jagrit Jain" && (
          <button
            onClick={async () => {
              try {
                setLeaderboardLoading(true); 
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/leaderBoard/showranking`); 
                setLeaderboardLoading(false); 
              } catch (error) {
                console.error("Error refreshing standings:", error);
                setLeaderboardLoading(false);
              }
            }}
            className="mt-10 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Refresh Standings
          </button>
    )}
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
