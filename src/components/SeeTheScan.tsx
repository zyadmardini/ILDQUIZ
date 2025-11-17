import React from 'react';
import styles from './SeeTheScan.module.css';
import pictureInPictureIcon from '../assets/images/picture-in-picture-icon.png';

export type SeeTheScanProps = {
  className?: string;
  onClick?: () => void;
};

/**
 * SeeTheScan Component
 * 
 * Button with picture-in-picture icon for viewing scans
 * 
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 */
export default function SeeTheScan({ 
  className = '', 
  onClick 
}: SeeTheScanProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      data-name="See The Scan"
      data-node-id="1:241"
      onClick={onClick}
      type="button"
    >
      <div className={styles.icon}>
        <img 
          src={pictureInPictureIcon} 
          alt="Picture in picture" 
          className={styles.iconImage} 
        />
      </div>
      <div className={styles.text}>
        <p>SEE THE SCAN</p>
      </div>
    </button>
  );
}

