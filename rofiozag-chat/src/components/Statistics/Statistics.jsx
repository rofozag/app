import React from 'react';
import { motion } from 'framer-motion';
import { METRICS } from '../../constants';
import { TrendingUp, Globe2, ShieldCheck, Zap } from 'lucide-react';

export function Statistics() {
  return (
    <section id="stats" className="py-24 relative z-10 bg-[#0B0F19]/80 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Global Scale</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Powering High-Volume <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Conversations Worldwide.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real-time metric updates across our distributed global edge mesh network.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl bg-[#030712] border border-slate-800 shadow-xl space-y-3 group hover:border-emerald-500/50 transition-all"
            >
              <div className="text-4xl sm:text-5xl font-black text-white font-mono flex items-baseline gap-0.5">
                <span>{metric.value}</span>
                <span className="text-emerald-400">{metric.suffix}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-200">{metric.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
