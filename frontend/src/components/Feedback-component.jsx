import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ToggleSwitch from './ToggleSwitch';
import OpacityLoader from './OpacityLoader';

const FeedbackComponent = ({user}) => {
  const [performanceRating, setPerformanceRating] = useState(0);
  const [uiRating, setUiRating] = useState(0);
  const [suggestionsRating, setSuggestionsRating] = useState(0);
  const [hover, setHover] = useState({ performance: null, ui: null, suggestions: null });
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAnonymous(true);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (performanceRating === 0 && uiRating === 0 && suggestionsRating === 0 && feedback.trim() === '') {
      alert('Please provide the feedback.');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isAnonymous) {
        response = await fetch(import.meta.env.VITE_BACKEND_URL + '/sendFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            performanceRating,
            uiRating,
            feedback,
            isAnonymous,
          }),
        });
      }
      else {
        response = await fetch(import.meta.env.VITE_BACKEND_URL + '/sendFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            performanceRating,
            uiRating,
            feedback,
            isAnonymous,
          }),
        });
      }
      const data = await response.json();

      if (response.status === 201) {
        setSubmitted(true);
        setPerformanceRating(0);
        setUiRating(0);
        setSuggestionsRating(0);
        setFeedback('');
      } else {
        alert('Some error ocurred, please try again');
        console.error('Error submitting feedback:', data);
      }
      setIsLoading(false);

    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    
  };

  const renderStars = (category, rating, setRating) => (
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={starValue}>
            <input
              type="radio"
              name={`${category}-rating`}
              value={starValue}
              className="hidden"
              onClick={() => setRating(starValue)}
            />
            <FaStar
              size={35}
              color={starValue <= (hover[category] || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover((prev) => ({ ...prev, [category]: starValue }))}
              onMouseLeave={() => setHover((prev) => ({ ...prev, [category]: null }))}
            />
          </label>
        );
      })}
    </div>
  );


  return (
    <>

    {isLoading && <OpacityLoader />}
    <div className="flex flex-col items-center justify-center p-4 md:w-[700px] w-[350px] mt-14">
      {submitted && (
        <p className="text-green-600 mb-4 text-center">Thank you for your feedback!</p>
      )}
      <form
        className={`w-full max-w-lg p-8 rounded-lg shadow-md transform transition-all duration-300 ease-in-out ${isAnonymous ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        onSubmit={handleSubmit}
      >
       <div className="mb-6 flex flex-col items-start">
            <h3 className={`text-xl ${isAnonymous ? 'text-white' : 'text-gray-800'} font-medium mb-2`}>
                Performance
            </h3>
        {renderStars('performance', performanceRating, setPerformanceRating)}
        </div>

        <div className="mb-6 flex flex-col items-start">
            <h3 className={`text-xl ${isAnonymous ? 'text-white' : 'text-gray-800'} font-medium mb-2`}>
                User Interface
            </h3>
            {renderStars('ui', uiRating, setUiRating)}
        </div>


        <textarea
          className={`w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-800`}
          rows="5"
          placeholder="Share your thoughts or suggestions here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <div className="flex items-center justify-center">
          <div className="mr-2 w-3/4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md text-lg"
            >
              Submit Feedback
            </button>
          </div>

           <div className="w-1/4 h-8 flex flex-col items-center justify-center">
            <ToggleSwitch setIsAnonymous={setIsAnonymous} user={user}/>

             <p className={`ml-4 mt-2 text-xs ${ isAnonymous? 'text-green-500' : 'text-gray-600'}`}>
                {isAnonymous ? 'Anonymous':'Go Anonymous'}
            </p>
          </div>
        </div>
      </form>
    </div>
    </>

  );
};

export default FeedbackComponent;
