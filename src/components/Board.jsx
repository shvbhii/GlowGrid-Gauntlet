
import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4 bg-white/5 rounded-2xl shadow-glow">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;