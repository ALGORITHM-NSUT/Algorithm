import React, { useEffect, useState } from 'react';
import words from '../constants/Random_facts';

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 relative">
      <img
        src="src/assets/algo.png"
        alt="Bouncing Logo"
        className="h-16 custom-bounce"
      />
      <p className="mt-4 text-xl font-semibold text-white animate-text">Did You Know?</p>
      <p className="mt-2 text-md text-neutral-300 animate-fact">{fact}</p>
    </div>
  );
};

export default Loader;
