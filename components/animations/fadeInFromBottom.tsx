// components/FadeInFromBottom.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FadeInFromBottom = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        translateY,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInFromBottom;
