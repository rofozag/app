import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareCode, Menu, X, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '../../constants';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useApp } from '../../context/AppContext';
import { GradientButton } from '../Buttons/GradientButton';

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const { mobileMenuOpen, setMobileMenuOpen } = useApp();

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Rofiozag Chat Homepage"
        >
          <div className="relative p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <MessageSquareCode className="w-5 h-5" />
            <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-sm group-hover:blur-md transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-jakarta">
              Rofiozag<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">Chat</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 group-hover:w-1/2 transition-all rounded-full" />
            </a>
          ))}
        </nav>

        {/* Status Badge & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>{SITE_CONFIG.version}</span>
          </div>

          <GradientButton
            onClick={() => handleNavClick('#waitlist')}
            variant="primary"
            size="sm"
            icon={ChevronRight}
          >
            Join Waitlist
          </GradientButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0F19]/95 border-b border-slate-800 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation</span>
                <span className="text-xs text-blue-400 font-mono">● {SITE_CONFIG.version}</span>
              </div>
              <div className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-4 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/80 hover:text-white font-medium text-sm transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-800">
                <GradientButton
                  onClick={() => handleNavClick('#waitlist')}
                  variant="glow"
                  size="md"
                  className="w-full"
                  icon={ChevronRight}
                >
                  Get Early VIP Access
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
