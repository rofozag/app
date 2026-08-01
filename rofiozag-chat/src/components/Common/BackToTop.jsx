import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export function BackToTop() {
  const { isScrolled } = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-200 hover:text-white hover:border-blue-500/80 hover:bg-slate-800 shadow-xl backdrop-blur-md transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 text-blue-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
