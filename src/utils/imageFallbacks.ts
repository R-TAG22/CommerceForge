/**
 * Fallback image assets and error handlers for CommerceForge.
 * Ensures zero broken image icons across all responsive viewports and routes.
 */
import type React from 'react';

/**
 * Safely prepends import.meta.env.BASE_URL to any asset path referencing the public directory.
 * Prevents double slashes and preserves external URLs (http/https/data:).
 */
export const assetUrl = (path: string): string => {
  if (!path) return '';
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  if (prefix !== '/' && path.startsWith(prefix)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${prefix}${cleanPath}`;
};

export const getAssetUrl = assetUrl;

export const FALLBACK_STORE_IMAGE = 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';

export const FALLBACK_MOBILE_IMAGE = 
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80';

export const FALLBACK_LOGO = `${import.meta.env.BASE_URL}LOGO.png`;

export const FALLBACK_PLACEHOLDER = `${import.meta.env.BASE_URL}screenshots/placeholder.png`;

export const FALLBACK_PROCESS_IMAGES: Record<string, string> = {
  '01': `${import.meta.env.BASE_URL}assets/process/process-01-audit.jpeg`,
  '02': `${import.meta.env.BASE_URL}assets/process/process-02-mobile-design.jpeg`,
  '03': `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`,
  '04': `${import.meta.env.BASE_URL}assets/process/process-04-qa-launch.jpeg`,
  '1': `${import.meta.env.BASE_URL}assets/process/process-01-audit.jpeg`,
  '2': `${import.meta.env.BASE_URL}assets/process/process-02-mobile-design.jpeg`,
  '3': `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`,
  '4': `${import.meta.env.BASE_URL}assets/process/process-04-qa-launch.jpeg`,
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = FALLBACK_STORE_IMAGE
) => {
  const target = e.currentTarget;
  if (!target.dataset.triedFallback) {
    target.dataset.triedFallback = 'true';
    target.src = fallbackUrl;
  } else if (!target.dataset.triedSecondFallback && fallbackUrl !== FALLBACK_STORE_IMAGE) {
    target.dataset.triedSecondFallback = 'true';
    target.src = FALLBACK_STORE_IMAGE;
  }
};

