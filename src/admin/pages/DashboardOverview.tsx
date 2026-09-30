import React from 'react';
import {
  Briefcase,
  Layers,
  HelpCircle,
  ImageIcon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  Database,
  ShieldCheck,
  Zap,
  Plus,
  Palette,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../router';

export const DashboardOverview: React.FC = () => {
  const {
    draftContent,
    hasUnpublishedChanges,
    currentUser,
    setPreviewMode,
  } = useCMS();
  const { navigate } = useRouter();

  const stats = [
    {
      label: 'Portfolio Projects',
      value: draftContent.portfolio.length,
      published: draftContent.portfolio.filter((p) => p.published).length,
      icon: Briefcase,
      path: '/admin/portfolio',
      color: '#D4A359',
    },
    {
      label: 'Pricing Packages',
      value: draftContent.packages.packages.length,
      published: draftContent.packages.packages.filter((p) => p.published).length,
      icon: Layers,
      path: '/admin/packages',
      color: '#B7E84B',
    },
    {
      label: 'Frequently Asked Questions',
      value: draftContent.faq.faqs.length,
      published: draftContent.faq.faqs.filter((f) => f.published).length,
      icon: HelpCircle,
      path: '/admin/faq',
      color: '#8FA98F',
    },
    {
      label: '4-Step Process Milestones',
      value: draftContent.process.steps.length,
      published: draftContent.process.steps.filter((s) => s.active).length,
      icon: Zap,
      path: '/admin/process',
      color: '#588157',
    },
  ];

  const quickSections = [
    { title: 'Theme & Brand Styler', desc: 'Design tokens: colors, typography, border-radius & button variants', path: '/admin/theme' },
    { title: 'Dynamic Page Sections', desc: 'Add, reorder, hide & customize custom page sections', path: '/admin/sections' },
    { title: 'Hero Section', desc: 'Main headline, value proposition & primary CTA', path: '/admin/hero' },
    { title: 'Portfolio Projects', desc: '8 client showcase studies, before/after metrics & screenshots', path: '/admin/portfolio' },
    { title: 'Packages & Rates', desc: 'Transparent productized tiers ($159, $260, $810, ₱4,000)', path: '/admin/packages' },
    { title: 'Statistics & Clients', desc: 'Conversion rate metrics & client logo roster', path: '/admin/statistics' },
    { title: 'Why Rebuild / Comparison', desc: 'Old way vs modern rebuild comparison cards', path: '/admin/comparison' },
    { title: 'Brand & Dev Team Standards', desc: 'About CommerceForge, Core Web Vitals score & values', path: '/admin/brand' },
    { title: 'FAQ Accordion', desc: '7 customer questions & transparent answers', path: '/admin/faq' },
    { title: 'Bottom CTA Banner', desc: 'Free quote invitation, guarantees & contact email', path: '/admin/cta' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8]/10 text-[#B7E84B] border border-[#B7E84B]/30 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B] animate-pulse" />
            <span>CommerceForge CMS Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            Welcome back, <span className="text-[#B7E84B]">{currentUser?.name || 'Admin'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1 font-medium">
            Manage your live website content, client case studies, pricing packages, and media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/sections')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider hover:bg-[#a5d83a] transition-all shadow-md active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            aria-label="Add new dynamic section to website"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Section</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              navigate('/');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <Eye className="w-4 h-4 text-[#B7E84B]" />
            <span>Preview Draft</span>
          </button>
        </div>
      </div>

      {/* System Status / Publishing Banner */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          hasUnpublishedChanges
            ? 'bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-black/30 border-amber-500/40'
            : 'bg-gradient-to-r from-[#12241A] to-[#0A160F] border-[#B7E84B]/30'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-xl shrink-0 ${
                hasUnpublishedChanges ? 'bg-amber-500/20 text-amber-300' : 'bg-[#B7E84B]/20 text-[#B7E84B]'
              }`}
            >
              {hasUnpublishedChanges ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {hasUnpublishedChanges ? 'You Have Unpublished Draft Edits' : 'Live Website Is Up-To-Date'}
              </h3>
              <p className="text-xs text-white/60 mt-0.5 max-w-xl">
                {hasUnpublishedChanges
                  ? 'Your draft changes are stored securely in your working repository. Click "Publish" in the top bar whenever you are ready to update the live public site.'
                  : 'All changes made through the CMS have been compiled and published to the live public site.'}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block">Last Synced</span>
            <span className="text-xs font-semibold text-white/80">
              {new Date(draftContent.lastUpdated).toLocaleDateString()} at{' '}
              {new Date(draftContent.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.label}
              onClick={() => navigate(st.path)}
              className="group p-5 rounded-2xl bg-[#12241A] border border-white/10 hover:border-[#B7E84B]/50 transition-all cursor-pointer shadow-sm hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#B7E84B]" />
                </div>
                <span className="text-xs font-bold text-white/40 group-hover:text-white flex items-center gap-1 transition-colors">
                  <span>Edit</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <div className="text-2xl font-black text-white">{st.value}</div>
              <div className="text-xs font-bold text-white/80 mt-0.5">{st.label}</div>
              <div className="text-[11px] text-white/50 mt-1">
                <span className="text-[#B7E84B] font-semibold">{st.published}</span> published live
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Editors Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">Website Section Editors</h2>
          <span className="text-xs text-white/40">Select a section to edit copy, images, and layout settings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickSections.map((sec) => (
            <div
              key={sec.title}
              onClick={() => navigate(sec.path)}
              className="p-4 rounded-2xl bg-[#12241A] border border-white/10 hover:border-[#B7E84B]/50 cursor-pointer transition-all group flex flex-col justify-between hover:bg-[#162C20]"
            >
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#B7E84B] transition-colors">
                  {sec.title}
                </h3>
                <p className="text-[11px] text-white/60 mt-1.5 leading-relaxed">{sec.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-[#B7E84B]">
                <span>Open Editor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database Provider Architecture Info */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-[#B7E84B]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#EAF3E8]/10 text-[#B7E84B]">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Abstract Repository Layer Active</h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#B7E84B] text-[#0F241A]">
                  Mock Provider
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-2xl">
                The CMS is strictly decoupled from storage via clean TypeScript service interfaces. No real Firebase credentials or connections are active. Edits are safely persisted to your local working environment until you connect your own Firebase project.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/settings')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Handoff Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
