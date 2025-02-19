import React, { useEffect, useState } from 'react';
import words from '../../constants/Random_facts';

const Loader = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      setFact(words[randomIndex]);
    };

    getRandomFact();
    const interval = setInterval(getRandomFact, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transform transition-all duration-300 ease-in-out bg-gray-900 relative">
      <img
        src="/static/loading_algo.gif"
        width={'150px'}
        alt="Bouncing Logo"
      />
      <p className="mx-3 text-xl font-semibold text-white animate-text z-10">Did You Know?</p>
      <p className="mx-3 mt-2 text-md text-neutral-300 animate-fact text-center">{fact}</p>
    </div>

  );
};

export default Loader;
