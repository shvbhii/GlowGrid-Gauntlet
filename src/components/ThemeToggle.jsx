// src/components/ThemeToggle.jsx
import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full text-2xl bg-white/10 backdrop-blur-sm
                 text-neon-blue dark:text-neon-pink hover:scale-110 transition-transform duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'light' ? <HiMoon /> : <HiSun />}
    </motion.button>
  );
};

export default ThemeToggle;