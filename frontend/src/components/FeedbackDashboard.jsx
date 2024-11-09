import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import OpacityLoader from './OpacityLoader';

const FeedbackDashboard = ({userLoading}) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

    useEffect(() => {
        const fetchFeedbacks = async () => {
        const cachedFeedbacks = sessionStorage.getItem('feedbacks');
        if(cachedFeedbacks)setFeedbacks(JSON.parse(cachedFeedbacks))
        
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getFeedbacks`);

            if (!cachedFeedbacks || JSON.stringify(response.data) !== cachedFeedbacks) {
            setFeedbacks(response.data);
            sessionStorage.setItem('feedbacks', JSON.stringify(response.data));
            } 
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col items-center py-8 px-4">

      {feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 w-full max-w-7xl mt-6">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 md:w-[400px]">
              <div className="flex justify-between items-center">
                <div>

                <div className='flex items-center '>
                    <h3 className="font-semibold text-2xl mb-2 mr-4 w-30 truncate">
                    {feedback.user ? feedback.user.name : "Anonymous"}
                  </h3>
                
                    <p className="text-gray-500 text-xs">{new Date(feedback.createdAt).toLocaleString()}</p>

                
                </div>
                  
                  {feedback.user && (
                    <div className="text-sm text-gray-400">
                      <p>Email: {feedback.user.email}</p>
                      <p>Phone: {feedback.user.phoneNumber}</p>
                    </div>
                  ) }
                </div>
              </div>
              <p className="mt-4 text-lg text-gray-200 leading-relaxed">{feedback.feedback}</p>
              {feedback.performanceRating && (
                <div className="mt-4">
                  <span className="font-medium">Performance Rating:</span> {feedback.performanceRating}/5
                </div>
              )}
              {feedback.uiRating && (
                <div className="mt-2">
                  <span className="font-medium">UI Rating:</span> {feedback.uiRating}/5
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No feedbacks available.</p>
      )}
    </div>
  );
};

export default FeedbackDashboard;
