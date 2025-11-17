import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/utils/animations';
import { buttonClick, selectionPulse } from '@/utils/animations';
import styles from './Quizz02Button.module.css';

export type Quizz02ButtonProps = {
  className?: string;
  property1?: 'Default' | 'Pressed';
  label?: string;
  onClick?: () => void;
};

/**
 * Quizz02Button Component
 * 
 * Quiz option button with checkbox-style indicator
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'Pressed'
 * @param label - Button label text
 * @param onClick - Click handler
 */
export default function Quizz02Button({ 
  className = '', 
  property1 = 'Default',
  label = 'Honeycombing',
  onClick 
}: Quizz02ButtonProps) {
  const isPressed = property1 === 'Pressed';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const wasPressedRef = useRef(isPressed);

  // Animate selection change
  React.useEffect(() => {
    if (!prefersReducedMotion && buttonRef.current && isPressed && !wasPressedRef.current) {
      selectionPulse(buttonRef.current);
    }
    wasPressedRef.current = isPressed;
  }, [isPressed, prefersReducedMotion]);

  const handleClick = (e: React.MouseEvent) => {
    if (!prefersReducedMotion && buttonRef.current) {
      buttonClick(buttonRef.current);
    }
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${isPressed ? styles.pressed : styles.default} ${className}`}
      data-name={`Property 1=${property1}`}
      data-node-id="1:224"
      onClick={handleClick}
      type="button"
    >
      <div className={styles.checkbox}>
        {isPressed && <div className={styles.checkmark} />}
      </div>
      <div className={styles.label}>
        <p>{label}</p>
      </div>
    </button>
  );
}

