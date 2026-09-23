import React from 'react';
import { motion, MotionProps } from 'motion/react';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  id?: string;
  tag?: 'section' | 'div' | 'article' | 'aside';
  role?: string;
  'aria-label'?: string;
}

/**
 * AnimatedSection
 * Reusable wrapper that triggers a smooth fade and slide-up entrance animation
 * when the element scrolls into view via Framer Motion / IntersectionObserver (whileInView).
 * Configured with viewport once: true so elements stay rendered smoothly once revealed.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  id,
  tag = 'section',
  role,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const Component = motion[tag] as React.ComponentType<any>;

  return (
    <Component
      id={id}
      role={role}
      aria-label={ariaLabel}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
