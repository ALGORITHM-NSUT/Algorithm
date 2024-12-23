import React, { useEffect } from 'react';

const ScrollPrompt = () => {
  useEffect(() => {
    const scrollPrompt = document.getElementById('scrollPrompt');
    const interval = setInterval(() => {
      scrollPrompt.classList.toggle('opacity-100');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div
      id="scrollPrompt"
      onClick={handleScroll}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-70 transition-opacity duration-300 flex flex-col items-center"
    >
      <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 15l7 7 7-7"
          />
        </svg>
      </div>
      <p>Scroll Down</p>
    </div>
  );
};

export default ScrollPrompt;
