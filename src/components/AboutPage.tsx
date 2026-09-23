import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { AboutSection } from './AboutSection';

interface AboutPageProps {
  onHireClick?: () => void;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isFounder: boolean;
  specializations: string[];
  bio: string;
  image?: string;
  initials: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'russell-t',
    name: 'Russell T.',
    role: 'Founder',
    isFounder: true,
    specializations: ['Web Developer', 'E-commerce Operations', 'Photo Video Editor'],
    bio: 'Leads engineering architecture, custom storefront builds, high-converting digital shelves, and photo/video media production.',
    initials: 'RT',
  },
  {
    id: 'ryan-b',
    name: 'Ryan B.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads responsive frontend development, merchant inventory synchronization, and sub-second checkout ergonomics.',
    initials: 'RB',
  },
  {
    id: 'nhina-p',
    name: 'Nhina P.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads client component architectures, conversion rate optimization, and automated catalog operations.',
    initials: 'NP',
  },
  {
    id: 'james-m',
    name: 'James M.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads backend integrations, API pipelines, scalable storefront hosting, and merchant technical support.',
    initials: 'JM',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onHireClick }) => {
  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. ABOUT THE DEV TEAM MISSION & PRODUCTION STANDARDS                      */}
      {/* ========================================================================= */}
      <AboutSection onCtaClick={onHireClick || (() => {})} />

      {/* ========================================================================= */}
      {/* 2. MEET THE TEAM SECTION (4 Columns with Photo Slots & Roles)             */}
      {/* ========================================================================= */}
      <motion.section 
        id="meet-the-team" 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 sm:py-24 border-t border-[#1E3A2B]/10 dark:border-white/10"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] dark:bg-white/5 border border-[#B7E84B]/40 dark:border-white/15 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B] dark:text-[#B7E84B]">
              CORE DEV TEAM LEADERSHIP
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#1E3A2B] dark:text-white">
            MEET THE TEAM
          </h2>

          <p className="mt-4 text-[#4A584E] dark:text-white/70 text-base sm:text-lg leading-relaxed">
            The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront.
          </p>
        </div>

        {/* 4 Responsive Columns for Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-white/[0.03] rounded-3xl border border-[#1E3A2B]/10 dark:border-white/10 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#B7E84B] dark:hover:border-[#B7E84B]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Frame / Image Slot */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EAF3E8] via-[#F4F8F3] to-[#DFEADF] dark:from-white/5 dark:via-white/[0.02] dark:to-white/5 border border-[#1E3A2B]/10 dark:border-white/10 flex flex-col items-center justify-center group-hover:border-[#B7E84B]/60 transition-all mb-5">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      {/* Stylized Monogram Initials Avatar Badge */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#1E3A2B] dark:bg-[#0B0F17] text-[#B7E84B] border border-[#B7E84B]/30 flex items-center justify-center text-2xl sm:text-3xl font-black font-mono shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(183,232,75,0.3)] transition-all">
                        {member.initials}
                      </div>

                      {/* Photo Slot Notice */}
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-xs text-[10px] font-mono font-bold text-[#4A584E] dark:text-white/80 border border-[#1E3A2B]/10 dark:border-white/10 shadow-xs">
                        <Camera className="w-3 h-3 text-[#2D5A40] dark:text-[#B7E84B]" />
                        <span>Photo Slot</span>
                      </div>
                    </div>
                  )}

                  {/* Founder / Co-Founder Badge on Photo Frame */}
                  <div className="absolute top-3 right-3">
                    <span 
                      className={`px-3 py-1 rounded-full text-[9.5px] font-mono font-black uppercase tracking-wider shadow-xs ${
                        member.isFounder
                          ? 'bg-[#1E3A2B] text-[#B7E84B] border border-[#B7E84B]/40'
                          : 'bg-white/95 dark:bg-white/10 text-[#1E3A2B] dark:text-white border border-[#1E3A2B]/10 dark:border-white/15'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Member Identity & Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E3A2B] dark:text-white">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A40] dark:text-[#B7E84B]">
                    {member.role}
                  </p>

                  {/* Specializations & Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {member.specializations.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-[#F1F6F0] dark:bg-white/5 text-[#1E3A2B] dark:text-white/80 text-[11px] font-semibold border border-[#1E3A2B]/8 dark:border-white/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs sm:text-[13px] text-[#4A584E] dark:text-white/70 leading-relaxed pt-3 font-medium">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="pt-4 mt-5 border-t border-[#1E3A2B]/8 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-[#4A584E] dark:text-white/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
                  <span className="text-[#1E3A2B] dark:text-white/80">Available for Sprints</span>
                </div>
                <span className="text-[10px] font-mono text-[#8FA98F]">CommerceForge</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 3. DEV TEAM CRAFT PRINCIPLES                                              */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pb-16 sm:pb-24"
      >
        <div className="bg-[#12241A] dark:bg-[#0E1520] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-white/5 dark:border-white/10">
          <div className="max-w-3xl mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#B7E84B] text-[#0F241A] mb-3 inline-block">
              OUR DEV TEAM ETHOS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              WHY COMMERCEFORGE BUILDS DIFFERENTLY.
            </h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              We reject bulky generic themes and heavy agency retainers. We build custom, lean storefronts optimized for real-world merchant conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">Sub-Second Speed</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Every millisecond shaved off load time directly elevates conversion and reduces bounce rates, especially on mobile shopping traffic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">100% Code Ownership</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                You own your complete repository, domain, and assets with zero proprietary builder lock-in and zero mandatory monthly retainers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">Direct Founder Collaboration</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Work directly with the founders and engineers building your website — no account managers, no communication games, just fast delivery.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
