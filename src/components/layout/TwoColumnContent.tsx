import React from 'react';
import sharedStyles from '@/styles/quiz-page-shared.module.css';
import styles from './TwoColumnContent.module.css';

export type TwoColumnContentProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  content: React.ReactNode;
  contentClassName?: string;
  contentScrollable?: boolean;
  imageAspectRatio?: string;
  imageVariant?: 'patient' | 'scan'; // 'patient' for intro, 'scan' for quiz/results
  overlay?: boolean;
  overlayButton?: React.ReactNode;
};

/**
 * TwoColumnContent Component
 * 
 * Reusable two-column layout pattern: image (left) + content (right).
 * Used across intro, quiz, and results pages.
 * 
 * @param imageSrc - Source path for the left column image
 * @param imageAlt - Alt text for the image
 * @param imageClassName - Additional CSS classes for image container
 * @param content - Right column content (text, quiz options, results, etc.)
 * @param contentClassName - Additional CSS classes for content column
 * @param contentScrollable - Whether content column should be scrollable
 * @param imageAspectRatio - Custom aspect ratio for image (default: 833.333 / 775.6)
 * @param imageVariant - Image type: 'patient' for intro pages, 'scan' for quiz/results
 * @param overlay - Whether to show semi-transparent overlay on image
 * @param overlayButton - Button component to overlay on image (e.g., SeeTheScan)
 */
export default function TwoColumnContent({
  imageSrc,
  imageAlt,
  imageClassName = '',
  content,
  contentClassName = '',
  contentScrollable = false,
  imageAspectRatio,
  imageVariant = 'patient',
  overlay = false,
  overlayButton,
}: TwoColumnContentProps) {
  const imageContainerStyle: React.CSSProperties = imageAspectRatio
    ? { aspectRatio: imageAspectRatio }
    : {};

  return (
    <div className={sharedStyles.mainContent}>
      {/* Left Column - Image */}
      <div className={`${sharedStyles.imageColumn} ${imageClassName}`}>
        <div
          className={sharedStyles.imageContainer}
          style={imageContainerStyle}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`${styles.patientImage} ${imageVariant === 'scan' ? styles.scanImage : ''}`}
            loading="eager"
          />
          {overlay && <div className={styles.overlay} />}
        </div>
        {overlayButton && (
          <div className={styles.overlayButton}>
            {overlayButton}
          </div>
        )}
      </div>

      {/* Right Column - Content */}
      <div
        className={`${sharedStyles.contentColumn} ${
          contentScrollable ? sharedStyles.contentColumnScrollable : ''
        } ${contentClassName}`}
      >
        {content}
      </div>
    </div>
  );
}

