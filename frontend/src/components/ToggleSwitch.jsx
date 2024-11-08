import React, { useState } from 'react';

const ToggleSwitch = ({setIsAnonymous}) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
    setIsAnonymous((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        onClick={toggleSwitch}
        className={`w-16  transform transition-all duration-300 ease-in-out flex ${isOn ? 'bg-white' : 'bg-gray-400'
          } rounded-full p-1 cursor-pointer transition-colors duration-300`}
      >
        <div
          className={`${isOn ? 'bg-gray-500' : 'bg-white'} w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-8' : ''
            }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
