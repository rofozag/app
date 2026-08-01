import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_PRESETS } from '../../constants';
import { Bot, Send, Lock, Sparkles, Check, Share2, Globe, Shield, RefreshCw } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(DEMO_PRESETS[0].id);
  const [userMessages, setUserMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  const activePreset = DEMO_PRESETS.find(p => p.id === activeTab) || DEMO_PRESETS[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: "You (Tester)",
      role: "user",
      text: inputText,
      time: "Just now"
    };

    setUserMessages(prev => [...prev, newMsg]);
    const currentInput = inputText;
    setInputText('');

    // Simulate AI Copilot instant reply
    setIsAiReplying(true);
    setTimeout(() => {
      const aiReply = {
        sender: "Rofiozag AI Copilot",
        role: "ai",
        text: `⚡ Simulated AI response to "${currentInput}": Content formatted for instant broadcast to 12 social platforms with zero latency!`,
        time: "Just now",
        badge: "AI Processed in 0.18s"
      };
      setUserMessages(prev => [...prev, aiReply]);
      setIsAiReplying(false);
    }, 1200);
  };

  const handleResetDemo = () => {
    setUserMessages([]);
  };

  return (
    <section id="demo" className="py-24 relative z-10 bg-[#0B0F19]/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Messaging Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Try the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Real-Time Chat Live.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Click across interactive capabilities or type a test message below to experience Rofiozag Chat in action.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActiveTab(preset.id);
                setUserMessages([]);
              }}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all border flex items-center gap-2 ${
                activeTab === preset.id
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Demo Chat Window Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#030712] border border-slate-800 shadow-2xl overflow-hidden font-sans">
          
          {/* Header Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {activePreset.title}
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  ● Sub-10ms Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">{activePreset.subtitle}</p>
            </div>
            <button
              onClick={handleResetDemo}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition text-xs flex items-center gap-1"
              title="Reset Demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-6 space-y-4 min-h-[320px] max-h-[420px] overflow-y-auto">
            {/* Preset Messages */}
            {activePreset.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 px-1">
                  <span className="font-semibold text-slate-300">{msg.sender}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : msg.role === 'ai'
                      ? 'bg-purple-950/40 border border-purple-500/30 text-purple-100 rounded-tl-xs'
                      : msg.role === 'system'
                      ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 w-full'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.isPaywall && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Lock className="w-4 h-4" />
                        <span className="font-bold">Subscriber Lock ({msg.price})</span>
                      </div>
                      <button className="px-3 py-1 rounded-lg bg-amber-500 text-black font-bold text-[11px] hover:bg-amber-400 transition">
                        Unlock Drop
                      </button>
                    </div>
                  )}

                  {msg.badge && (
                    <div className="mt-2 text-[10px] text-purple-300 font-mono flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{msg.badge}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* User Custom Typed Messages */}
            {userMessages.map((msg, index) => (
              <motion.div
                key={`user-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 px-1">
                  <span className="font-semibold text-slate-300">{msg.sender}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-purple-950/40 border border-purple-500/30 text-purple-100 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.badge && (
                    <div className="mt-2 text-[10px] text-purple-300 font-mono flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{msg.badge}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isAiReplying && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-300 text-xs w-fit">
                <Bot className="w-4 h-4 animate-spin text-purple-400" />
                <span>Rofiozag AI is typing response...</span>
              </div>
            )}
          </div>

          {/* Interactive Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a test message (e.g. 'Translate to French and publish to X')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
