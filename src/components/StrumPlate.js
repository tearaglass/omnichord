import React from 'react';
import './StrumPlate.css';

function StrumPlate({ onStrum }) {
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onStrum({ x, y });
  };

  return (
    <div 
      className="strum-plate"
      onMouseMove={handleMouseMove}
    >
      Strum Here
    </div>
  );
}

export default StrumPlate;