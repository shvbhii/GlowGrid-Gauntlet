
import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header 
      className="text-center p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-shadow-neon-blue">
        GlowGrid Gauntlet
      </h1>
      <p className="text-sm text-neon-pink tracking-wider mt-2">Created by - Shubhi Sharma</p>
    </motion.header>
  );
}

export default Header;