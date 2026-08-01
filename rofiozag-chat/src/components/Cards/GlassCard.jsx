import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'blue', // 'blue', 'purple', 'emerald', 'amber', 'rose'
  onClick = null
}) {
  const glowStyles = {
    blue: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    purple: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    amber: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    rose: 'hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]'
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl bg-[#0B0F19]/80 border border-slate-800/80 backdrop-blur-xl p-6 transition-all duration-300 shadow-xl overflow-hidden group",
        hoverEffect && glowStyles[glowColor],
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Top subtle light accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all" />

      {children}
    </motion.div>
  );
}
