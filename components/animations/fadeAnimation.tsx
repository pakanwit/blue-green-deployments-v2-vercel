// components/FadeInDiv.js
import React from 'react';
import { motion } from 'framer-motion';

const FadeAnimation = ({ children, duration = 1 }) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration, // Adjust the duration of the fade-in animation
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      {children}
    </motion.div>
  );
};

export default FadeAnimation;
