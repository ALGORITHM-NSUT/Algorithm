import React, { useEffect } from 'react';
import Register from '../components/Registercard';

const LoginPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return (

    
    <div className="flex flex-col min-h-screen">
      <div className="mt-6 flex-grow justify-center items-center bg-cover min-h-screen">
        <Register />
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
