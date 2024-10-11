import React, { useEffect, useState } from 'react';

const Core = () => {
  const [members, setMembers] = useState({ withSubPosition: [], withoutSubPosition: [] });
  useEffect(() => {
    fetch('http://localhost:5000/core')
      .then((response) => response.json())
      .then((data) => {
        const withSubPosition = data.members.filter(member => member.subPosition);
        const withoutSubPosition = data.members.filter(member => !member.subPosition);
        setMembers({ withSubPosition, withoutSubPosition });
      })
      .catch((error) => console.error('Error fetching members:', error));
  }, []);


  return (
    <div className='flex flex-col items-center min-h-screen text-white py-10 w-full'>
      <div className='mt-10 flex flex-col items-center'>
        <h1 className="text-[10vw] md:text-[100px] font-bold mb-20">Core Team '24</h1>

      </div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-0 my-4 mx-auto text-[#858491] text-[5vw] md:text-[20px] font-bold" >MANAGEMENT</div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-50 my-4 mx-auto"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 px-4 md:px-10 mt-8">

        {members.withoutSubPosition.map((member) => (
          <a
            key={member._id}
            href={member.linkedinUrl} // Use the LinkedIn URL from your data
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security measure
            className="flex flex-col items-center bg-[#292f45] p-6 rounded-lg transition-transform duration-200 hover:scale-105 aspect-w-1 aspect-h-1"
          >
            <img
              src={"https://res.cloudinary.com/dzmckbejo/image/upload/" + member.imageUrl}
              alt={`${member.name} profile`}
              className="h-52 w-full object-cover object-end rounded-lg" // Set fixed width/height and object-cover
            />
            <h2 className="text-xl md:text-2xl font-semibold text-center">{member.name}</h2>
            <p className="text-gray-400 text-center">{member.designation}</p>
          </a>
        ))}
      </div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-0 my-4 mx-auto text-[#858491] text-[5vw] md:text-[20px] font-bold" >Tech Heads</div>
      <div className="w-[80%] h-1 bg-[#858491] bg-opacity-50 my-4 mx-auto"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 px-4 md:px-10 mt-8">
        {members.withSubPosition.map((member) => (
          <a
            key={member._id}
            href={member.linkedinUrl} // Use the LinkedIn URL from your data
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security measure
            className="flex flex-col items-center bg-[#292f45] p-6 rounded-lg transition-transform duration-200 hover:scale-105 aspect-w-1 aspect-h-1"
          >
            <img
              src={"https://res.cloudinary.com/dzmckbejo/image/upload/" + member.imageUrl}
              alt={`${member.name} profile`}
              className="h-52 w-full object-cover object-end rounded-lg" // Set fixed width/height and object-cover
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
