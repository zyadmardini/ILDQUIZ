import { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick } from '@/utils/animations';
import styles from './ArrowRight.module.css';

export type ArrowRightProps = {
  className?: string;
  property1?: 'Default' | 'pressed';
  onClick?: () => void;
};

/**
 * ArrowRight Component
 * 
 * Right arrow navigation button
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'pressed'
 * @param onClick - Click handler
 */
export default function ArrowRight({ 
  className = '', 
  property1 = 'Default',
  onClick 
}: ArrowRightProps) {
  const isPressed = property1 === 'pressed';
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
      data-node-id="1:219"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <div className={styles.content}>
        <p>&gt;</p>
      </div>
    </button>
  );
}

