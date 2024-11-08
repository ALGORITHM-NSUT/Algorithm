import React, { useEffect } from 'react';
import FloatingBackground from './FloatingBackground';
import FeedbackComponent from '../components/Feedback-component';

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
        <div className='flex-grow'>
            <FloatingBackground />

            <FeedbackComponent />
        </div>

    </div>
  );
};

export default Feedback;
