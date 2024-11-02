import React, { useEffect, useState } from 'react';

const words = [
  "The first computer virus was created in 1986 and was called Brain.",
  "More than 90% of the world's currency is digital.",
  "The first 1GB hard disk was announced by IBM in 1980, and it weighed over 500 pounds.",
  "Email predates the World Wide Web by more than a decade.",
  "The first computer program was written by Ada Lovelace in the 1800s.",
  "The term 'robot' comes from a Czech word meaning 'forced labor.'",
  "The first webcam was used to monitor a coffee pot at Cambridge University.",
  "Google’s first storage was made from Lego bricks.",
  "The world's first website is still online? It was created by Tim Berners-Lee in 1991.",
  "The first smartphone was IBM's Simon Personal Communicator, released in 1994."
];

const Loader = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // Function to get a random fact
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      setFact(words[randomIndex]);
    };

    getRandomFact(); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-white">Did You Know?</p>
      <p className="mt-2 text-xl text-white">{fact}</p>
    </div>
  );
};

export default Loader;
