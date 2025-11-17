import { ReactNode } from 'react';
import { usePageTransition } from '@/utils/animations';
import type { TransitionType, PageTransitionOptions } from '@/utils/animations';
import styles from './PageTransition.module.css';

export type PageTransitionProps = {
  children: ReactNode;
  isVisible: boolean;
  transitionType?: TransitionType;
  options?: PageTransitionOptions;
  className?: string;
};

/**
 * PageTransition Component
 * 
 * Wrapper component for page transitions with GSAP animations
 * Handles enter/exit animations for page changes
 * 
 * @param children - Page content to animate
 * @param isVisible - Whether the page should be visible
 * @param transitionType - Type of transition (fade, slide, scale, etc.)
 * @param options - Additional transition options
 * @param className - Additional CSS classes
 */
export default function PageTransition({
  children,
  isVisible,
  transitionType = 'fade',
  options,
  className = '',
}: PageTransitionProps) {
  const pageRef = usePageTransition(isVisible, transitionType, options);

  return (
    <div
      ref={pageRef}
      className={`${styles.pageTransition} ${className}`}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  );
}

