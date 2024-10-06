import React from 'react';
import coreTeamMembers from '../constants/coreTeamData';

const Core = () => {
  return (
    <div className='flex flex-col items-center bg-[#191e2e] min-h-svh text-white py-10 w-full'>
      <div className='mt-10 flex flex-col items-center'>
        <h1 className="text-[100px] font-bold mb-4">Core Team '24</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-10 mt-8">
        {coreTeamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center bg-[#292f45] p-6 rounded-lg">
            <img
              src={member.image}
              alt={`${member.name} profile`}
              className="w-44 h-44 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Core;
