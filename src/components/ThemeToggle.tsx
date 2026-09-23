import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePublicTheme } from '../context/PublicThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'floating';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'navbar' }) => {
  const { theme, isDark, toggleTheme } = usePublicTheme();

  if (variant === 'floating') {
    return (
      <button
        type="button"
        id="floating-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B7E84B] ${
          isDark
            ? 'bg-[#0B0F17]/90 text-[#B7E84B] border border-[#B7E84B]/40 shadow-[0_0_20px_rgba(183,232,75,0.25)] hover:border-[#B7E84B]'
            : 'bg-white/95 text-[#064E3B] border border-[#064E3B]/15 shadow-[0_10px_25px_rgba(6,78,59,0.15)] hover:border-[#059669]'
        } ${className}`}
      >
        <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Moon className="w-4 h-4 text-[#B7E84B]" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Sun className="w-4 h-4 text-[#059669]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[11px] font-bold tracking-wider uppercase hidden sm:inline">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      id="navbar-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B7E84B] ${
        isDark
          ? 'bg-white/5 hover:bg-white/10 text-[#B7E84B] border border-[#B7E84B]/30 hover:border-[#B7E84B] shadow-[0_0_12px_rgba(183,232,75,0.2)]'
          : 'bg-[#064E3B]/5 hover:bg-[#064E3B]/10 text-[#064E3B] border border-[#064E3B]/15 hover:border-[#059669]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="nav-moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Moon className="w-4 h-4 text-[#B7E84B]" />
            </motion.div>
          ) : (
            <motion.div
              key="nav-sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Sun className="w-4 h-4 text-[#064E3B]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};
