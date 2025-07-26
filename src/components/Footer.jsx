// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer 
      className="app-footer p-4 text-center text-gray-400"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="social-links flex justify-center space-x-6 mb-2">
        <a
          href="https://www.linkedin.com/in/shvbhi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          title="LinkedIn Profile"
          className="text-2xl hover:text-neon-blue transition-colors duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/shvbhii/GlowGrid-Gauntlet.git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          title="GitHub Profile"
          className="text-2xl hover:text-neon-pink transition-colors duration-300"
        >
          <FaGithub />
        </a>
      </div>
      <p className="connect-text text-xs tracking-widest">
        Connect via LinkedIn / View Source on GitHub
      </p>
       <p className="text-sm mt-2 font-bold tracking-wider">
        GlowGrid Gauntlet
      </p>
    </motion.footer>
  );
}

export default React.memo(Footer);