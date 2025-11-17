import { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick } from '@/utils/animations';
import styles from './PreviousGrey.module.css';

export type PreviousGreyProps = {
  className?: string;
  property1?: 'Default' | 'Pressed';
  onClick?: () => void;
};

/**
 * PreviousGrey Component
 * 
 * Button for navigating to previous screen
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'Pressed'
 * @param onClick - Click handler
 */
export default function PreviousGrey({ 
  className = '', 
  property1 = 'Default',
  onClick 
}: PreviousGreyProps) {
  const isPressed = property1 === 'Pressed';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (!prefersReducedMotion && buttonRef.current && !isPressed) {
      buttonHover(buttonRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion && buttonRef.current && !isPressed) {
      buttonHoverOut(buttonRef.current);
    }
  };

  const handleClick = (_e: React.MouseEvent) => {
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
      data-node-id="1:267"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <div className={styles.content}>
        <p>PREVIOUS SCREEN</p>
      </div>
    </button>
  );
}

