import React, { useState } from 'react';
import FloatingBackground from './FloatingBackground';
import FeedbackComponent from '../components/Feedback-component';

const Feedback = () => {

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
