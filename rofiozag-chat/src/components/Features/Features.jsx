import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from '../../constants';
import { FeatureCard } from './FeatureCard';
import { Sparkles, Layers, Shield, CheckCircle } from 'lucide-react';

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section id="features" className="py-24 relative z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Scale</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Engineered Like No Other <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              Messaging Platform.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Every feature in Rofiozag Chat is crafted from the ground up to solve the fragmentation of modern creator and business workflows.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureCard
                feature={feature}
                onClick={() => setSelectedFeature(feature)}
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Feature Deep Dive Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0B0F19] border border-blue-500/40 rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono">
                  {selectedFeature.badge}
                </span>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{selectedFeature.title}</h3>
                <p className="text-sm font-semibold text-blue-400 mt-1">{selectedFeature.subtitle}</p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedFeature.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Performance Benchmark
                </div>
                <p className="text-slate-400 font-mono">{selectedFeature.metrics}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
