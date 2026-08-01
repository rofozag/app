import React from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export function ScrollProgress() {
  const { scrollProgress } = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-800/40 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_10px_#3b82f6]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
