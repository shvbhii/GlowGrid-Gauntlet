
import React from 'react';
import { motion } from 'framer-motion';

const Scoreboard = ({ scores }) => {
  return (
    <motion.div 
      className="flex justify-around w-full max-w-md mt-8 p-4 bg-black/30 rounded-lg backdrop-blur-sm shadow-glow"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center">
        <p className="text-3xl font-bold text-neon-blue text-shadow-neon-blue">X</p>
        <p className="text-4xl font-bold">{scores.X}</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-neon-pink text-shadow-neon-pink">O</p>
        <p className="text-4xl font-bold">{scores.O}</p>
      </div>
    </motion.div>
  );
};

export default Scoreboard;