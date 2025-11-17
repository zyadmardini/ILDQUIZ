import { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick } from '@/utils/animations';
import styles from './ArrowLeft.module.css';

export type ArrowLeftProps = {
  className?: string;
  property1?: 'Default' | 'pressed';
  onClick?: () => void;
};

/**
 * ArrowLeft Component
 * 
 * Left arrow navigation button
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'Default' | 'pressed'
 * @param onClick - Click handler
 */
export default function ArrowLeft({ 
  className = '', 
  property1 = 'Default',
  onClick 
}: ArrowLeftProps) {
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
      data-node-id="1:214"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <div className={styles.content}>
        <p>&lt;</p>
      </div>
    </button>
  );
}

