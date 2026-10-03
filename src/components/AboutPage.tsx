import React from 'react';
import { motion } from 'motion/react';
import { AboutSection } from './AboutSection';
import { CommerceForgePromise } from './CommerceForgePromise';
import { usePublicTheme } from '../context/PublicThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { assetUrl } from '../utils/imageFallbacks';
import { useCMS } from '../context/CMSContext';

interface AboutPageProps {
  onHireClick?: () => void;
  onRequestRevenueClick?: () => void;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isFounder: boolean;
  specializations: string[];
  bio: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'russell-t',
    name: 'Russell T.',
    role: 'Founder',
    isFounder: true,
    specializations: ['Web Developer', 'E-commerce Operations', 'Photo Video Editor'],
    bio: 'Leads engineering architecture, custom storefront builds, high-converting digital shelves, and photo/video media production.',
    image: assetUrl('images/team/RUSSELL T..jpg'),
  },
  {
    id: 'ryan-b',
    name: 'Ryan B.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads responsive frontend development, merchant inventory synchronization, and sub-second checkout ergonomics.',
    image: assetUrl('images/team/RYAN B.jpg'),
  },
  {
    id: 'nhina-p',
    name: 'Nhina P.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads client component architectures, conversion rate optimization, and automated catalog operations.',
    image: assetUrl('images/team/NHINA P.jpg'),
  },
  {
    id: 'jamez-m',
    name: 'Jamez M.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads backend integrations, API pipelines, scalable storefront hosting, and merchant technical support.',
    image: assetUrl('images/team/JAMEZ M.jpg'),
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onHireClick, onRequestRevenueClick }) => {
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const { activeContent } = useCMS();

  const teamMembers = (activeContent?.teamMembers && activeContent.teamMembers.length > 0)
    ? activeContent.teamMembers.filter((m) => m.visible !== false).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : TEAM_MEMBERS;

  const teamEyebrow = activeContent?.brand?.teamEyebrow || 'CORE DEV TEAM LEADERSHIP';
  const teamHeading = activeContent?.brand?.teamHeading || 'MEET THE TEAM';
  const teamDescription = activeContent?.brand?.teamDescription || 'The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront.';

  return (
    <div className={`w-full transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1E3A2B]'}`}>
      {/* ========================================================================= */}
      {/* 1. ABOUT THE DEV TEAM MISSION & PRODUCTION STANDARDS                      */}
      {/* ========================================================================= */}
      <AboutSection 
        onCtaClick={onHireClick || (() => {})} 
        onRequestRevenueClick={onRequestRevenueClick || onHireClick} 
      />

      {/* ========================================================================= */}
      {/* 2. MEET THE TEAM SECTION (4 Columns with Photo Slots & Roles)             */}
      {/* ========================================================================= */}
      <motion.section 
        id="meet-the-team" 
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t transition-colors duration-300 ${
          isDark ? 'border-white/10' : 'border-[#1E3A2B]/10'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 border transition-colors ${
            isDark ? 'bg-white/5 border-[#B7E84B]/30' : 'bg-[#EAF3E8] border-[#B7E84B]/40'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] ${
              isDark ? 'text-[#B7E84B]' : 'text-[#1E3A2B]'
            }`}>
              {teamEyebrow}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-[#1E3A2B]'
          }`}>
            {teamHeading}
          </h2>

          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-medium ${
            isDark ? 'text-gray-300' : 'text-[#4A584E]'
          }`}>
            {teamDescription}
          </p>
        </div>

        {/* 4 Responsive Columns for Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#121B29] border-white/10 hover:border-[#B7E84B]/60 shadow-lg'
                  : 'bg-white border-[#1E3A2B]/10 hover:border-[#B7E84B] shadow-sm hover:shadow-xl'
              }`}
            >
              <div>
                {/* Photo Frame / Image Slot */}
                <div className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden border flex flex-col items-center justify-center transition-all mb-5 ${
                  isDark
                    ? 'bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 border-white/10 group-hover:border-[#B7E84B]/60'
                    : 'bg-gradient-to-br from-[#EAF3E8] via-[#F4F8F3] to-[#DFEADF] border-[#1E3A2B]/10 group-hover:border-[#B7E84B]/60'
                }`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = assetUrl(`images/team/${member.id}.jpg`);
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Founder / Co-Founder Badge on Photo Frame */}
                  <div className="absolute top-3 right-3 z-10">
                    <span 
                      className={`px-3 py-1 rounded-full text-[9.5px] font-mono font-black uppercase tracking-wider shadow-xs ${
                        member.isFounder
                          ? 'bg-[#1E3A2B] text-[#B7E84B] border border-[#B7E84B]/40'
                          : isDark
                            ? 'bg-white/10 text-white border border-white/15'
                            : 'bg-white/95 text-[#1E3A2B] border border-[#1E3A2B]/10'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Member Identity & Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                      isDark ? 'text-white' : 'text-[#1E3A2B]'
                    }`}>
                      {member.name}
                    </h3>
                  </div>

                  <p className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'
                  }`}>
                    {member.role}
                  </p>

                  {/* Specializations & Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {member.specializations.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                          isDark
                            ? 'bg-white/5 text-gray-200 border-white/10'
                            : 'bg-[#F1F6F0] text-[#1E3A2B] border-[#1E3A2B]/10'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bio snippet */}
                  <p className={`text-xs sm:text-[13px] leading-relaxed pt-3 font-medium ${
                    isDark ? 'text-gray-300' : 'text-[#4A584E]'
                  }`}>
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Status */}
              <div className={`pt-4 mt-5 border-t flex items-center justify-between text-[11px] font-semibold ${
                isDark ? 'border-white/10 text-gray-400' : 'border-[#1E3A2B]/10 text-[#4A584E]'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
                  <span className={isDark ? 'text-white/80' : 'text-[#1E3A2B]'}>Available for Sprints</span>
                </div>
                <span className={`text-[10px] font-mono ${isDark ? 'text-[#B7E84B]/70' : 'text-[#8FA98F]'}`}>
                  CommerceForge
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 3. THE COMMERCEFORGE PROMISE (UNIFIED SECTION)                            */}
      {/* ========================================================================= */}
      <CommerceForgePromise />
    </div>
  );
};
