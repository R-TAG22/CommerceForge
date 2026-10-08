import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Share2, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Layers, 
  ArrowUpRight,
  ChevronRight,
  Copy,
  Linkedin,
  Twitter
} from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRouter } from '../admin/router';
import { BLOG_POSTS_DATA, BlogPostItem } from './BlogPage';

interface BlogPostPageProps {
  postId?: string;
  onHireClick?: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId, onHireClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const { currentPath, navigate } = useRouter();
  const [copiedLink, setCopiedLink] = useState(false);

  // Extract ID from props or path (/blog/:slug)
  const resolvedId = postId || currentPath.replace(/^\/blog\//, '').split('/')[0].split('?')[0];
  
  const currentPostIndex = BLOG_POSTS_DATA.findIndex((p) => p.id === resolvedId);
  const post: BlogPostItem | undefined = currentPostIndex !== -1 ? BLOG_POSTS_DATA[currentPostIndex] : undefined;

  const prevPost = currentPostIndex > 0 ? BLOG_POSTS_DATA[currentPostIndex - 1] : undefined;
  const nextPost = currentPostIndex !== -1 && currentPostIndex < BLOG_POSTS_DATA.length - 1 
    ? BLOG_POSTS_DATA[currentPostIndex + 1] 
    : undefined;

  // Filter 3 related articles (excluding the current one)
  const relatedPosts = BLOG_POSTS_DATA
    .filter((p) => p.id !== resolvedId)
    .slice(0, 3);

  const handleCopyShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleShareTwitter = () => {
    if (!post) return;
    const shareText = encodeURIComponent(`${post.title} — via CommerceForge Engineering Journal`);
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    if (!post) return;
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  // If article not found, show graceful 404 state with links to other articles
  if (!post) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F8FAF8] text-[#064E3B] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[#064E3B]" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#047857]">
            ARTICLE NOT FOUND
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-[#064E3B]">
            Story Unavailable
          </h1>
          <p className="mt-3 text-sm text-[#064E3B]/70 font-medium leading-relaxed">
            We couldn’t find an article matching &quot;{resolvedId}&quot;. It may have been moved or updated in our engineering archive.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/blog')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-black uppercase tracking-wider hover:bg-[#047857] transition-all cursor-pointer shadow-sm"
            >
              Browse All Articles
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#064E3B]/20 bg-white text-[#064E3B] text-xs font-bold uppercase tracking-wider hover:bg-[#F3F7F3] transition-all cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full min-h-screen bg-[#F8FAF8] text-[#064E3B]">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION BAR                                    */}
      {/* ========================================================================= */}
      <nav 
        aria-label="Breadcrumbs"
        className="w-full border-b border-[#064E3B]/10 bg-white/70 backdrop-blur-md sticky top-16 z-20 py-3"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#064E3B]/70 overflow-hidden">
            <button
              onClick={() => navigate('/')}
              className="hover:text-[#064E3B] hover:underline shrink-0 cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
            <button
              onClick={() => navigate('/blog')}
              className="hover:text-[#064E3B] hover:underline shrink-0 cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span className="font-semibold text-[#064E3B] truncate max-w-[200px] sm:max-w-[340px]">
              {post.title}
            </span>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Articles</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. ARTICLE HEADER SECTION                                                 */}
      {/* ========================================================================= */}
      <header className="relative w-full pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#064E3B]/10 overflow-hidden">
        {/* Ambient background glow accents */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#B7E84B]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#064E3B]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5 select-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#064E3B] text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-[#B7E84B]" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-[#064E3B]/15 text-[#064E3B]">
              <Clock className="w-3 h-3 text-[#047857]" />
              {post.readTime}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#064E3B]/60 px-1">
              {post.date}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] leading-tight text-[#064E3B]">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#064E3B]/80 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Details & Social Share Toolbar */}
          <div className="mt-8 pt-6 border-t border-[#064E3B]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#064E3B]/20 shadow-xs"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div className="text-sm font-black text-[#064E3B] flex items-center gap-1.5">
                  {post.author.name}
                  <span className="w-2 h-2 rounded-full bg-[#B7E84B]" title="Verified Author" />
                </div>
                <div className="text-xs font-semibold text-[#064E3B]/65">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]/60 hidden sm:inline mr-1">
                Share:
              </span>
              
              <button
                onClick={handleCopyShare}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  copiedLink
                    ? 'bg-[#064E3B] text-white border-[#064E3B]'
                    : 'bg-white border-[#064E3B]/15 text-[#064E3B] hover:bg-[#F3F7F3]'
                }`}
                title="Copy direct article URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#B7E84B]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="p-2 rounded-full bg-white border border-[#064E3B]/15 text-[#064E3B] hover:bg-[#F3F7F3] hover:text-[#047857] transition-colors cursor-pointer"
                title="Share on X (Twitter)"
                aria-label="Share on X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="p-2 rounded-full bg-white border border-[#064E3B]/15 text-[#064E3B] hover:bg-[#F3F7F3] hover:text-[#047857] transition-colors cursor-pointer"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. PERFORMANCE METRICS SCORECARD BANNER                                   */}
      {/* ========================================================================= */}
      {post.metrics && post.metrics.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#064E3B]/20 p-5 sm:p-7 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#064E3B]/10">
            {post.metrics.map((m, idx) => (
              <div key={idx} className={`flex flex-col items-center sm:items-start ${idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#064E3B]/60 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#047857]" />
                  <span>{m.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#064E3B] tracking-tight">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN ARTICLE CONTENT BODY                                              */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Featured Cover Image */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#064E3B]/15 bg-black/5 shadow-md mb-10 sm:mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
            }}
          />
        </div>

        {/* Lead Introduction */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#064E3B]/15 shadow-xs mb-10">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#047857] block mb-2">
            EXECUTIVE SUMMARY
          </span>
          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-[#064E3B]">
            {post.content.intro}
          </p>
        </div>

        {/* Structured Subheadings & Detailed Body */}
        <div className="space-y-10 sm:space-y-12">
          {post.content.subheadings.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#064E3B] flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#B7E84B] inline-block shrink-0" />
                <span>{section.heading}</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#064E3B]/85 leading-relaxed font-normal">
                {section.body}
              </p>

              {/* Bullet Points with Checkmarks */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#064E3B]/10 shadow-xs">
                  <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] mb-3 block">
                    Key Architectural Takeaways:
                  </span>
                  <ul className="space-y-3">
                    {section.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-[#064E3B]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Conclusion / Bottom Line Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#EAF3E8] border-2 border-[#064E3B]/20 text-[#064E3B] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#047857]" />
            <span className="font-black text-xs uppercase tracking-wider text-[#047857]">
              THE BOTTOM LINE
            </span>
          </div>
          <p className="text-base sm:text-lg font-bold leading-relaxed italic text-[#064E3B]">
            &ldquo;{post.content.conclusion}&rdquo;
          </p>
        </div>

        {/* Author Bio Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#064E3B]/15 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#064E3B]/20 shrink-0"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="flex-1">
            <div className="text-base font-black text-[#064E3B]">{post.author.name}</div>
            <div className="text-xs font-semibold text-[#047857] mb-2">{post.author.role} at CommerceForge</div>
            <p className="text-xs sm:text-sm text-[#064E3B]/75 leading-relaxed font-normal">
              Specializing in high-performance React architectures, sub-600ms e-commerce optimization, and conversion engineering for high-growth direct-to-consumer storefronts.
            </p>
          </div>
        </div>

        {/* Previous / Next Article Navigation */}
        <div className="mt-12 pt-8 border-t border-[#064E3B]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              onClick={() => {
                navigate(`/blog/${prevPost.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group p-5 rounded-2xl bg-white border border-[#064E3B]/15 hover:border-[#064E3B]/40 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#047857] mb-1">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous Story</span>
              </div>
              <span className="text-sm font-bold text-[#064E3B] line-clamp-2 group-hover:text-[#047857] transition-colors">
                {prevPost.title}
              </span>
            </button>
          ) : <div />}

          {nextPost && (
            <button
              onClick={() => {
                navigate(`/blog/${nextPost.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group p-5 rounded-2xl bg-white border border-[#064E3B]/15 hover:border-[#064E3B]/40 hover:shadow-md transition-all text-right flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#047857] mb-1">
                <span>Next Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="text-sm font-bold text-[#064E3B] line-clamp-2 group-hover:text-[#047857] transition-colors">
                {nextPost.title}
              </span>
            </button>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. RELATED ARTICLES SECTION                                               */}
      {/* ========================================================================= */}
      <section className="w-full py-12 sm:py-16 bg-white border-t border-[#064E3B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#047857]">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#064E3B]">
                Related Insights & Case Studies
              </h3>
            </div>

            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigate(`/blog/${rel.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col justify-between rounded-2xl border border-[#064E3B]/15 bg-[#F8FAF8] hover:bg-white p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#064E3B]/30 transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black/5">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                      }}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 text-[#B7E84B] backdrop-blur-xs">
                      {rel.category}
                    </span>
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B]/60 mb-1.5">
                    {rel.readTime} • {rel.date}
                  </div>

                  <h4 className="text-sm font-black text-[#064E3B] group-hover:text-[#047857] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  
                  <p className="mt-2 text-xs text-[#064E3B]/70 line-clamp-2 font-medium">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#064E3B]/10 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#064E3B] group-hover:text-[#047857]">
                  <span>Read Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION STRIP                                                   */}
      {/* ========================================================================= */}
      <section className="w-full py-12 sm:py-16 bg-[#064E3B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/10 text-[#B7E84B] mb-4">
            <Sparkles className="w-3 h-3" />
            WORK WITH COMMERCEFORGE
          </span>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Ready to Accelerate Your Storefront?
          </h3>

          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto font-medium">
            We deliver handcrafted sub-600ms page load speeds, guaranteed Core Web Vitals, and measurable conversion lifts.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onHireClick) onHireClick();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#B7E84B] text-[#064E3B] text-xs font-black uppercase tracking-wider hover:bg-[#a6d83a] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              Get A Free Quote
            </button>
            <button
              onClick={() => navigate('/packages')}
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-white/30 bg-transparent text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
            >
              View Packages & Rates
            </button>
          </div>
        </div>
      </section>

    </article>
  );
};
