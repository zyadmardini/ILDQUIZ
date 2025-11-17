import React, { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick, fadeIn } from '@/utils/animations';
import styles from './CloseGrey.module.css';
import closeIcon from '/icons/svg/close-icon.svg';
import closePressedIcon from '/icons/svg/close-pressed-icon.svg';

export type CloseGreyProps = {
  className?: string;
  property1?: 'Default' | 'pressed';
  onClick?: () => void;
};

/**
 * CloseGrey Component
 * 
 * Close button with icon
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'pressed'
 * @param onClick - Click handler
 */
export default function CloseGrey({ 
  className = '', 
  property1 = 'Default',
  onClick 
}: CloseGreyProps) {
  const isPressed = property1 === 'pressed';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Entrance animation
  React.useEffect(() => {
    if (!prefersReducedMotion && buttonRef.current) {
      fadeIn(buttonRef.current, { delay: 0.3 });
    }
  }, [prefersReducedMotion]);

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
      data-node-id="1:207"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
      aria-label="Close"
    >
      <img 
        src={isPressed ? closePressedIcon : closeIcon} 
        alt="" 
        className={styles.iconImage} 
      />
    </button>
  );
}

