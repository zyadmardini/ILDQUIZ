import { useRef } from 'react';
import { useReducedMotion, buttonHover, buttonHoverOut, buttonClick } from '@/utils/animations';
import styles from './References.module.css';
import polygonIcon from '/icons/svg/polygon-icon.svg';

export type ReferencesProps = {
  className?: string;
  property1?: 'References Grey' | 'Pressed';
  onClick?: () => void;
};

/**
 * References Component
 * 
 * Button for showing references
 * 
 * @param className - Additional CSS classes
 * @param property1 - Button state: 'References Grey' | 'Pressed'
 * @param onClick - Click handler
 */
export default function References({ 
  className = '', 
  property1 = 'References Grey',
  onClick 
}: ReferencesProps) {
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
      data-node-id="1:272"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {isPressed ? (
        <div className={styles.iconContainer}>
          <div className={styles.iconRotated}>
            <div className={styles.icon}>
              <img src={polygonIcon} alt="" className={styles.iconImage} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.icon}>
          <img src={polygonIcon} alt="" className={styles.iconImage} />
        </div>
      )}
      <div className={styles.content}>
        <p>REFERENCES</p>
      </div>
    </button>
  );
}

