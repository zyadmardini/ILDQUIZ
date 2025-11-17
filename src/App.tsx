import { useState, useRef, useEffect, useMemo } from 'react';
import PatientSelection from './pages/PatientSelection';
import PatientIntro from './pages/patient/PatientIntro';
import PatientQuiz from './pages/patient/PatientQuiz';
import PatientResultsCorrect from './pages/patient/PatientResultsCorrect';
import PatientResultsIncorrect from './pages/patient/PatientResultsIncorrect';
import PatientScanViewer from './pages/patient/PatientScanViewer';
import { PageTransition, StaticUILayer } from './components/layout';
import { getPatientConfig } from './data/patients';
import type { TransitionType } from './utils/animations';
import './App.css';

/**
 * App Component
 * 
 * Main application entry point with navigation state management
 * Uses generic patient components for scalable architecture
 */
type Page = 
  | 'patient-selection'
  | { type: 'intro'; patientId: string }
  | { type: 'quiz'; patientId: string }
  | { type: 'scan-viewer'; patientId: string; variant: 'quiz' | 'results' }
  | { type: 'results'; patientId: string; variant: 'correct' | 'incorrect' };

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('patient-selection');
  const [resultsPageKey, setResultsPageKey] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [_currentPatientId, setCurrentPatientId] = useState<string | null>(null);
  const previousPageRef = useRef<Page | null>(null);

  // Determine transition type based on navigation direction
  const getTransitionType = (): TransitionType => {
    const prev = previousPageRef.current;
    const curr = currentPage;

    // First load - no transition needed
    if (!prev) {
      return 'fade';
    }

    // Determine if moving forward or backward in flow
    const getPageOrder = (page: Page): number => {
      if (page === 'patient-selection') return 0;
      if (typeof page === 'object') {
        if (page.type === 'intro') return 1;
        if (page.type === 'quiz') return 2;
        if (page.type === 'results') return 3;
        if (page.type === 'scan-viewer') {
          // Scan viewer is a modal-like overlay, use fade
          return -1;
        }
      }
      return -1;
    };

    const prevOrder = getPageOrder(prev);
    const currOrder = getPageOrder(curr);

    // Scan viewer always uses fade
    if (currOrder === -1 || prevOrder === -1) {
      return 'fade';
    }

    // Forward navigation
    if (currOrder > prevOrder) {
      return 'slideRight';
    }
    // Backward navigation
    if (currOrder < prevOrder) {
      return 'slideLeft';
    }

    return 'fade';
  };

  // Update previous page ref when current page changes
  useEffect(() => {
    previousPageRef.current = currentPage;
  }, [currentPage]);

  const handlePatientSelect = (patientId: string) => {
    // Navigate to patient intro page
    setCurrentPatientId(patientId);
    setCurrentPage({ type: 'intro', patientId });
    setSelectedOptions([]);
  };

  const handleNavigateBack = () => {
    // Navigate back based on current page
    if (currentPage === 'patient-selection') {
      return;
    }
    
    if (typeof currentPage === 'object') {
      if (currentPage.type === 'intro') {
        setCurrentPage('patient-selection');
        setSelectedOptions([]);
        setCurrentPatientId(null);
      } else if (currentPage.type === 'quiz') {
        setCurrentPage({ type: 'intro', patientId: currentPage.patientId });
        setSelectedOptions([]);
      } else if (currentPage.type === 'scan-viewer') {
        if (currentPage.variant === 'quiz') {
          setCurrentPage({ type: 'quiz', patientId: currentPage.patientId });
        } else {
          setResultsPageKey(prev => prev + 1);
          setCurrentPage({ type: 'results', patientId: currentPage.patientId, variant: 'correct' });
        }
      } else if (currentPage.type === 'results') {
        setCurrentPage({ type: 'quiz', patientId: currentPage.patientId });
        setSelectedOptions([]);
      }
    }
  };

  const handleClose = () => {
    // Close goes back to patient selection
    setCurrentPage('patient-selection');
    setSelectedOptions([]);
    setCurrentPatientId(null);
  };

  // Navigation handlers for patient flow
  const handleIntroSeeScan = (patientId: string) => {
    setCurrentPage({ type: 'quiz', patientId });
  };

  const handleQuizSeeScan = (patientId: string) => {
    setCurrentPage({ type: 'scan-viewer', patientId, variant: 'quiz' });
  };

  const handleQuizSeeResults = (patientId: string, selectedOptions: string[]) => {
    const config = getPatientConfig(patientId);
    if (!config) return;

    // Check if exactly the correct answers are selected (and nothing else)
    const correctAnswers = config.correctAnswers;
    const isCorrect = 
      selectedOptions.length === correctAnswers.length &&
      correctAnswers.every(answer => selectedOptions.includes(answer)) &&
      selectedOptions.every(option => correctAnswers.includes(option));
    
    if (isCorrect) {
      setResultsPageKey(prev => prev + 1);
      setCurrentPage({ type: 'results', patientId, variant: 'correct' });
    } else {
      setResultsPageKey(prev => prev + 1);
      setCurrentPage({ type: 'results', patientId, variant: 'incorrect' });
    }
  };

  const handleScanViewerClose = (patientId: string, variant: 'quiz' | 'results') => {
    if (variant === 'quiz') {
      setCurrentPage({ type: 'quiz', patientId });
    } else {
      setResultsPageKey(prev => prev + 1);
      setCurrentPage({ type: 'results', patientId, variant: 'correct' });
    }
  };

  const handleResultsSeeScan = (patientId: string) => {
    setCurrentPage({ type: 'scan-viewer', patientId, variant: 'results' });
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  // Memoize transition type to prevent recalculation on every render
  // Only recalculate when currentPage changes, not when selectedOptions changes
  const transitionType = useMemo(() => getTransitionType(), [currentPage]);

  // Calculate current step for static UI layer
  const currentStep = useMemo(() => {
    if (currentPage === 'patient-selection') return 1; // Step 1 for patient selection
    if (typeof currentPage === 'object') {
      if (currentPage.type === 'intro') return 2;
      if (currentPage.type === 'quiz') return 3;
      if (currentPage.type === 'results') return 4;
    }
    return undefined;
  }, [currentPage]);

  // Show static UI layer for all pages except scan-viewer
  const showStaticUI = (currentPage === 'patient-selection' || 
     (typeof currentPage === 'object' && 
      (currentPage.type === 'intro' || currentPage.type === 'quiz' || currentPage.type === 'results')));

  return (
    <div className="app">
      {/* Static UI Layer - Background, Step, Close (no transitions) */}
      {/* Always mounted to prevent re-animation, but conditionally shows step/close */}
      <StaticUILayer
        currentStep={showStaticUI ? currentStep : undefined}
        totalSteps={4}
        onClose={handleClose}
      />

      <PageTransition
        isVisible={currentPage === 'patient-selection'}
        transitionType={transitionType}
      >
        <PatientSelection 
          onPatientSelect={handlePatientSelect}
          onClose={handleClose}
        />
      </PageTransition>
      
      <PageTransition
        isVisible={typeof currentPage === 'object' && currentPage.type === 'intro'}
        transitionType={transitionType}
      >
        {typeof currentPage === 'object' && currentPage.type === 'intro' && (
          <PatientIntro
            patientId={currentPage.patientId}
            onNavigateBack={handleNavigateBack}
            onClose={handleClose}
            onSeeScan={() => handleIntroSeeScan(currentPage.patientId)}
          />
        )}
      </PageTransition>
      
      <PageTransition
        isVisible={typeof currentPage === 'object' && currentPage.type === 'quiz'}
        transitionType={transitionType}
      >
        {typeof currentPage === 'object' && currentPage.type === 'quiz' && (
          <PatientQuiz
            patientId={currentPage.patientId}
            onNavigateBack={handleNavigateBack}
            onClose={handleClose}
            onSeeScan={() => handleQuizSeeScan(currentPage.patientId)}
            onSeeResults={(options) => handleQuizSeeResults(currentPage.patientId, options)}
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
          />
        )}
      </PageTransition>
      
      <PageTransition
        isVisible={typeof currentPage === 'object' && currentPage.type === 'scan-viewer'}
        transitionType="fade"
      >
        {typeof currentPage === 'object' && currentPage.type === 'scan-viewer' && (
          <PatientScanViewer
            patientId={currentPage.patientId}
            variant={currentPage.variant}
            onClose={() => handleScanViewerClose(currentPage.patientId, currentPage.variant)}
          />
        )}
      </PageTransition>
      
      <PageTransition
        key={`results-${resultsPageKey}`}
        isVisible={typeof currentPage === 'object' && currentPage.type === 'results'}
        transitionType={transitionType}
      >
        {typeof currentPage === 'object' && currentPage.type === 'results' && (
          <>
            {currentPage.variant === 'correct' && (
              <PatientResultsCorrect
                patientId={currentPage.patientId}
                onNavigateBack={handleNavigateBack}
                onClose={handleClose}
                onSeeScan={() => handleResultsSeeScan(currentPage.patientId)}
              />
            )}
            {currentPage.variant === 'incorrect' && (
              <PatientResultsIncorrect
                patientId={currentPage.patientId}
                onNavigateBack={handleNavigateBack}
                onClose={handleClose}
                onSeeScan={() => handleResultsSeeScan(currentPage.patientId)}
              />
            )}
          </>
        )}
      </PageTransition>
    </div>
  );
}

export default App;

