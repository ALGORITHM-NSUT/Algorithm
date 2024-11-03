// pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen text-white bg-gray-800">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl">Page Not Found</p>
      <a href="/" className="mt-6 text-blue-500">Go back to Home</a>
    </div>
  );
};

export default NotFound;
