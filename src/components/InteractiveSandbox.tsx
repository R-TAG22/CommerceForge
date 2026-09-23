import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Zap,
  Code2,
  Globe2,
  CheckCircle2,
  Copy,
  Check,
  Play,
  RotateCcw,
  ShieldCheck,
  Server,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';

type SandboxTab = 'checkout' | 'api' | 'latency';

interface LatencyNode {
  code: string;
  city: string;
  region: string;
  ping: number;
  status: 'optimal' | 'standard';
  jitter: string;
}

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SandboxTab>('checkout');
  const [copied, setCopied] = useState<boolean>(false);

  // --- Checkout Simulation State ---
  const [quantity, setQuantity] = useState<number>(2);
  const [unitPrice] = useState<number>(149.0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(0);
  const [checkoutLogs, setCheckoutLogs] = useState<
    Array<{ step: string; latency: string; status: 'ok' | 'locked' }>
  >([]);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // --- API Payload State ---
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [autoCapture, setAutoCapture] = useState<boolean>(true);
  const [apiResponseStatus, setApiResponseStatus] = useState<string>('200 OK');
  const [apiExecutionTime, setApiExecutionTime] = useState<number>(28);
  const [isApiSending, setIsApiSending] = useState<boolean>(false);

  // --- Global Latency State ---
  const [nodes, setNodes] = useState<LatencyNode[]>([
    { code: 'IAD', city: 'Northern Virginia', region: 'us-east-1', ping: 14, status: 'optimal', jitter: '±0.4ms' },
    { code: 'SFO', city: 'San Francisco', region: 'us-west-1', ping: 19, status: 'optimal', jitter: '±0.6ms' },
    { code: 'FRA', city: 'Frankfurt', region: 'eu-central-1', ping: 23, status: 'optimal', jitter: '±0.8ms' },
    { code: 'NRT', city: 'Tokyo', region: 'ap-northeast-1', ping: 31, status: 'optimal', jitter: '±1.1ms' },
    { code: 'SIN', city: 'Singapore', region: 'ap-southeast-1', ping: 27, status: 'optimal', jitter: '±0.7ms' },
    { code: 'SYD', city: 'Sydney', region: 'ap-southeast-2', ping: 38, status: 'optimal', jitter: '±1.3ms' },
  ]);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  // Trigger checkout simulation pipeline
  const runCheckoutSimulation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setCheckoutStep(1);
    setCheckoutLogs([]);
    setOrderComplete(false);

    const log1 = { step: 'Deterministic Redis inventory lock acquired (key: inv_lock_core_v2)', latency: '04ms', status: 'locked' as const };
    const log2 = { step: 'Edge WASM tax & compliance lookup verified (NY jurisdiction)', latency: '12ms', status: 'ok' as const };
    const log3 = { step: 'Idempotency key validated • Tokenized vault payload generated', latency: '21ms', status: 'ok' as const };
    const log4 = { step: 'Zero-downtime distributed ledger committed across 3 replicas', latency: '34ms', status: 'ok' as const };
    const log5 = { step: 'Receipt & webhook dispatched • Total roundtrip P99: 39ms', latency: '39ms', status: 'ok' as const };

    setTimeout(() => {
      setCheckoutLogs([log1]);
      setCheckoutStep(2);
    }, 180);

    setTimeout(() => {
      setCheckoutLogs([log1, log2]);
      setCheckoutStep(3);
    }, 380);

    setTimeout(() => {
      setCheckoutLogs([log1, log2, log3]);
      setCheckoutStep(4);
    }, 600);

    setTimeout(() => {
      setCheckoutLogs([log1, log2, log3, log4]);
      setCheckoutStep(5);
    }, 820);

    setTimeout(() => {
      setCheckoutLogs([log1, log2, log3, log4, log5]);
      setCheckoutStep(6);
      setIsProcessing(false);
      setOrderComplete(true);
    }, 1050);
  };

  const resetCheckout = () => {
    setCheckoutLogs([]);
    setCheckoutStep(0);
    setOrderComplete(false);
    setIsProcessing(false);
  };

  // Trigger API execution simulation
  const handleExecuteApi = () => {
    setIsApiSending(true);
    setTimeout(() => {
      setIsApiSending(false);
      setApiExecutionTime(Math.floor(22 + Math.random() * 12));
      setApiResponseStatus('200 OK (Processed)');
    }, 280);
  };

  // Trigger real-time latency ping refresh
  const handlePingRefresh = () => {
    setIsPinging(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          ping: Math.max(10, node.ping + Math.floor(Math.random() * 5 - 2)),
        }))
      );
      setIsPinging(false);
    }, 450);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subtotal = quantity * unitPrice;
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

  const curlCommand = `curl -X POST https://api.commerceforge.dev/v1/orders/checkout \\
  -H "Authorization: Bearer cf_live_9281a8b9e" \\
  -H "Idempotency-Key: ik_${Math.abs(quantity * 9821).toString(16)}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "currency": "${selectedCurrency.toLowerCase()}",
    "items": [{"sku": "SKU-HYPERCORE-901", "quantity": ${quantity}}],
    "auto_capture": ${autoCapture}
  }'`;

  return (
    <div
      id="interactive-sandbox"
      className="w-full rounded-2xl border border-white/[0.08] bg-[#0c0e14] text-zinc-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden"
    >
      {/* Terminal Titlebar & Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#090b10] px-4 py-3 gap-3">
        {/* Left: Window Dots & Identifier */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400 font-medium">
            edge-gateway://cluster-iad1
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            HTTP/3 QUIC
          </span>
        </div>

        {/* Center / Right: Interactive Mode Tabs */}
        <div className="flex items-center gap-1 rounded-lg bg-zinc-900/80 p-0.5 border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setActiveTab('checkout')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'checkout'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Checkout Simulation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'api'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>API Payload (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('latency')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'latency'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Global Routing Latency</span>
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="p-4 sm:p-6 lg:p-7">
        <AnimatePresence mode="wait">
          {/* TAB 1: LIVE CHECKOUT SIMULATION */}
          {activeTab === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column: Interactive Storefront Checkout Card */}
              <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                      Storefront Cart State
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    IDEMPOTENT
                  </span>
                </div>

                {/* Cart Line Item */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-zinc-900/60 border border-white/[0.04]">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      HyperCore Edge Node v2.4
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      SKU-HYPERCORE-901 • Instant Provision
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center rounded border border-white/[0.08] bg-zinc-800">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={isProcessing}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white disabled:opacity-50 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={isProcessing}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white disabled:opacity-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-mono font-semibold text-zinc-200 w-16 text-right">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Subtotal & Line Details */}
                <div className="space-y-1.5 text-xs font-mono pt-1 text-zinc-400 border-t border-white/[0.06]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Edge Tax Engine (WASM 8.875%)</span>
                    <span className="text-zinc-200">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-white/[0.06]">
                    <span>Total Authorized</span>
                    <span className="text-emerald-400 font-mono text-sm">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Execute Button */}
                <div className="pt-2">
                  {!orderComplete ? (
                    <button
                      type="button"
                      onClick={runCheckoutSimulation}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          <span>Executing Deterministic Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Execute Idempotent Checkout</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={resetCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/[0.08]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Simulation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Real-Time Event Pipeline & Latency Trace */}
              <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#090b10] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                      Real-time Execution Trace
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    BENCHMARK: SUB-50MS SLA
                  </span>
                </div>

                {checkoutLogs.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                    <Layers className="w-8 h-8 text-zinc-700 stroke-[1.5]" />
                    <p className="text-xs font-mono">
                      Awaiting checkout trigger...
                    </p>
                    <p className="text-[11px] text-zinc-600 max-w-sm">
                      Click "Execute Idempotent Checkout" to watch deterministic inventory locking and distributed ledger commitment in sub-50ms.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {checkoutLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{log.step}</span>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                          {log.latency}
                        </span>
                      </motion.div>
                    ))}

                    {orderComplete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-emerald-300">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="font-semibold">
                            Deterministic Order Settled: P99 39ms
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400">
                          TX: 0x9f8c...3e12
                        </span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: API PAYLOAD (JSON) */}
          {activeTab === 'api' && (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column: Interactive Parameters */}
              <div className="lg:col-span-5 rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                    Request Parameters
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                    POST /v1/orders/checkout
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Currency ISO
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setSelectedCurrency(curr)}
                          className={`py-1.5 px-3 rounded font-mono text-xs border transition-all cursor-pointer ${
                            selectedCurrency === curr
                              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 font-bold'
                              : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:text-white'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Item Units ({quantity})
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-zinc-900/60 border border-white/[0.04]">
                    <div>
                      <p className="font-mono text-zinc-300">auto_capture</p>
                      <p className="text-[10px] text-zinc-500">Immediate settlement</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoCapture(!autoCapture)}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                        autoCapture ? 'bg-emerald-500' : 'bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          autoCapture ? 'left-5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleExecuteApi}
                  disabled={isApiSending}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-400 active:scale-[0.99] text-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {isApiSending ? (
                    <span>Executing Request...</span>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Send cURL Request</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Live Syntax Highlighted JSON Preview */}
              <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#090b10] p-5 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs font-mono text-zinc-300">Request & Response Payload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                      {apiResponseStatus} ({apiExecutionTime}ms)
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(curlCommand)}
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy cURL Command"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Preformatted code snippet */}
                <pre className="p-3.5 rounded-lg bg-black/60 border border-white/[0.04] text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                  <code>{curlCommand}</code>
                </pre>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>Server: cloudflare-workers / wasm</span>
                  <span>Latency P99: {apiExecutionTime}ms</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: GLOBAL ROUTING LATENCY */}
          {activeTab === 'latency' && (
            <motion.div
              key="latency"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Header stats bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/[0.08] bg-[#0f1118]">
                <div className="flex items-center gap-6 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">ACTIVE EDGE POPS</span>
                    <span className="font-bold text-white text-sm">32 / 32 ONLINE</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">GLOBAL P99 PING</span>
                    <span className="font-bold text-emerald-400 text-sm">24.2ms</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">EDGE CACHE HIT RATE</span>
                    <span className="font-bold text-white text-sm">99.8%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePingRefresh}
                  disabled={isPinging}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 border border-white/[0.08] transition-all cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                  <span>{isPinging ? 'Pinging Nodes...' : 'Retest Global Latencies'}</span>
                </button>
              </div>

              {/* Edge Node Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodes.map((node) => (
                  <div
                    key={node.code}
                    className="p-3.5 rounded-xl border border-white/[0.08] bg-[#090b10] hover:border-emerald-500/40 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                        <span className="font-mono font-bold text-xs text-white">
                          {node.code}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          ({node.region})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        {node.ping}ms
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>{node.city}</span>
                      <span className="font-mono text-[10px] text-zinc-500">{node.jitter} jitter</span>
                    </div>

                    {/* Progress bar visual indicator */}
                    <div className="mt-2.5 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (node.ping / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-white/[0.06] bg-[#090b10] px-4 py-2.5 text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Server className="w-3 h-3 text-emerald-400" />
            <span>Architecture: Edge WASM Workers</span>
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="hidden sm:inline text-zinc-400">TLS 1.3 0-RTT Session Resumption</span>
        </div>
        <div className="text-zinc-400">
          Deterministic SLA: <span className="text-emerald-400 font-semibold">99.999%</span>
        </div>
      </div>
    </div>
  );
};
