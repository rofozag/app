import React, { useState } from 'react';
import { MessageSquareCode, Share2, Send, Code2, Video, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../constants';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { openLegalModal } = useApp();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    toast.success('🎉 Subscribed to the Rofiozag Chat engineering blog!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#030712] border-t border-slate-800 text-slate-400 text-xs relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-jakarta">
                Rofiozag<span className="text-blue-400">Chat</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              {SITE_CONFIG.description}
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-sm pt-2">
              <span className="text-xs font-semibold text-slate-300 block">Subscribe to Engineering Updates</span>
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <input
                  type="email"
                  required
                  placeholder="enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features Engine</a></li>
              <li><a href="#demo" className="hover:text-white transition">Interactive Sandbox</a></li>
              <li><a href="#integrations" className="hover:text-white transition">Ecosystem Sync</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Plans & Pricing</a></li>
            </ul>
          </div>

          {/* Resources & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Developers</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://github.com/rofiozag-chat" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub Repo</a></li>
              <li><a href="#faq" className="hover:text-white transition">Documentation FAQ</a></li>
              <li><span className="text-emerald-400 font-mono flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Operational</span></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Privacy</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => openLegalModal('terms')} className="hover:text-white transition text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openLegalModal('privacy')} className="hover:text-white transition text-left">
                  Privacy & Encryption
                </button>
              </li>
              <li><span className="text-slate-500">SOC2 Type II Certified</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} Rofiozag Chat Inc. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" aria-label="Twitter">
              <Share2 className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socials.telegram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" aria-label="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" aria-label="GitHub">
              <Code2 className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition" aria-label="YouTube">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
