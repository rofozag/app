import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Users, Check, Flame } from 'lucide-react';
import { HERO_STATS, SITE_CONFIG } from '../../constants';
import { PhoneMockup } from './PhoneMockup';
import { GradientButton } from '../Buttons/GradientButton';
import { useWaitlist } from '../../hooks/useWaitlist';
import { useApp } from '../../context/AppContext';
import { formatNumber } from '../../lib/utils';
import { SuccessModal } from '../Waitlist/SuccessModal';

export function Hero() {
  const [email, setEmail] = useState('');
  const { waitlistCount } = useApp();
  const { loading, handleWaitlistSubmit, isModalOpen, closeModal, successData } = useWaitlist();

  const onSubmitQuickWaitlist = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    await handleWaitlistSubmit({ email, role: 'Creator' });
    setEmail('');
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Announcement Banner Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs text-slate-200 backdrop-blur-md shadow-lg shadow-blue-500/10 cursor-pointer hover:border-blue-500/60 transition group"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="font-semibold text-blue-400">Announcing Rofiozag AI 2.0</span>
              <span className="text-slate-400 hidden sm:inline">• 10x Faster & Native Crossposting</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            {/* Massive Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] font-jakarta">
                The Next-Gen <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  Messaging Infrastructure
                </span> <br className="hidden sm:inline" />
                for Creators & Brands.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Unifying sub-millisecond real-time chat, native AI automation, paid creator channels, and 1-click social crossposting into one lightning-fast, encrypted platform.
              </p>
            </motion.div>

            {/* Quick Hero Waitlist Input Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 max-w-md mx-auto lg:mx-0"
            >
              <form onSubmit={onSubmitQuickWaitlist} className="relative flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl focus-within:border-blue-500/80 transition-all">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
                <GradientButton
                  type="submit"
                  variant="glow"
                  size="md"
                  loading={loading}
                  className="shrink-0"
                  icon={ArrowRight}
                >
                  Reserve Spot
                </GradientButton>
              </form>

              {/* Waitlist Live Badge Counter */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
                <span>
                  <strong className="text-white font-semibold">{formatNumber(waitlistCount)}</strong> creators joined this week • VIP spot reserved in <strong className="text-blue-400">0% fee tier</strong>
                </span>
              </div>
            </motion.div>

            {/* Key Feature Stats Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Phone Mockup Interactive Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={isModalOpen} onClose={closeModal} data={successData} />
    </section>
  );
}
