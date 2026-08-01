import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Copy, Share2, Send, Globe, Sparkles, Trophy } from 'lucide-react';
import { copyToClipboard, formatNumber } from '../../lib/utils';
import toast from 'react-hot-toast';

export function SuccessModal({ isOpen, onClose, data }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(data.referralLink || 'https://rofiozag.chat/waitlist?ref=vip');
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast.error('Failed to copy link');
    }
  };

  const shareText = encodeURIComponent(`I just secured my spot on the @rofiozagchat waitlist (Spot #${formatNumber(data.position)})! Join me to unlock 0% fee creator tools and sub-10ms real-time chat:`);
  const shareUrl = encodeURIComponent(data.referralLink || 'https://rofiozag.chat');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0B0F19] border border-blue-500/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden space-y-6"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white font-jakarta">You're Officially on the VIP List!</h3>
            <p className="text-slate-300 text-sm">Welcome aboard, <strong className="text-white">{data.name || data.email}</strong>!</p>
          </div>

          {/* Reserved Spot Counter Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 text-center space-y-1">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Your Reserved Waitlist Spot</span>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 font-mono">
              #{formatNumber(data.position || 14893)}
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1 pt-1">
              <Sparkles className="w-3.5 h-3.5" /> 0% Monetization Platform Fee Tier Unlocked
            </p>
          </div>

          {/* Referral Link Copy Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Move Up 50 Spots for Every Friend Invited:
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="text"
                readOnly
                value={data.referralLink || 'https://rofiozag.chat/waitlist?ref=vip'}
                className="flex-1 bg-transparent px-3 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition flex items-center gap-1.5 shrink-0"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-slate-400 block text-center">Or share directly to socials:</span>
            <div className="flex justify-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 transition"
                title="Share on X / Twitter"
              >
                <Share2 className="w-5 h-5 text-sky-400" />
              </a>
              <a
                href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 transition"
                title="Share on Telegram"
              >
                <Send className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 transition"
                title="Share on LinkedIn"
              >
                <Globe className="w-5 h-5 text-blue-500" />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
