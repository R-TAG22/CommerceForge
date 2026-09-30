import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, HelpCircle, X, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useRouter } from './router';
import { useAdminTheme } from './context/AdminThemeContext';
import { CommerceForgeLogo } from '../components/CommerceForgeLogo';
import { useToast } from './components/Toast';

export const AdminLogin: React.FC = () => {
  const { login } = useCMS();
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const { theme, isDark, toggleTheme } = useAdminTheme();

  const [email, setEmail] = useState('admin@commerceforge.agency');
  const [password, setPassword] = useState('devteam2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      showToast('success', 'Welcome Back', 'Logged into CommerceForge CMS Dashboard.');
      navigate('/admin');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotLoading(true);
    try {
      // Simulate reset request
      await new Promise((res) => setTimeout(res, 800));
      setForgotSuccess(true);
      showToast('info', 'Password Reset Sent', 'Check your inbox for reset instructions.');
    } catch {
      // handled
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden transition-colors ${
      isDark ? 'bg-[#0A160F]' : 'bg-[#F8FAF9]'
    }`}>
      {/* Top Bar with Theme Switcher and Back to Public Site */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20">
        <button
          onClick={() => navigate('/')}
          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
            isDark ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
          }`}
        >
          <span>← Public Website</span>
        </button>

        {/* Theme Switcher Button */}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:inline ${
            isDark ? 'text-white/60' : 'text-slate-500'
          }`}>
            {isDark ? 'Dark Theme' : 'Light Theme'}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            role="switch"
            aria-checked={!isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-[#B7E84B] border-white/15'
                : 'bg-white hover:bg-slate-100 text-amber-600 border-slate-300 shadow-xs'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-radial from-[#B7E84B]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-radial from-[#1E3A2B]/40 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-12">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white p-2 shadow-xl shadow-black/20 border border-white/20 mb-4">
            <CommerceForgeLogo className="w-full h-full object-contain" />
          </div>
          <h1 className={`text-2xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-[#1E3A2B]'}`}>
            Commerce<span className="text-[#B7E84B]">Forge</span> CMS
          </h1>
          <p className={`text-xs font-semibold tracking-wider uppercase mt-1 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
            Dev Team Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div className={`border rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#12241A] border-[#B7E84B]/25 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        }`}>
          <div className={`flex items-center justify-between pb-5 border-b mb-6 ${
            isDark ? 'border-white/10' : 'border-slate-100'
          }`}>
            <div>
              <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Admin Sign In
              </h2>
              <p className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                Access website content controls
              </p>
            </div>
            <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1.5 ${
              isDark ? 'bg-[#EAF3E8]/10 text-[#B7E84B] border-[#B7E84B]/30' : 'bg-[#EAF3E8] text-[#1E3A2B] border-[#B7E84B]'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A40]" />
              <span>Protected Portal</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-white/80' : 'text-slate-700'
              }`}>
                Admin Email
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-white/40' : 'text-slate-400'
                }`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@commerceforge.agency"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#B7E84B] ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#B7E84B]'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#2D5A40]'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-white/80' : 'text-slate-700'
                }`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(true);
                    setForgotSuccess(false);
                    setForgotEmail(email);
                  }}
                  className={`text-[11px] font-bold hover:underline ${
                    isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'
                  }`}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-white/40' : 'text-slate-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#B7E84B] ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#B7E84B]'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#2D5A40]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-[0.14em] shadow-lg hover:shadow-[0_0_25px_rgba(183,232,75,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In To Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Notice */}
          <div className={`mt-6 pt-5 border-t flex items-start gap-2.5 text-[11px] leading-relaxed ${
            isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-500'
          }`}>
            <HelpCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'}`} />
            <div>
              <span className={`font-semibold ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
                Decoupled Auth Provider:{' '}
              </span>
              In development mode, enter any email and 6+ character password (or click Sign In directly). Connect Firebase Authentication anytime in CMS Settings.
            </div>
          </div>
        </div>

        {/* Back to Public Site Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-white/60 hover:text-white transition-colors uppercase tracking-wider"
          >
            ← Return To Public Website
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#162C20] border border-[#B7E84B]/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-base">Reset Admin Password</h3>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#B7E84B]/20 text-[#B7E84B] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold">Password Reset Dispatched</h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Instructions to reset your admin password have been sent to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="mt-6 px-6 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="mt-4 space-y-4">
                <p className="text-xs text-white/70 leading-relaxed">
                  Enter your registered admin email address and we'll dispatch password recovery instructions.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@commerceforge.agency"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#B7E84B]"
                />
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="px-5 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider disabled:opacity-50"
                  >
                    {isForgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
