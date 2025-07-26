
import React from 'react';

const Square = ({ value, onClick, isWinning }) => {
  const textStyle = value === 'X' 
    ? 'text-neon-blue text-shadow-neon-blue' 
    : 'text-neon-pink text-shadow-neon-pink';
  
  const winningStyle = isWinning ? 'bg-white/20' : '';

  return (
    <button
      className={`w-24 h-24 md:w-32 md:h-32 m-1 flex items-center justify-center 
                 text-6xl md:text-7xl font-bold bg-black/30 backdrop-blur-sm rounded-lg 
                 hover:bg-white/10 transition-colors duration-300 ${textStyle} ${winningStyle}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;