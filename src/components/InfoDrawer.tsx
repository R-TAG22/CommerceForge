import React from 'react';
import { NavItem } from '../types';

interface InfoDrawerProps {
  activeNav: NavItem;
  onClose: () => void;
  onHireClick: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({ activeNav, onClose, onHireClick }) => {
  if (activeNav !== 'WORK') return null;

  return (
    <div 
      id="info-overlay-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="info-overlay-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#F8FAF8] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-10px_rgba(30,58,43,0.18)] border border-[#8FA98F]/30 max-h-[85vh] overflow-y-auto text-[#1E3A2B]"
      >
        {/* Close Button */}
        <button
          id="btn-close-info-overlay"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1E3A2B]/5 hover:bg-[#C3D5BE]/40 flex items-center justify-center text-[#1E3A2B] transition-colors"
          aria-label="Close panel"
        >
          ✕
        </button>

        {activeNav === 'ABOUT' && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8FA98F]">
                Agency Overview
              </span>
              <h2 className="text-3xl font-black tracking-tight mt-1">
                <span className="text-[#1E3A2B]">About Commerce</span>
                <span className="text-[#B7E84B]/85">Forge</span>
              </h2>
              <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
                We are a boutique e-commerce engineering and design agency. We partner with ambitious lifestyle, apparel, and direct-to-consumer brands to architect lightning-fast, high-converting digital flagships.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 shadow-brand-card">
                <div className="w-8 h-8 rounded-full bg-[#8FA98F]/20 flex items-center justify-center text-[#1E3A2B] font-bold text-xs mb-2">
                  01
                </div>
                <h4 className="font-extrabold text-sm text-[#1E3A2B]">Design</h4>
                <p className="text-xs text-[#4A584E] mt-1 leading-normal">
                  Tactile 3D visuals, editorial typography, and frictionless mobile layouts that elevate brand perceived value.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 shadow-brand-card">
                <div className="w-8 h-8 rounded-full bg-[#8FA98F]/20 flex items-center justify-center text-[#1E3A2B] font-bold text-xs mb-2">
                  02
                </div>
                <h4 className="font-extrabold text-sm text-[#1E3A2B]">Build</h4>
                <p className="text-xs text-[#4A584E] mt-1 leading-normal">
                  Modern Shopify Liquid & Headless architectures optimized for sub-1s global latency and 100/100 Core Web Vitals.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 shadow-brand-card">
                <div className="w-8 h-8 rounded-full bg-[#8FA98F]/20 flex items-center justify-center text-[#1E3A2B] font-bold text-xs mb-2">
                  03
                </div>
                <h4 className="font-extrabold text-sm text-[#1E3A2B]">Optimize</h4>
                <p className="text-xs text-[#4A584E] mt-1 leading-normal">
                  Continuous conversion rate auditing, multivariate A/B testing, and bespoke cart funnel mechanics.
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-[#1E3A2B] rounded-2xl p-5 text-white flex flex-wrap justify-around items-center gap-4 shadow-brand-pop">
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-[#8FA98F]">+240%</span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">Average GMV Lift</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-[#8FA98F]">&lt;850ms</span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">Avg Page Load Time</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-[#8FA98F]">50+</span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">Global Stores Forged</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  onClose();
                  onHireClick();
                }}
                className="px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#162C20] transition-colors shadow-sm"
              >
                Work With Us →
              </button>
            </div>
          </div>
        )}

        {activeNav === 'WORK' && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8FA98F]">
                Selected Case Studies
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#1E3A2B] mt-1">
                Featured Work
              </h2>
              <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
                A selection of high-growth e-commerce storefronts forged by our dev team.
              </p>
            </div>

            {/* Case Studies */}
            <div className="space-y-3 pt-1">
              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-brand-card">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-[#1E3A2B]">Kinetix Apparel</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8FA98F]/25 text-[#1E3A2B] font-bold">Apparel & Footwear</span>
                  </div>
                  <p className="text-xs text-[#4A584E] mt-1">
                    Interactive 3D product visualizer & instant mobile cart transition.
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-[#8FA98F]/25 sm:pl-4">
                  <span className="text-lg font-black text-[#1E3A2B] block">+185%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#4A584E] font-semibold">Checkout Rate</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-brand-card">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-[#1E3A2B]">Aura Ceramics</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8FA98F]/25 text-[#1E3A2B] font-bold">Homewares & Goods</span>
                  </div>
                  <p className="text-xs text-[#4A584E] mt-1">
                    Custom editorial lifestyle store layout with multi-currency localized checkout.
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-[#8FA98F]/25 sm:pl-4">
                  <span className="text-lg font-black text-[#1E3A2B] block">+310%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#4A584E] font-semibold">Global GMV</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#8FA98F]/25 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-brand-card">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-[#1E3A2B]">Velo Athletics</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8FA98F]/25 text-[#1E3A2B] font-bold">Performance Gear</span>
                  </div>
                  <p className="text-xs text-[#4A584E] mt-1">
                    Complete headless transition cutting bundle size by 78% and page load to 640ms.
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-[#8FA98F]/25 sm:pl-4">
                  <span className="text-lg font-black text-[#1E3A2B] block">-65%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#4A584E] font-semibold">Bounce Rate</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-[#4A584E] font-medium">Ready to scale your store?</span>
              <button
                onClick={() => {
                  onClose();
                  onHireClick();
                }}
                className="px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-transparent hover:border-[#B7E84B] hover:shadow-[0_0_20px_rgba(183,232,75,0.4)] hover:bg-[#162C20] transition-all shadow-sm"
              >
                <span>Start Your Store Build </span>
                <span className="text-[#B7E84B] font-bold">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
