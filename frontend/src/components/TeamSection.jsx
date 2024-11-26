import React, { useMemo } from 'react';

const TeamSection = React.memo(({ title, members }) => {
  return (
    <>
      <div className="w-[80%] text-[#858491] text-[5vw] md:text-[20px] font-bold text-center mt-10 mb-2">
        {title}
      </div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-50 mx-auto"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 px-4 md:px-10 mt-8">
        {members.map(({ _id, name, designation, imageUrl, linkedinUrl }) => (
          <a
            key={_id}
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center md:bg-[#292f45]/30 bg-[#171637] p-6 rounded-lg transition-transform duration-200 hover:scale-105 aspect-w-1 aspect-h-1 md:backdrop-blur-xl"
          >
            <img
              src={imageUrl}
              alt={`${name} profile`}
              decoding="async"
              loading="lazy"
              className="h-32 md:h-52 w-full object-cover object-center rounded-lg"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-center mt-2">{name}</h2>
            <p className="text-gray-400 text-center">{designation}</p>
          </a>
        ))}
      </div>
    </>
  );
});

export default React.memo(TeamSection);