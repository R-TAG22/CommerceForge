import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { AboutSection } from './AboutSection';
import { CommerceForgePromise } from './CommerceForgePromise';
import { usePublicTheme } from '../context/PublicThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Relative imports for bundler resolution ensuring assets bundle directly into build
import russellPhoto from '../assets/team/russell-t.jpg';
import ryanPhoto from '../assets/team/ryan-b.jpg';
import nhinaPhoto from '../assets/team/nhina-p.jpg';
import jamezPhoto from '../assets/team/jamez-m.jpg';

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
  image?: string;
  avatarSrc: string;
  fallbackSvg: string;
  initials: string;
}

// Generate self-contained inline SVG avatars with distinct gradients
const createAvatarSvg = (initials: string, bgFrom: string, bgTo: string, accent: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgFrom}"/>
        <stop offset="100%" stop-color="${bgTo}"/>
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill="url(#bg)"/>
    <circle cx="100" cy="85" r="42" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="2"/>
    <path d="M 45 195 C 45 145, 155 145, 155 195 Z" fill="${accent}" fill-opacity="0.14" stroke="${accent}" stroke-width="2"/>
    <text x="100" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="${accent}" text-anchor="middle" letter-spacing="1.5">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'russell-t',
    name: 'Russell T.',
    role: 'Founder',
    isFounder: true,
    specializations: ['Web Developer', 'E-commerce Operations', 'Photo Video Editor'],
    bio: 'Leads engineering architecture, custom storefront builds, high-converting digital shelves, and photo/video media production.',
    initials: 'RT',
    avatarSrc: russellPhoto,
    fallbackSvg: createAvatarSvg('RT', '#1E3A2B', '#0D1E16', '#B7E84B'),
    image: 'RUSSELL T..jpg',
  },
  {
    id: 'ryan-b',
    name: 'Ryan B.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads responsive frontend development, merchant inventory synchronization, and sub-second checkout ergonomics.',
    initials: 'RB',
    avatarSrc: ryanPhoto,
    fallbackSvg: createAvatarSvg('RB', '#152E22', '#0A1811', '#8FA98F'),
    image: 'RYAN B.jpg',
  },
  {
    id: 'nhina-p',
    name: 'Nhina P.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads client component architectures, conversion rate optimization, and automated catalog operations.',
    initials: 'NP',
    avatarSrc: nhinaPhoto,
    fallbackSvg: createAvatarSvg('NP', '#1B2D3B', '#0E1720', '#B7E84B'),
    image: 'NHINA P.jpg',
  },
  {
    id: 'jamez-m',
    name: 'Jamez M.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads backend integrations, API pipelines, scalable storefront hosting, and merchant technical support.',
    initials: 'JM',
    avatarSrc: jamezPhoto,
    fallbackSvg: createAvatarSvg('JM', '#22232F', '#111218', '#A5C6A2'),
    image: 'JAMEZ M.jpg',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onHireClick, onRequestRevenueClick }) => {
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

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
              CORE DEV TEAM LEADERSHIP
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-[#1E3A2B]'
          }`}>
            MEET THE TEAM
          </h2>

          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-medium ${
            isDark ? 'text-gray-300' : 'text-[#4A584E]'
          }`}>
            The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront.
          </p>
        </div>

        {/* 4 Responsive Columns for Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          {TEAM_MEMBERS.map((member) => (
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
                  {member.avatarSrc && !failedImages[member.id] ? (
                    <img 
                      src={member.avatarSrc} 
                      alt={member.name} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const publicPath = `/images/team/${member.id}.jpg`;
                        if (!target.dataset.triedPublic && !target.src.endsWith(publicPath)) {
                          target.dataset.triedPublic = 'true';
                          target.src = publicPath;
                        } else if (member.fallbackSvg && target.src !== member.fallbackSvg) {
                          target.src = member.fallbackSvg;
                        } else {
                          setFailedImages((prev) => ({ ...prev, [member.id]: true }));
                        }
                      }}
                      className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500 origin-center" 
                    />
                  ) : member.fallbackSvg ? (
                    <img
                      src={member.fallbackSvg}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      {/* Stylized Monogram Initials Avatar Badge */}
                      <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full text-[#B7E84B] border border-[#B7E84B]/30 flex items-center justify-center text-2xl sm:text-3xl font-black font-mono shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(183,232,75,0.3)] transition-all ${
                        isDark ? 'bg-[#0B0F17]' : 'bg-[#1E3A2B]'
                      }`}>
                        {member.initials}
                      </div>

                      {/* Photo Slot Notice */}
                      <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold border shadow-xs ${
                        isDark
                          ? 'bg-white/10 backdrop-blur-xs text-white/80 border-white/10'
                          : 'bg-white/90 backdrop-blur-xs text-[#4A584E] border-[#1E3A2B]/10'
                      }`}>
                        <Camera className={`w-3 h-3 ${isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'}`} />
                        <span>Photo Slot</span>
                      </div>
                    </div>
                  )}

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
