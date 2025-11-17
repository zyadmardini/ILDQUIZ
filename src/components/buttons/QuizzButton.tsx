import React, { useRef } from 'react';
import { useReducedMotion, buttonClick } from '@/utils/animations';
import styles from './QuizzButton.module.css';

export type QuizzButtonProps = {
  className?: string;
  property1?: 'Default' | 'Pressed';
  children?: React.ReactNode;
  onClick?: () => void;
};

/**
 * QuizzButton Component
 * 
 * Primary button for quiz selection
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'Pressed'
 * @param children - Button content (typically patient name)
 * @param onClick - Click handler
 */
export default function QuizzButton({ 
  className = '', 
  property1 = 'Default',
  children,
  onClick 
}: QuizzButtonProps) {
  const isPressed = property1 === 'Pressed';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
      data-node-id="1:202"
      onClick={handleClick}
      type="button"
    >
      <div className={styles.content}>
        {children || (
          <>
            <p className={styles.line1}>TAKE JULIE'S</p>
            <p className={styles.line2}>HRCT QUIZZ</p>
          </>
        )}
      </div>
    </button>
  );
}

