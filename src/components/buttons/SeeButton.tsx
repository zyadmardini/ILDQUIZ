import { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick } from '@/utils/animations';
import styles from './SeeButton.module.css';

export type SeeButtonProps = {
  className?: string;
  property1?: 'Default' | 'Pressed';
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * SeeButton Component
 * 
 * Button for viewing HRCT scans or results
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'Pressed'
 * @param text - Button text (default: "SEE THE HRCT SCAN")
 * @param onClick - Click handler
 * @param disabled - Whether the button is disabled
 */
export default function SeeButton({ 
  className = '', 
  property1 = 'Default',
  text = 'SEE THE HRCT SCAN',
  onClick,
  disabled = false
}: SeeButtonProps) {
  const isPressed = property1 === 'Pressed';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (!prefersReducedMotion && buttonRef.current && !disabled && !isPressed) {
      buttonHover(buttonRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion && buttonRef.current && !disabled && !isPressed) {
      buttonHoverOut(buttonRef.current);
    }
  };

  const handleClick = (_e: React.MouseEvent) => {
    if (!prefersReducedMotion && buttonRef.current && !disabled) {
      buttonClick(buttonRef.current);
    }
    if (onClick && !disabled) {
      onClick();
    }
  };
  
  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${isPressed ? styles.pressed : styles.default} ${disabled ? styles.disabled : ''} ${className}`}
      data-name={`Property 1=${property1}`}
      data-node-id="1:245"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
      disabled={disabled}
    >
      <div className={styles.content}>
        <p>{text}</p>
      </div>
    </button>
  );
}

