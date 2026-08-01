import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INTEGRATIONS } from '../../constants';
import { Bot, Sparkles, Camera, Send, Video, Share2, Database, CreditCard, FileText, Workflow, MessageSquare, Layers, CheckCircle2, Globe } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';

const iconMap = {
  Bot,
  Sparkles,
  Instagram: Camera,
  Send,
  Video,
  Youtube: Video,
  Twitter: Share2,
  Database,
  CreditCard,
  FileText,
  Workflow,
  MessageSquare
};

export function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Models", "Social Networks", "Messaging", "Productivity"];

  const filteredIntegrations = selectedCategory === "All"
    ? INTEGRATIONS
    : INTEGRATIONS.filter(item => item.category === selectedCategory);

  return (
    <section id="integrations" className="py-24 relative z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Universal Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Connect Your Entire <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Tech & Social Stack.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Native integrations with leading AI models, social networks, databases, and payment processors with zero code required.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Integration Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIntegrations.map((item, idx) => {
            const Icon = iconMap[item.icon] || Layers;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <GlassCard glowColor="blue" className="p-5 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} border border-white/10 text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white flex items-center justify-between">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
