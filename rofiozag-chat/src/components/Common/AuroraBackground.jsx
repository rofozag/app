import React from 'react';
import { motion } from 'framer-motion';

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Glow Blob 1 */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-[120px]"
      />

      {/* Aurora Glow Blob 2 */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.85, 1.1, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-500/15 to-transparent blur-[130px]"
      />

      {/* Center Ambient Light */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/10 blur-[150px]" />
    </div>
  );
}
