import React from 'react';
import sharedStyles from '@/styles/quiz-page-shared.module.css';

export type QuizPageLayoutProps = {
  patientId: string;
  patientName: string;
  currentStep: number;
  totalSteps: number;
  title: string;
  onClose?: () => void;
  onNavigateBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  pageRef?: React.Ref<HTMLDivElement>;
};

/**
 * QuizPageLayout Component
 * 
 * Generic base layout for all patient quiz pages.
 * Provides consistent structure: header (Step + Close), title, main content, footer.
 * 
 * @param patientId - Patient identifier (e.g., 'stephanie', 'julie')
 * @param patientName - Patient name for title (e.g., 'STEPHANIE')
 * @param currentStep - Current step number (1-4)
 * @param totalSteps - Total number of steps (typically 4)
 * @param title - Page title text
 * @param onClose - Close button handler
 * @param onNavigateBack - Back navigation handler
 * @param children - Main content area
 * @param footer - Footer content (buttons, etc.)
 */
export default function QuizPageLayout({
  patientId: _patientId,
  patientName,
  currentStep: _currentStep,
  totalSteps: _totalSteps,
  title,
  onClose: _onClose,
  onNavigateBack: _onNavigateBack,
  children,
  footer,
  className = '',
  'aria-label': ariaLabel,
  pageRef,
}: QuizPageLayoutProps) {
  return (
    <div
      ref={pageRef}
      className={`${sharedStyles.pageFrame} ${className}`}
      role="main"
      aria-label={ariaLabel || `${patientName} quiz page`}
    >
      {/* Background, Step, and Close are now in StaticUILayer in App.tsx */}
      
      {/* Title Section */}
      <div className={sharedStyles.title}>
        <p>
          <span className={sharedStyles.titleRegular}>{title}</span>
          <span> MEET {patientName}</span>
        </p>
      </div>

      {/* Main Content Area */}
      {children}

      {/* Footer Section */}
      {footer && (
        <div className={sharedStyles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
}

