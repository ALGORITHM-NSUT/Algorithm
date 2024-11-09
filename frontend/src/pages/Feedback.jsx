import React, { useContext, useEffect, useState } from 'react';
import FloatingBackground from './FloatingBackground';
import FeedbackComponent from '../components/Feedback-component';
import { UserContext } from "../auth/UserProvider";
import Loader from '../components/Loader';
import FeedbackDashboard from '../components/FeedbackDashboard';

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, isLoading } = useContext(UserContext);
  const [isCheck, setIsCheck] = useState(true);

  if (isLoading) {
    return <Loader />;
  }

  const handleClick = () => {
    setIsCheck(!isCheck); // Toggle feedback mode (write/view)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <FloatingBackground />

        <div className="mt-12 flex flex-col justify-center items-center transition-all duration-500">
          {/* Heading changes based on isCheck */}
          <h2 className="text-3xl font-semibold text-center transition-all duration-500 font-mono">
            {isCheck ? 'We Value Your Feedback' : 'Feedbacks'}
          </h2>

          {user?.admin && (
            <div className="flex items-center ml-6 transition-all duration-500">
              {/* Dynamic Label */}
              <label className="text-lg mr-4">
                {isCheck ? 'View Feedbacks' : 'Write Feedback'}
              </label>
              <input
                type="checkbox"
                checked={!isCheck}
                onChange={handleClick}
                className="h-5 w-5 transition-all duration-300"
              />
            </div>
          )}
        </div>

        {/* Show feedback component or dashboard based on isCheck state */}
        <div className="flex justify-center mt-8">
          {isCheck ? (
            <FeedbackComponent user={user || null} />
          ) : (
            user?.admin && <FeedbackDashboard userLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
