import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, minDuration = 1100 }) => {
  const [phase, setPhase] = useState<'drawing' | 'ready' | 'exit'>('drawing');
  const [statusText, setStatusText] = useState('INITIALIZING EDGE GATEWAY...');
  const [pingMs, setPingMs] = useState(18);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStatusText('SYNCHRONIZING DETERMINISTIC INVENTORY LOCKS...');
      setPingMs(12);
    }, 400);

    const t2 = setTimeout(() => {
      setStatusText('EDGE NODES ONLINE (32/32 POPs)');
      setPingMs(4);
      setPhase('ready');
    }, 850);

    const t3 = setTimeout(() => {
      setPhase('exit');
      if (onComplete) onComplete();
    }, minDuration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090a] text-zinc-100 select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading CommerceForge edge platform"
        >
          {/* Subtle background radial ambient glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

          {/* Minimalist Branded Geometric SVG Stroke Animation */}
          <div className="relative flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Hexagon Track */}
              <polygon
                points="32,4 56,18 56,46 32,60 8,46 8,18"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Animated Stroke Hexagon */}
              <polygon
                points="32,4 56,18 56,46 32,60 8,46 8,18"
                stroke="url(#preloaderGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-stroke-draw"
                fill="none"
              />

              {/* Central Anvil/Edge Diamond */}
              <path
                d="M32 20L42 32L32 44L22 32Z"
                stroke="#10B981"
                strokeWidth="1.75"
                fill="rgba(16, 185, 129, 0.12)"
              />

              <defs>
                <linearGradient id="preloaderGradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" />
                  <stop offset="0.5" stopColor="#34D399" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pulsing center ping dot */}
            <span className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>

          {/* Precision Monospace Status readout */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-[#0e1015]/80 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{statusText}</span>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
              <span>LATENCY: {pingMs}ms</span>
              <span className="text-zinc-700">|</span>
              <span>PROTOCOL: HTTP/3 (QUIC)</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
