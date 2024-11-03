import React from 'react';

const OpacityLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default OpacityLoader;
