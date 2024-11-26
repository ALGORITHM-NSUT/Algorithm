import React, { useContext, useEffect, useState } from 'react';
import FeedbackComponent from '../components/Feedback-component';
import { UserContext } from "../auth/UserProvider";
import Loader from '../components/Loader';
import FeedbackDashboard from '../components/FeedbackDashboard';

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, isLoading } = useContext(UserContext);
  const [isCheck, setIsCheck] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const handleClick = () => {
    setIsCheck(!isCheck); // Toggle feedback mode (write/view)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">

        <div className="mt-12 flex flex-col justify-center items-center transition-all duration-500">
         <div className="flex items-center"  >
            <label className="text-lg mr-4">
              {isCheck ? 'View Feedbacks' : 'Write Feedback'}
            </label>

            {user?.admin &&
            (<div className="relative" >
              <input
                type="checkbox"
                checked={isCheck}
                className="toggle-checkbox hidden"
                id="toggleSwitch"
                onChange={handleClick}
              />
              <label
                htmlFor="toggleSwitch"
                className="toggle-label block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-all duration-300"
              ></label>
              <span className={`toggle-circle ${isCheck ? 'translate-x-6' : 'translate-x-0'}` }  onClick={handleClick}></span>
            </div>)}
          </div>

        </div>

        {/* Show feedback component or dashboard based on isCheck state */}
        <div className="flex justify-center mt-8">
          {!isCheck ? (
            <FeedbackComponent user={user || null} />
          ) : (
            user?.admin && <FeedbackDashboard userLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Feedback);
