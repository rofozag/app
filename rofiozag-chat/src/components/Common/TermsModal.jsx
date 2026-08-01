import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function TermsModal() {
  const { isTermsOpen, activeTermsTab, openLegalModal, closeLegalModal } = useApp();

  if (!isTermsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {activeTermsTab === 'terms' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <h2 className="text-xl font-bold text-white">
                {activeTermsTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
            </div>
            <button
              onClick={closeLegalModal}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800/80 bg-slate-900/30 px-6">
            <button
              onClick={() => openLegalModal('terms')}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition ${
                activeTermsTab === 'terms'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => openLegalModal('privacy')}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition ${
                activeTermsTab === 'privacy'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Privacy & Encryption Policy
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
            {activeTermsTab === 'terms' ? (
              <>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">1. Acceptance of Terms</h3>
                  <p>By accessing or using the Rofiozag Chat platform, waitlist, or associated APIs, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, you represent that you have authority to bind that entity.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">2. Platform Usage & Conduct</h3>
                  <p>Rofiozag Chat provides real-time messaging, creator monetization tools, AI assistance, and social crossposting. Users agree not to utilize the service for malicious activities, illegal spamming, or unauthorized data scraping.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">3. Creator Revenue & Fees</h3>
                  <p>Early waitlist creators enjoy 0% platform fee on subscriptions and tips during their inaugural 6-month trial period. standard payment processing fees by Stripe still apply.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">4. Service Availability</h3>
                  <p>We strive for 99.999% global uptime. Maintenance windows are communicated in advance via the status dashboard.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">1. End-to-End Zero-Knowledge Architecture</h3>
                  <p>Rofiozag Chat employs post-quantum double ratchet encryption for all 1-on-1 and group communication. Your private keys never leave your client device.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">2. Data Collection & Analytics</h3>
                  <p>We do not track, profile, or sell user message content, voice recordings, or personal social connections to third-party advertisers.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">3. AI Data Processing Guarantee</h3>
                  <p>All AI copilot interactions processed through GPT-4o and Claude 3.5 Sonnet rely on zero-retention Enterprise API endpoints. Your prompts are never used to train global AI models.</p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/80 bg-slate-900/50">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              SOC2 Type II Compliant & Encrypted
            </span>
            <button
              onClick={closeLegalModal}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
