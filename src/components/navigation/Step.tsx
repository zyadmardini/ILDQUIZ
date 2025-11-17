import React, { useRef } from 'react';
import { useGSAPAnimation, scaleIn } from '@/utils/animations';
import styles from './Step.module.css';
import ellipseIcon from '/icons/svg/ellipse-icon.svg';

export type StepProps = {
  className?: string;
  currentStep?: number;
  totalSteps?: number;
  'aria-label'?: string;
  disableAnimation?: boolean;
};

/**
 * Step Component
 * 
 * Step indicator showing current progress
 * 
 * @param className - Additional CSS classes
 * @param currentStep - Current step number (default: 1)
 * @param totalSteps - Total number of steps (default: 4)
 * @param aria-label - Accessibility label for the step indicator
 */
export default function Step({ 
  className = '', 
  currentStep = 1,
  totalSteps = 4,
  'aria-label': ariaLabel,
  disableAnimation = false
}: StepProps) {
  // Only animate on initial mount, not when step number changes
  // Skip animation if disableAnimation is true (e.g., when in StaticUILayer)
  const hasAnimatedRef = useRef(false);
  const disableAnimationRef = useRef(disableAnimation);
  
  // Update ref when prop changes
  React.useEffect(() => {
    disableAnimationRef.current = disableAnimation;
  }, [disableAnimation]);
  
  const stepRef = useGSAPAnimation((ctx, el) => {
    // Skip if disabled or already animated
    if (!el || hasAnimatedRef.current || disableAnimationRef.current) return;
    hasAnimatedRef.current = true;
    scaleIn(el, { delay: 0.2 });
  }, []); // Empty deps - only animate once on mount

  return (
    <div
      ref={stepRef}
      className={`${styles.step} ${className}`}
      data-name="step"
      data-node-id="6:2095"
      aria-label={ariaLabel}
      role="status"
    >
      <p className={styles.text}>
        <span className={styles.textPrefix}>Step</span>
        <span className={styles.circle}>
          <img src={ellipseIcon} alt="" className={styles.circleImage} />
          <span className={styles.circleNumber}>{currentStep}</span>
        </span>
        <span className={styles.textSuffix}>of {totalSteps}</span>
      </p>
    </div>
  );
}

