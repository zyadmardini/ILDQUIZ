import React, { useState, useRef } from 'react';
import { QuizPageLayout, TwoColumnContent } from '@/components/layout';
import { PreviousGrey, Quizz02Button, SeeButton } from '@/components/buttons';
import { SeeTheScan } from '@/components';
import { getPatientConfig } from '@/data/patients';
import { useGSAPAnimation, fadeSlideIn, staggerAnimation } from '@/utils/animations';
import sharedStyles from '@/styles/quiz-page-shared.module.css';
import styles from './patient-shared.module.css';

export type PatientQuizProps = {
  patientId: string;
  onNavigateBack?: () => void;
  onClose?: () => void;
  onSeeScan?: () => void;
  onSeeResults?: (selectedOptions: string[]) => void;
  selectedOptions?: string[];
  onOptionSelect?: (option: string) => void;
};

/**
 * PatientQuiz Page Component
 * 
 * Generic quiz question page for any patient.
 * Displays HRCT scan image and multiple choice options.
 * 
 * @param patientId - Patient identifier (e.g., 'stephanie', 'julie')
 * @param onNavigateBack - Back navigation handler
 * @param onClose - Close button handler
 * @param onSeeScan - Handler for "SEE THE SCAN" button
 * @param onSeeResults - Handler for "SEE THE RESULTS" button
 * @param selectedOptions - Currently selected quiz options
 * @param onOptionSelect - Handler for option selection
 */
export default function PatientQuiz({
  patientId,
  onNavigateBack,
  onClose,
  onSeeScan,
  onSeeResults,
  selectedOptions = [],
  onOptionSelect,
}: PatientQuizProps) {
  const config = getPatientConfig(patientId);
  const [localSelections, setLocalSelections] = useState<string[]>(selectedOptions);
  const questionRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  const handleSeeResults = () => {
    const currentSelections = onOptionSelect ? selectedOptions : localSelections;
    
    // User must select at least one option
    if (currentSelections.length === 0) {
      return;
    }

    if (onSeeResults) {
      onSeeResults(currentSelections);
    }
  };

  const handleOptionClick = (option: string) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    } else {
      // Local state management
      setLocalSelections(prev =>
        prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    }
  };

  const currentSelections = onOptionSelect ? selectedOptions : localSelections;

  // Page entrance animations
  const pageRef = useGSAPAnimation((ctx, el) => {
    if (!el) return;

    // Wait for next frame to ensure all refs are ready
    requestAnimationFrame(() => {
      // Double-check element still exists
      if (!el) return;

      // Animate question text
      if (questionRef.current) {
        fadeSlideIn(questionRef.current, { delay: 0.1, direction: 'down' });
      }

      // Animate options with stagger
      if (optionsRef.current) {
        const buttons = Array.from(optionsRef.current.querySelectorAll('button, [role="button"]'));
        if (buttons.length > 0) {
          staggerAnimation(
            buttons,
            (btn) => fadeSlideIn(btn, { direction: 'left' }),
            { stagger: 0.1, delay: 0.3 }
          );
        }
      }
    });
  }, [patientId]);

  // Render quiz options content
  const renderQuizContent = () => {
    return (
      <div className={styles.questionSection}>
        <div ref={questionRef}>
        <p className={styles.questionHeading}>
          WHAT DOES {config.name}'S
        </p>
        <p className={styles.questionHeading}>
          HRCT SCAN REVEAL?
        </p>
        <p className={styles.questionSpacing}>&nbsp;</p>
        <p className={styles.questionSubheading}>
          PLEASE SELECT THE FEATURES YOU SEE:
        </p>
        </div>

        <div ref={optionsRef} className={styles.optionsList}>
          {config.quizOptions.map((option) => (
            <Quizz02Button
              key={option}
              className={styles.quizOption}
              property1={currentSelections.includes(option) ? 'Pressed' : 'Default'}
              label={option}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
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
        text="SEE THE RESULTS"
        onClick={handleSeeResults}
        disabled={currentSelections.length === 0}
      />
    </>
  );

  return (
    <QuizPageLayout
      pageRef={pageRef}
      patientId={patientId}
      patientName={config.name}
      currentStep={3}
      totalSteps={4}
      title="TAKE THE QUIZ:"
      onNavigateBack={onNavigateBack}
      onClose={onClose}
      footer={footer}
      aria-label={`${config.name} quiz question page`}
    >
      <TwoColumnContent
        imageSrc={config.scanImages.quiz}
        imageAlt={`${config.name}'s HRCT scan`}
        content={renderQuizContent()}
        contentScrollable={true}
        imageAspectRatio="833.118 / 579.2"
        imageVariant="scan"
        overlay={false}
        overlayButton={
          <SeeTheScan onClick={handleSeeScan} />
        }
      />
    </QuizPageLayout>
  );
}

