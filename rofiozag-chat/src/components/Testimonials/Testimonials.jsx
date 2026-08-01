import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../constants';
import { Star, Quote, ShieldCheck, Heart } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>Loved by Top Digital Leaders</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Hear Why Creators Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">
              Switching to Rofiozag.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real stories from founders, community directors, and digital creators scaling on our platform.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard glowColor="amber" className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-sm leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate flex items-center gap-1">
                      {item.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    </h4>
                    <p className="text-xs text-slate-400 truncate">{item.role}</p>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">{item.metrics}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
