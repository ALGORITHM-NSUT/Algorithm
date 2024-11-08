import React, { useContext, useEffect } from 'react';
import FloatingBackground from './FloatingBackground';
import FeedbackComponent from '../components/Feedback-component';
import  {UserContext}  from "../auth/UserProvider";
import Loader from '../components/Loader';

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
        <div className='flex-grow'>
            <FloatingBackground />

            <FeedbackComponent user={user}/>
        </div>

    </div>
  );
};

export default Feedback;
