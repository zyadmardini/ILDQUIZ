import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';
import { pageEnter, pageExit, TransitionType, PageTransitionOptions } from '../pageTransitions';

/**
 * usePageTransition Hook
 * 
 * Hook for managing page transition animations
 * 
 * @param isVisible - Whether the page should be visible
 * @param transitionType - Type of transition to use
 * @param options - Additional transition options
 * @returns Ref object to attach to the page element
 */
export function usePageTransition(
  isVisible: boolean,
  transitionType: TransitionType = 'fade',
  options: PageTransitionOptions = {}
): React.RefObject<HTMLDivElement> {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const previousIsVisibleRef = useRef(isVisible);
  const previousTransitionTypeRef = useRef(transitionType);

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      if (elementRef.current) {
        elementRef.current.style.opacity = isVisible ? '1' : '0';
        elementRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      }
      previousIsVisibleRef.current = isVisible;
      previousTransitionTypeRef.current = transitionType;
      return;
    }

    if (!elementRef.current) {
      return;
    }

    // Only animate if visibility actually changed
    // Don't re-animate if only transitionType changed but page is already visible
    const visibilityChanged = previousIsVisibleRef.current !== isVisible;
    
    if (!visibilityChanged && isVisible) {
      // Page is already visible and visibility didn't change
      // Just update refs and return to prevent unnecessary re-animation
      previousIsVisibleRef.current = isVisible;
      previousTransitionTypeRef.current = transitionType;
      return;
    }

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    setIsAnimating(true);

    if (isVisible) {
      // Enter animation - set visibility first, but keep opacity at 0 for animation
      elementRef.current.style.visibility = 'visible';
      elementRef.current.style.pointerEvents = 'auto';
      // Don't set opacity here - let pageEnter handle it from 0
      animationRef.current = pageEnter(elementRef.current, transitionType, options);
      
      if (animationRef.current) {
        animationRef.current.eventCallback('onComplete', () => {
          setIsAnimating(false);
        });
      } else {
        // If animation failed, ensure visibility
        if (elementRef.current) {
          elementRef.current.style.opacity = '1';
        }
        setIsAnimating(false);
      }
    } else {
      // Exit animation
      animationRef.current = pageExit(elementRef.current, transitionType, options);
      
      if (animationRef.current) {
        animationRef.current.eventCallback('onComplete', () => {
          if (elementRef.current) {
            elementRef.current.style.visibility = 'hidden';
            elementRef.current.style.pointerEvents = 'none';
            elementRef.current.style.opacity = '0';
          }
          setIsAnimating(false);
        });
      } else {
        // If animation failed, hide immediately
        if (elementRef.current) {
          elementRef.current.style.visibility = 'hidden';
          elementRef.current.style.opacity = '0';
          elementRef.current.style.pointerEvents = 'none';
        }
        setIsAnimating(false);
      }
    }

    // Update refs
    previousIsVisibleRef.current = isVisible;
    previousTransitionTypeRef.current = transitionType;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
    // Note: options is intentionally excluded from deps to prevent re-animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, transitionType, prefersReducedMotion]);

  return elementRef;
}

/**
 * Hook return type that includes animation state
 */
export interface UsePageTransitionReturn {
  ref: React.RefObject<HTMLDivElement>;
  isAnimating: boolean;
}

/**
 * Enhanced version that returns animation state
 */
export function usePageTransitionWithState(
  isVisible: boolean,
  transitionType: TransitionType = 'fade',
  options: PageTransitionOptions = {}
): UsePageTransitionReturn {
  const ref = usePageTransition(isVisible, transitionType, options);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // This will be managed by the internal hook, but we expose the state
    // For now, we'll use a simple approach
    if (isVisible) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return { ref, isAnimating };
}

