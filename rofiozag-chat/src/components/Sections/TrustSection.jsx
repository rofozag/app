import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_LOGOS } from '../../constants';

export function TrustSection() {
  return (
    <section className="py-12 border-y border-slate-800/80 bg-slate-950/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
            Backed & Featured by Industry Leaders Worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
          {TRUST_LOGOS.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span className="text-blue-500/60 font-black">/</span>
              <span>{logo.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
