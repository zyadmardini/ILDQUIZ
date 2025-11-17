import { useState, useRef } from 'react';
import { QuizPageLayout, TwoColumnContent } from '@/components/layout';
import { PreviousGrey, References } from '@/components/buttons';
import { SeeTheScan } from '@/components';
import { getPatientConfig } from '@/data/patients';
import { useGSAPAnimation, fadeSlideIn, scaleIn, staggerAnimation } from '@/utils/animations';
import sharedStyles from '@/styles/quiz-page-shared.module.css';
import styles from './patient-shared.module.css';

export type PatientResultsIncorrectProps = {
  patientId: string;
  onNavigateBack?: () => void;
  onClose?: () => void;
  onSeeScan?: () => void;
};

/**
 * PatientResultsIncorrect Page Component
 * 
 * Generic incorrect answer results page for any patient.
 * Displays results when user doesn't select all correct answers.
 * 
 * @param patientId - Patient identifier (e.g., 'stephanie', 'julie')
 * @param onNavigateBack - Back navigation handler
 * @param onClose - Close button handler
 * @param onSeeScan - Handler for "SEE THE SCAN" button
 */
export default function PatientResultsIncorrect({
  patientId,
  onNavigateBack,
  onClose,
  onSeeScan,
}: PatientResultsIncorrectProps) {
  const config = getPatientConfig(patientId);
  const [showReferences, setShowReferences] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  if (!config) {
    console.error(`Patient config not found for: ${patientId}`);
    return null;
  }

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

  const handleReferences = () => {
    setShowReferences(!showReferences);
  };

  const { results } = config;
  const resultData = results.incorrect;

  // Page entrance animations
  const pageRef = useGSAPAnimation((_ctx, el) => {
    if (!el) return;

    // Wait for next frame to ensure all refs are ready
    requestAnimationFrame(() => {
      // Double-check element still exists
      if (!el || !resultsRef.current) return;

      // Animate results label with scale
      const label = resultsRef.current.querySelector(`.${styles.resultsLabel}`);
      if (label) {
        scaleIn(label, { delay: 0.1 });
      }

      // Animate paragraphs with stagger - use smaller distance for horizontal to prevent overflow
      const paragraphs = Array.from(resultsRef.current.querySelectorAll('p:not(.resultsLabel)'));
      if (paragraphs.length > 0) {
        staggerAnimation(
          paragraphs,
          (p) => fadeSlideIn(p, { direction: 'left', distance: 10 }), // Reduced distance
          { stagger: 0.08, delay: 0.2 }
        );
      }

      // Animate image - find it within the page element
      const imageElement = el.querySelector('img[alt*="HRCT scan results"]');
      if (imageElement) {
        fadeSlideIn(imageElement, { delay: 0.1, direction: 'right', distance: 10 }); // Reduced distance
      }
    });
  }, [patientId]);

  // Render results content
  const renderResultsContent = () => {
    return (
      <div ref={resultsRef} className={styles.resultsContent}>
        <p className={styles.resultsLabel}>RESULTS</p>
        {resultData.heading.split('\n').map((line, index) => (
          <p key={index} className={styles.resultsHeading}>
            {line}
          </p>
        ))}
        <p className={styles.resultsSpacing}>&nbsp;</p>
        {resultData.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.resultsParagraph}>
            {paragraph}
          </p>
        ))}
        <p className={styles.resultsSpacing}>&nbsp;</p>
        <p className={styles.resultsSpacing}>&nbsp;</p>
        <p className={styles.diagnosisHeading}>{resultData.diagnosis.heading}</p>
        {resultData.diagnosis.text.map((text, index) => (
          <p key={index} className={styles.diagnosisText}>
            {text}
          </p>
        ))}
        <p className={styles.resultsSpacing}>&nbsp;</p>
        <p className={styles.resultsSpacing}>&nbsp;</p>
        <p className={styles.resultsSpacing}>&nbsp;</p>
      </div>
    );
  };

  const footer = (
    <>
      <PreviousGrey
        className={sharedStyles.footerButton}
        onClick={handlePrevious}
      />
      <References
        className={sharedStyles.footerButton}
        property1={showReferences ? 'Pressed' : 'References Grey'}
        onClick={handleReferences}
      />
    </>
  );

  return (
    <>
      <QuizPageLayout
        pageRef={pageRef as React.RefObject<HTMLDivElement>}
        patientId={patientId}
        patientName={config.name}
        currentStep={4}
        totalSteps={4}
        title="TAKE THE QUIZ:"
        onNavigateBack={onNavigateBack}
        onClose={onClose}
        footer={footer}
        aria-label={`${config.name} quiz incorrect results page`}
      >
        <TwoColumnContent
          imageSrc={config.scanImages.results}
          imageAlt={`${config.name}'s HRCT scan results`}
          content={renderResultsContent()}
          contentScrollable={false}
          imageAspectRatio="833.118 / 579.2"
          imageVariant="scan"
          overlay={false}
          overlayButton={
            <SeeTheScan onClick={handleSeeScan} />
          }
        />
      </QuizPageLayout>

      {/* References Modal */}
      {showReferences && config.references && (
        <div className={styles.referencesModal}>
          <div className={styles.referencesContent}>
            {config.references.map((reference, index) => (
              <p key={index} className={styles.referenceText}>
                {reference}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

