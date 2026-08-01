import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function GradientButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'glow'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  className = '',
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconPosition = 'right'
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
    xl: "px-8 py-4 text-lg font-semibold gap-3"
  };

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110 border border-blue-400/30",
    secondary: "bg-slate-900/90 text-slate-100 hover:bg-slate-800 border border-slate-700/80 shadow-md backdrop-blur-md hover:border-slate-600",
    outline: "bg-transparent text-slate-200 border border-slate-700/80 hover:border-blue-500/60 hover:text-white hover:bg-blue-500/10",
    glow: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:brightness-110 border border-white/20"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, sizes[size], variants[variant], disabled && "opacity-60 cursor-not-allowed", className)}
    >
      {/* Light sweep effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 text-current transition-transform group-hover:-translate-x-0.5" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 text-current transition-transform group-hover:translate-x-1" />}
        </>
      )}
    </motion.button>
  );
}
