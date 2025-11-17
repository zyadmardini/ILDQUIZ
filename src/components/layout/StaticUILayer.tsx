import React from 'react';
import { PageBackground } from './';
import { Step, CloseGrey } from '../navigation';
import sharedStyles from '@/styles/quiz-page-shared.module.css';

export type StaticUILayerProps = {
  currentStep?: number;
  totalSteps?: number;
  onClose?: () => void;
  showOnPages?: ('patient-selection' | 'quiz-pages' | 'all')[];
};

/**
 * StaticUILayer Component
 * 
 * Provides static UI elements (background, step indicator, close button)
 * that don't transition between pages. These elements remain fixed while
 * only the content transitions.
 * 
 * @param currentStep - Current step number (1-4)
 * @param totalSteps - Total number of steps (typically 4)
 * @param onClose - Close button handler
 * @param showOnPages - Which pages to show this layer on
 */
export default function StaticUILayer({
  currentStep,
  totalSteps = 4,
  onClose,
  showOnPages = ['quiz-pages'],
}: StaticUILayerProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Background Layer - Low z-index */}
      <div className={sharedStyles.staticUIBackground}>
        <PageBackground />
      </div>

      {/* Header Layer - High z-index, separate stacking context */}
      {currentStep !== undefined && (
        <div className={sharedStyles.staticUIHeader}>
          <div className={sharedStyles.headerRight}>
            <Step
              className={sharedStyles.step}
              currentStep={currentStep}
              totalSteps={totalSteps}
              aria-label={`Step ${currentStep} of ${totalSteps}`}
              disableAnimation={true}
            />
            <CloseGrey
              className={sharedStyles.closeButton}
              onClick={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

