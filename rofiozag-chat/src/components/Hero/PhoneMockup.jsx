import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Bot, Sparkles, Send, CheckCheck, Mic, ShieldCheck, Heart, Zap, Globe } from 'lucide-react';

export function PhoneMockup() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [aiTyping, setAiTyping] = useState(true);
  const [notification, setNotification] = useState(0);

  // Cycle notifications every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setNotification((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const notifications = [
    { title: "🎉 New VIP Subscription", desc: "Elena unlocked your exclusive audio channel for $14.99/mo", time: "Just now" },
    { title: "⚡ Omnichannel Sync", desc: "Post automatically published to X, Instagram & Telegram", time: "1m ago" },
    { title: "🤖 AI Copilot Active", desc: "Translated community messages to Spanish & Japanese", time: "3m ago" }
  ];

  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Phone Body Container */}
      <div className="relative rounded-[42px] border-[6px] border-slate-800 bg-[#0B0F19] p-3.5 shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)] backdrop-blur-2xl overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Screen Interface */}
        <div className="relative rounded-[32px] bg-[#030712] border border-slate-800/80 overflow-hidden pt-6 pb-4 px-3 space-y-3 font-sans text-xs">
          
          {/* App Bar Header */}
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-[1px]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Elena"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white">Elena Vance</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-[10px] text-slate-400">120K Subscribers • VIP Channel</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px]">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Stories Bar */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-blue-500/60 p-0.5 flex items-center justify-center bg-blue-500/10 text-blue-400">
                <span className="text-sm font-bold">+</span>
              </div>
              <span className="text-[9px] text-slate-400">Your Story</span>
            </div>
            {['Sarah', 'Marcus', 'Alex', 'David'].map((name, idx) => (
              <div key={name} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-amber-500">
                  <img
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80`}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[9px] text-slate-300">{name}</span>
              </div>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="space-y-2.5 pt-1">
            {/* Audio Voice Note Bubble */}
            <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-blue-400 font-medium">
                  <Mic className="w-3 h-3" /> Voice Masterclass Drop
                </span>
                <span>0:42</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                {/* Simulated Audio Waveform */}
                <div className="flex items-center gap-0.5 h-6 flex-1">
                  {[40, 70, 25, 90, 100, 50, 30, 85, 60, 45, 80, 95, 30, 60, 75, 50, 20, 90].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={isPlayingAudio ? { height: [`${h}%`, `${100 - h}%`, `${h}%`] } : { height: `${h}%` }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                      className={`w-1 rounded-full ${isPlayingAudio ? 'bg-blue-400' : 'bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* AI Copilot Card Bubble */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-purple-300 font-medium text-[10px]">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-spin" /> Rofiozag AI Copilot
                </span>
                <span className="text-[9px] text-slate-400">Auto-Generated</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-snug">
                "Summary: Q3 Product Release includes 0% creator fee tier, 10ms real-time audio rooms, and native Instagram crossposting."
              </p>
            </div>

            {/* User Reply Bubble */}
            <div className="flex justify-end">
              <div className="p-2.5 rounded-2xl rounded-tr-xs bg-blue-600 text-white max-w-[80%] space-y-1">
                <p className="text-[11px]">This is insanely fast! Just unlocked the VIP drop 🚀</p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-blue-200">
                  <span>10:18 AM</span>
                  <CheckCheck className="w-3 h-3 text-blue-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Input Mock */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
            <div className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-between text-[11px]">
              <span>Write a message...</span>
              <Bot className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Send className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animated Popup Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={notification}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="absolute -bottom-6 -left-6 -right-6 p-3 rounded-2xl bg-[#0B0F19]/95 border border-blue-500/40 shadow-2xl backdrop-blur-xl flex items-start gap-3 z-30"
        >
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">{notifications[notification].title}</h4>
              <span className="text-[9px] text-slate-400">{notifications[notification].time}</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">{notifications[notification].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
