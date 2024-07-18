import React from 'react';
import './styles.css'; // Adjust the path according to your setup

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <svg viewBox="25 25 50 50" className="loader-svg">
        <circle cx="50" cy="50" r="20" className="loader-circle"></circle>
      </svg>
    </div>
  );
};

export default Loader;
