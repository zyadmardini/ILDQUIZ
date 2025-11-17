import React from 'react';
import styles from './PageBackground.module.css';
import patientSelectionBg from '@/assets/images/patient-selection-bg.png';

export type PageBackgroundProps = {
  /**
   * The background image source
   * Default: patient-selection-bg.png (used across all pages)
   */
  backgroundImage?: string;
  /**
   * CSS class for additional styling
   */
  className?: string;
};

/**
 * PageBackground Component
 *
 * Reusable background component used across all pages.
 * Provides consistent visual treatment with the decorative background image.
 *
 * Features:
 * - Responsive and fullscreen compatible
 * - Object-fit: cover for optimal image scaling
 * - Positioned absolutely to stay behind content
 * - Z-index: 0 for proper layering
 *
 * @param backgroundImage - Custom background image (optional)
 * @param className - Additional CSS classes
 *
 * @example
 * // Basic usage (with default background)
 * <PageBackground />
 *
 * @example
 * // Custom background image
 * <PageBackground backgroundImage={customImage} />
 *
 * @example
 * // With additional styling
 * <PageBackground className="custom-class" />
 */
export default function PageBackground({
  backgroundImage = patientSelectionBg,
  className = '',
}: PageBackgroundProps) {
  return (
    <div 
      className={`${styles.background} ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <img
        src={backgroundImage}
        alt=""
        className={styles.backgroundImage}
      />
    </div>
  );
}

