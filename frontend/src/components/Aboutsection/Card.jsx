import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="text-center p-6  bg-gradient-to-r from-[#37375a] to-[#1f233f] rounded-lg shadow-lg transform transition duration-300  hover:scale-105 hover:shadow-2xl active:scale-95 flex flex-col  items-center h-[320px] md:h-[380px] lg:h-[300px] w-[200px] md:w-auto">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-200 text-sm text-center md:text-base mt-3 text-wrap">{description}</p>
    </div>
  );
};

export default Card;
