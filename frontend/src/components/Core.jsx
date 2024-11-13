import React from 'react';

const Core = ({ members }) => {
  return (
    <div className='flex flex-col items-center text-white py-10 w-full mb-24'>
      {/* Header */}
      <h1 className="text-[10vw] md:text-[100px] font-bold mb-16 font-mono">Core Team '24</h1>

      {/* Management Section */}
      <div className="w-[80%] text-[#858491] text-[5vw] md:text-[20px] font-bold text-center mb-2">
        MANAGEMENT
      </div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-50 mx-auto"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 px-4 md:px-10 mt-8">
        {members.withoutSubPosition.map((member) => (
          <a
            key={member._id}
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-[#292f45]/30 p-6 rounded-lg transition-transform duration-200 hover:scale-105 aspect-w-1 aspect-h-1 backdrop-blur-xl"
          >
            <img
              src={import.meta.env.VITE_CLOUDINARY_BUCKET + member.imageUrl}
              alt={`${member.name} profile`}
              decoding="async"
              loading="lazy"
              className="h-32 md:h-52 w-full object-cover object-center rounded-lg"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-center mt-2">{member.name}</h2>
            <p className="text-gray-400 text-center">{member.designation}</p>
          </a>
        ))}
      </div>

      {/* Tech Heads Section */}
      <div className="w-[80%] text-[#858491] text-[5vw] md:text-[20px] font-bold text-center mt-10 mb-2">
        Tech Heads
      </div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-50 mx-auto"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 px-4 md:px-10 mt-8">
        {members.withSubPosition.map((member) => (
          <a
            key={member._id}
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-[#292f45]/30 p-6 rounded-lg transition-transform duration-200 hover:scale-105 aspect-w-1 aspect-h-1 backdrop-blur-xl"
          >
            <img
              src={import.meta.env.VITE_CLOUDINARY_BUCKET + member.imageUrl}
              alt={`${member.name} profile`}
              decoding="async"
              loading="lazy"
              className="h-32 md:h-52 w-full object-cover object-center rounded-lg"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-center mt-2">{member.name}</h2>
            <p className="text-gray-400 text-center">{member.designation}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Core);
