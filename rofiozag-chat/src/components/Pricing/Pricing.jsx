import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../../constants';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { GradientButton } from '../Buttons/GradientButton';
import { GlassCard } from '../Cards/GlassCard';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-jakarta tracking-tight">
            Simple, Predictable Plans <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              Built for Scale.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Start for free and upgrade as your audience and community expand.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-slate-900 border border-slate-700 p-1 transition-colors focus:outline-none"
              aria-label="Toggle Annual Billing"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 rounded-full bg-blue-500 shadow-md"
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <div
                  className={`relative w-full rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-[#0B0F19] to-blue-950/40 border-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/50'
                      : 'bg-[#0B0F19]/80 border-slate-800/80 shadow-xl'
                  }`}
                >
                  {/* Top Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white font-mono">${price}</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-4 border-t border-slate-800/80">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Includes:</span>
                      <ul className="space-y-2.5 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8 mt-auto">
                    <GradientButton
                      onClick={() => {
                        const element = document.querySelector('#waitlist');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      variant={plan.isPopular ? 'glow' : 'outline'}
                      size="md"
                      className="w-full"
                      icon={ArrowRight}
                    >
                      {plan.ctaText}
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
