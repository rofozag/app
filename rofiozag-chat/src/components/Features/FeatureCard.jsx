import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, DollarSign, Share2, Radio, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';

const iconMap = {
  Zap,
  Bot,
  DollarSign,
  Share2,
  Radio,
  ShieldCheck
};

export function FeatureCard({ feature, onClick }) {
  const IconComponent = iconMap[feature.icon] || Zap;

  return (
    <GlassCard
      glowColor="blue"
      onClick={onClick}
      className="flex flex-col justify-between h-full group"
    >
      <div className="space-y-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-semibold text-slate-300 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-colors">
            {feature.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
            <span>{feature.title}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </h3>
          <p className="text-xs font-semibold text-blue-400/90 mt-0.5">{feature.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Metrics Footer */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {feature.metrics}
        </span>
      </div>
    </GlassCard>
  );
}
