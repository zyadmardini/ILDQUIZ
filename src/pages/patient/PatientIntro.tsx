import React, { useRef } from 'react';
import { QuizPageLayout, TwoColumnContent } from '@/components/layout';
import { PreviousGrey, SeeButton } from '@/components/buttons';
import { getPatientConfig } from '@/data/patients';
import { useGSAPAnimation, fadeSlideIn, staggerAnimation } from '@/utils/animations';
import sharedStyles from '@/styles/quiz-page-shared.module.css';
import styles from './patient-shared.module.css';

export type PatientIntroProps = {
  patientId: string;
  onNavigateBack?: () => void;
  onClose?: () => void;
  onSeeScan?: () => void;
};

/**
 * PatientIntro Page Component
 * 
 * Generic patient introduction page.
 * Displays patient image and case information.
 * 
 * @param patientId - Patient identifier (e.g., 'stephanie', 'julie')
 * @param onNavigateBack - Back navigation handler
 * @param onClose - Close button handler
 * @param onSeeScan - Handler for "SEE THE HRCT SCAN" button
 */
export default function PatientIntro({
  patientId,
  onNavigateBack,
  onClose,
  onSeeScan,
}: PatientIntroProps) {
  const config = getPatientConfig(patientId);
  const contentRef = useRef<HTMLDivElement>(null);
  
  if (!config) {
    console.error(`Patient config not found for: ${patientId}`);
    return null;
  }

  // Page entrance animations
  const pageRef = useGSAPAnimation((ctx, el) => {
    if (!el) return;

    // Wait for next frame to ensure all refs are ready
    requestAnimationFrame(() => {
      // Double-check element still exists
      if (!el) return;

      // Animate image - find it within the page element
      const imageElement = el.querySelector('img[alt*="patient"]');
      if (imageElement) {
        fadeSlideIn(imageElement, { delay: 0.1, direction: 'right' });
      }

      // Animate text content with stagger
      if (contentRef.current) {
        const paragraphs = Array.from(contentRef.current.querySelectorAll('p'));
        if (paragraphs.length > 0) {
          staggerAnimation(
            paragraphs,
            (p) => fadeSlideIn(p, { direction: 'left' }),
            { stagger: 0.08, delay: 0.2 }
          );
        }
      }
    });
  }, [patientId]);

  const handlePrevious = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const handleSeeScan = () => {
    if (onSeeScan) {
      onSeeScan();
    }
  };

  // Render intro text content
  const renderIntroText = () => {
    const { introText } = config;
    return (
      <div ref={contentRef} className={styles.textContent}>
        <p className={styles.heading}>{introText.heading}</p>
        {introText.paragraphs.map((paragraph, index) => {
          // Check if this is a highlight heading
          if (paragraph.includes('PRESENTS WITH:') || paragraph.includes('NOW PRESENTS WITH:')) {
            return (
              <p key={index} className={styles.highlightHeading}>
                {paragraph}
              </p>
            );
          }
          // Check if this is a caption
          if (paragraph.startsWith('*') || paragraph === 'Not an actual patient') {
            return (
              <p key={index} className={styles.caption}>
                {paragraph}
              </p>
            );
          }
          // Check if this is a bold paragraph
          if (paragraph.includes('A new HRCT scan is performed')) {
            return (
              <p key={index} className={styles.paragraphBold}>
                {paragraph}
              </p>
            );
          }
          // Regular paragraph
          return (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  };

  const footer = (
    <>
      <PreviousGrey
        className={sharedStyles.footerButton}
        onClick={handlePrevious}
      />
      <SeeButton
        className={sharedStyles.footerButton}
        onClick={handleSeeScan}
      />
    </>
  );

  return (
    <QuizPageLayout
      pageRef={pageRef}
      patientId={patientId}
      patientName={config.name}
      currentStep={2}
      totalSteps={4}
      title="TAKE THE QUIZ:"
      onNavigateBack={onNavigateBack}
      onClose={onClose}
      footer={footer}
      aria-label={`${config.name} quiz introduction page`}
    >
      <TwoColumnContent
        imageSrc={config.introImage}
        imageAlt={`${config.name}, a patient with ${config.condition}`}
        content={renderIntroText()}
        imageAspectRatio="833.333 / 775.6"
        imageVariant="patient"
      />
    </QuizPageLayout>
  );
}

