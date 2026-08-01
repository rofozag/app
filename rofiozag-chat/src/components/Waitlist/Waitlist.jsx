import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Shield, Sparkles, Check, Users, Gift } from 'lucide-react';
import { GradientButton } from '../Buttons/GradientButton';
import { useWaitlist } from '../../hooks/useWaitlist';
import { useApp } from '../../context/AppContext';
import { formatNumber } from '../../lib/utils';
import { SuccessModal } from './SuccessModal';

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().default("Creator"),
  referralCode: z.string().optional()
});

export function Waitlist() {
  const [selectedRole, setSelectedRole] = useState("Creator");
  const { waitlistCount } = useApp();
  const { loading, handleWaitlistSubmit, isModalOpen, closeModal, successData } = useWaitlist();

  const roles = [
    { id: "Creator", label: "🎨 Digital Creator" },
    { id: "Community", label: "👥 Community Founder" },
    { id: "Business", label: "💼 Business / Brand" },
    { id: "Developer", label: "💻 Developer / Agency" }
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'Creator',
      referralCode: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await handleWaitlistSubmit({ ...data, role: selectedRole });
    if (res.success) {
      reset();
    }
  };

  return (
    <section id="waitlist" className="py-28 relative z-10 bg-[#0B0F19] overflow-hidden border-t border-slate-800">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>VIP Beta Waitlist Open</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-jakarta tracking-tight">
            Claim Your Spot in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              The Next Messaging Era.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Join <strong className="text-white">{formatNumber(waitlistCount)}</strong> forward-thinking creators and communities reserving early 0% fee access.
          </p>
        </div>

        {/* Waitlist Form Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#030712]/90 border border-slate-800/80 shadow-2xl backdrop-blur-2xl space-y-8">
          
          {/* Role Selection Pills */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              I am joining as a:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r.id);
                    setValue('role', r.id);
                  }}
                  className={`p-3 rounded-2xl text-xs font-semibold transition border text-left flex items-center justify-between ${
                    selectedRole === r.id
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{r.label}</span>
                  {selectedRole === r.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Vance"
                  {...register("name")}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                    errors.name ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@brand.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                    errors.email ? 'border-red-500/80 focus:ring-red-500/20' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Optional Referral Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <span>Referral / Invite Code (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="PRO-2026"
                {...register("referralCode")}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <GradientButton
              type="submit"
              variant="glow"
              size="lg"
              loading={loading}
              className="w-full"
              icon={ArrowRight}
            >
              Get Priority Beta Access
            </GradientButton>
          </form>

          {/* Security & Guarantee Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              100% Zero Spam & Encrypted Privacy
            </span>
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Gift className="w-4 h-4" />
              Includes 6-Month 0% Fee Creator Perk
            </span>
          </div>

        </div>

      </div>

      <SuccessModal isOpen={isModalOpen} onClose={closeModal} data={successData} />
    </section>
  );
}
