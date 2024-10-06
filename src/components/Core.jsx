import React from 'react';
import coreTeamMembers from '../constants/coreTeamData';

const Core = () => {
  return (
    <div className='flex flex-col items-center bg-[#191e2e] min-h-screen text-white py-10 w-full'>
      <div className='mt-10 flex flex-col items-center'>
        <h1 className="text-[5vw] md:text-[100px] font-bold mb-4">Core Team '24</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 px-4 md:px-10 mt-8">
        {coreTeamMembers.map((member, index) => (
          <a
            key={index}
            href={member.linkedinUrl} // Use the LinkedIn URL from your data
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security measure
            className="flex flex-col items-center bg-[#292f45] p-6 rounded-lg transition-transform duration-200 hover:scale-105"
          >
            <img
              src={member.imageUrl}
              alt={`${member.name} profile`}
              className="rounded-3xl mb-4 w-24 h-24 md:w-32 md:h-32 object-cover" // Set fixed width/height and object-cover
            />
            <h2 className="text-xl md:text-2xl font-semibold text-center">{member.name}</h2>
            <p className="text-gray-400 text-center">{member.designation}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Core;
