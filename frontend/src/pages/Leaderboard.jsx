import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/UserProvider';
import { LeaderboardList } from '../components/Leaderboard/LeaderboardList';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import PopupModal from '../components/Leaderboard/PopupModal';

const Leaderboard = () => { // Receive `user` as a prop or from context
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    console.log('modal click')
    setModal(!modal);
  }

  return (
    <div className="flex-grow relative flex flex-col items-center justify-center text-center min-h-screen">
      <LeaderboardList 
      toggleModal={toggleModal} 
      />
      {/* Conditionally render Join Now button if no user is logged in */}
      {!user && (
        <Link to="/login" className="mt-10">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Join Now
          </button>
        </Link>
      )}
      {modal && (
        <PopupModal toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Leaderboard;
