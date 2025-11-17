import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from '@/components';
import { useGSAPAnimation, fadeSlideIn, staggerAnimation } from '@/utils/animations';
import patientStephanieImage from '../assets/images/patient-stephanie.png';
import patientJulieImage from '../assets/images/patient-julie.png';
import patientCarolineImage from '../assets/images/patient-caroline.png';
import patientRobertImage from '../assets/images/patient-robert.png';
import styles from './PatientSelection.module.css';

export type Patient = {
  id: string;
  name: string;
  condition: string;
  description: string;
  image: string;
};

const PATIENTS: Patient[] = [
  {
    id: 'stephanie',
    name: 'STEPHANIE',
    condition: 'SSC-ILD PATIENT',
    description: 'Stephanie is an accountant and single mother in her 40s with SSc-ILD',
    image: patientStephanieImage,
  },
  {
    id: 'julie',
    name: 'JULIE',
    condition: 'RA-ILD PATIENT',
    description: 'Julie is a home health aid and a mother of three in her 50s with RA-ILD',
    image: patientJulieImage,
  },
  {
    id: 'caroline',
    name: 'CAROLINE',
    condition: 'IPF PATIENT',
    description: 'Caroline is a guidance counselor in her 60s with IPF',
    image: patientCarolineImage,
  },
  {
    id: 'robert',
    name: 'ROBERT',
    condition: 'CHP PATIENT',
    description: 'Robert is a banker in his late 60s with CHP',
    image: patientRobertImage,
  },
];

/**
 * PatientSelection Page Component
 * 
 * Main page for selecting a patient to take the quiz.
 * Features:
 * - Responsive carousel with 3 visible patients
 * - Keyboard navigation (arrow keys)
 * - Touch-friendly buttons
 * - Accessibility support (ARIA labels)
 * - Fullscreen responsive layout
 */
export type PatientSelectionProps = {
  onPatientSelect?: (patientId: string) => void;
  onClose?: () => void;
};

export default function PatientSelection({ 
  onPatientSelect
}: PatientSelectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAllPatients, setShowAllPatients] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const patientsGridRef = useRef<HTMLDivElement>(null);
  const patientCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Handle carousel navigation - use CSS transitions, not GSAP
  const handleNavigation = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Remove transition class after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? PATIENTS.length - 1 : currentIndex - 1;
    handleNavigation(newIndex);
  }, [currentIndex, handleNavigation]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === PATIENTS.length - 1 ? 0 : currentIndex + 1;
    handleNavigation(newIndex);
  }, [currentIndex, handleNavigation]);

  // Detect if we should show all patients (responsive breakpoint)
  useEffect(() => {
    const checkShowAllPatients = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        // Show all 4 patients when container is wide enough (approximately 1200px+)
        // Each patient card needs ~280px + gaps, so 4 * 280px + 3 * 15px = ~1165px minimum
        const minWidthForAll = 1200;
        setShowAllPatients(containerWidth >= minWidthForAll);
      }
    };

    // Check on mount and resize
    checkShowAllPatients();
    window.addEventListener('resize', checkShowAllPatients);
    
    // Use ResizeObserver for more accurate detection
    let resizeObserver: ResizeObserver | null = null;
    const currentRef = carouselRef.current;
    if (currentRef && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkShowAllPatients);
      resizeObserver.observe(currentRef);
    }

    return () => {
      window.removeEventListener('resize', checkShowAllPatients);
      if (resizeObserver && currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, []);

  // Page entrance animations - only on initial mount
  const hasAnimatedRef = useRef(false);
  const pageRef = useGSAPAnimation((_ctx, el) => {
    if (!el || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const title = titleRef.current;
    const footer = footerRef.current;
    const grid = patientsGridRef.current;

    if (title) {
      fadeSlideIn(title, { delay: 0, direction: 'down' });
    }
    if (grid) {
      // Only animate cards on initial load, not on carousel navigation
      const cards = Array.from(grid.querySelectorAll(`.${styles.patientCard}`));
      if (cards.length > 0) {
        staggerAnimation(
          cards,
          (card) => fadeSlideIn(card, { direction: 'up' }),
          { stagger: 0.1, delay: 0.2 }
        );
      }
    }
    if (footer) {
      fadeSlideIn(footer, { delay: 0.5, direction: 'up' });
    }
  }, []);

  // Keyboard navigation support (only when in carousel mode)
  useEffect(() => {
    if (showAllPatients) return; // Disable keyboard nav when all patients are visible

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, showAllPatients]);

  const handlePatientSelect = useCallback((patientId: string) => {
    console.log('Selected patient:', patientId);
    
    // Navigate to patient's quiz page - all patients are now supported
    if (onPatientSelect) {
      onPatientSelect(patientId);
    }
  }, [onPatientSelect]);


  // Get visible patients - all 4 when showAllPatients is true, otherwise carousel (3 at a time)
  const getVisiblePatients = () => {
    if (showAllPatients) {
      return PATIENTS; // Show all 4 patients
    } else {
      // Carousel mode: show previous, current, next
      const prevIndex = currentIndex === 0 ? PATIENTS.length - 1 : currentIndex - 1;
      const nextIndex = currentIndex === PATIENTS.length - 1 ? 0 : currentIndex + 1;
      return [PATIENTS[prevIndex], PATIENTS[currentIndex], PATIENTS[nextIndex]];
    }
  };

  const visiblePatients = getVisiblePatients();

  return (
    <div 
      ref={pageRef as React.RefObject<HTMLDivElement>}
      className={`${styles.frame} ${isTransitioning ? styles.transitioning : ''}`}
      data-node-id="6:2074"
      role="main"
      aria-label="Patient selection page"
    >
      {/* Background is now handled by StaticUILayer in App.tsx */}

      {/* Title Section */}
      <div ref={titleRef} className={styles.title}>
        <p>TAKE THE QUIZ: SELECT YOUR PATIENT</p>
      </div>

      {/* Header Section - Step indicator is now in StaticUILayer */}

      {/* Main Carousel Section */}
      <div 
        ref={carouselRef}
        className={`${styles.carouselContainer} ${showAllPatients ? styles.showAllPatients : ''}`}
      >
        {/* Previous Arrow Button - Only show in carousel mode */}
        {!showAllPatients && (
          <div className={`${styles.arrowButtonWrapper} ${styles.arrowLeft}`}>
            <ArrowLeft 
              property1="Default"
              onClick={handlePrevious}
            />
          </div>
        )}

        {/* Patients Grid */}
        <div 
          ref={patientsGridRef}
          className={`${styles.patientsGrid} ${showAllPatients ? styles.patientsGridAll : ''}`}
        >
          {visiblePatients.map((patient, index) => {
            // In carousel mode, center card (index 1) is the current/active one
            // In all-patients mode, all cards are equal
            const isCenterCard = !showAllPatients && index === 1;
            const isCurrentPatient = showAllPatients && PATIENTS[currentIndex].id === patient.id;
            
            return (
              <div 
                key={patient.id}
                ref={(el) => {
                  patientCardsRef.current[index] = el;
                }}
                className={`${styles.patientCard} ${
                  isCenterCard || isCurrentPatient ? styles.patientCardCenter : ''
                }`}
                data-patient-id={patient.id}
              >
                {/* Patient Title */}
                <div className={styles.patientTitle}>
                  <p className={styles.patientName}>MEET {patient.name}</p>
                  <p className={styles.patientCondition}>{patient.condition}</p>
                </div>

                {/* Patient Image */}
                <div className={styles.patientImageContainer}>
                  <img
                    src={patient.image}
                    alt={`${patient.name}, ${patient.condition}`}
                    className={styles.patientImage}
                    loading="lazy"
                  />
                </div>

                {/* Patient Description */}
                <div className={styles.patientDescription}>
                  <p>{patient.description}</p>
                </div>

                {/* Take Quiz Button */}
                <button
                  className={styles.quizButton}
                  onClick={() => handlePatientSelect(patient.id)}
                  aria-label={`Take ${patient.name}'s HRCT quiz`}
                  title={`Start ${patient.name}'s quiz`}
                >
                  <div className={styles.quizButtonContent}>
                    <p>TAKE {patient.name}'S</p>
                    <p>HRCT QUIZ</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Next Arrow Button - Only show in carousel mode */}
        {!showAllPatients && (
          <div className={`${styles.arrowButtonWrapper} ${styles.arrowRight}`}>
            <ArrowRight 
              property1="Default"
              onClick={handleNext}
            />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div ref={footerRef} className={styles.footer}>
        <p>Not actual patients | PC-IME-100991 | August 2019</p>
      </div>
    </div>
  );
}
