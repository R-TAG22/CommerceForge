import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, TrendingUp, Check, ShieldCheck, Cpu } from 'lucide-react';
import { KpiCounter } from './KpiCounter';

interface VolumePricingSliderProps {
  onSelectTier?: (tierName: string, gmv: number) => void;
}

export const VolumePricingSlider: React.FC<VolumePricingSliderProps> = ({ onSelectTier }) => {
  // GMV in thousands of dollars ($50k to $10,000k)
  const [gmvK, setGmvK] = useState<number>(500); // Default $500,000/mo
  const [currentPlatform, setCurrentPlatform] = useState<'shopify' | 'magento' | 'custom'>('shopify');

  const gmv = gmvK * 1000;

  // Platform fee comparison estimates
  const getSavings = () => {
    let feeRate = 0.024; // Legacy platform transaction + app tax fees
    let hostingCost = 1500;

    if (currentPlatform === 'shopify') {
      feeRate = 0.022; // 2.15% + app store subscriptions
      hostingCost = 2000;
    } else if (currentPlatform === 'magento') {
      feeRate = 0.027; // AWS hosting + maintenance retainers
      hostingCost = 4500;
    } else {
      feeRate = 0.025;
      hostingCost = 3000;
    }

    // CommerceForge direct routing cost: ~1.8% + $0 edge infra
    const legacyMonthlyCost = gmv * feeRate + hostingCost;
    const forgeMonthlyCost = gmv * 0.0185 + 250;
    const monthlySavings = Math.max(800, legacyMonthlyCost - forgeMonthlyCost);
    const annualSavings = monthlySavings * 12;

    // Conversion lift from sub-50ms latency (approx 12-24% lift)
    const annualConversionLift = gmv * 12 * 0.145;

    return {
      monthlySavings,
      annualSavings,
      annualConversionLift,
    };
  };

  const { monthlySavings, annualSavings, annualConversionLift } = getSavings();

  // Determine architectural tier recommendation
  const getTier = () => {
    if (gmvK < 200) {
      return {
        name: 'EDGE STARTER',
        setup: '$260 fixed launch',
        spec: 'Single-region edge cache, 100k req/day, sub-100ms latency',
        sla: '99.9% SLA',
      };
    } else if (gmvK <= 1500) {
      return {
        name: 'HIGH-VELOCITY SCALE',
        setup: '$810 fixed launch',
        spec: 'Global multi-POP WASM workers, deterministic locks, sub-50ms P99',
        sla: '99.99% SLA',
      };
    } else {
      return {
        name: 'GLOBAL ENTERPRISE GRID',
        setup: 'Custom deployment',
        spec: 'Dedicated zero-egress edge cluster, PCI Level 1 vault, bespoke failover',
        sla: '99.999% SLA',
      };
    }
  };

  const tier = getTier();

  const presets = [
    { label: '$100K', value: 100 },
    { label: '$500K', value: 500 },
    { label: '$1.5M', value: 1500 },
    { label: '$5M', value: 5000 },
    { label: '$10M', value: 10000 },
  ];

  return (
    <div
      id="volume-pricing-calculator"
      className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0e14] text-zinc-100 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Calculator className="w-4 h-4" />
            <span>Deterministic ROI Calculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Infrastructure & Processing Yield Estimator
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Simulate your merchant savings by transitioning from high-friction monolithic platforms to CommerceForge's sub-50ms edge checkout pipeline.
          </p>
        </div>

        {/* Existing Stack Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/[0.08] shrink-0">
          <button
            type="button"
            onClick={() => setCurrentPlatform('shopify')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              currentPlatform === 'shopify'
                ? 'bg-zinc-800 text-white border border-white/[0.08]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Shopify Plus
          </button>
          <button
            type="button"
            onClick={() => setCurrentPlatform('magento')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              currentPlatform === 'magento'
                ? 'bg-zinc-800 text-white border border-white/[0.08]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Magento/Woo
          </button>
          <button
            type="button"
            onClick={() => setCurrentPlatform('custom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              currentPlatform === 'custom'
                ? 'bg-zinc-800 text-white border border-white/[0.08]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monolith
          </button>
        </div>
      </div>

      {/* Main Grid: Slider + Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
        {/* Left Column: Interactive Slider */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Monthly Gross Merchandise Value (GMV)
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                ${gmvK >= 1000 ? `${(gmvK / 1000).toFixed(1)}M` : `${gmvK}K`}
                <span className="text-xs font-normal text-zinc-500 font-sans ml-1">/ month</span>
              </span>
            </div>

            {/* Slider track */}
            <input
              type="range"
              min={50}
              max={10000}
              step={50}
              value={gmvK}
              onChange={(e) => setGmvK(Number(e.target.value))}
              className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
              aria-label="Monthly GMV slider"
            />

            {/* Quick Presets */}
            <div className="flex items-center justify-between pt-3 text-[11px] font-mono text-zinc-500">
              {presets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setGmvK(p.value)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    gmvK === p.value
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
                      : 'hover:text-zinc-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Architecture Box */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#090b10] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-zinc-200">
                  Recommended Architecture: {tier.name}
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                {tier.setup}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{tier.spec}</p>
            <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500 pt-1 border-t border-white/[0.04]">
              <span>Uptime SLA: {tier.sla}</span>
              <span>•</span>
              <span>Zero Vendor Lock-in</span>
              <span>•</span>
              <span>Full Code Ownership</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Yield & Savings Cards */}
        <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#11141c] p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Est. Monthly Infrastructure & Platform Savings
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400 flex items-baseline gap-1">
                $<KpiCounter value={Math.round(monthlySavings)} durationMs={800} />
                <span className="text-xs text-zinc-400 font-normal font-sans">/ mo</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Saved via zero platform take-rate & edge cache offload
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Est. Annual Conversion Lift (Sub-50ms P99)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white flex items-baseline gap-1">
                +$<KpiCounter value={Math.round(annualConversionLift)} durationMs={1000} />
                <span className="text-xs text-zinc-400 font-normal font-sans">/ yr</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Average +14.5% conversion increase on mobile checkout
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTier?.(tier.name, gmv)}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer"
          >
            <span>Deploy Architecture with {tier.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
