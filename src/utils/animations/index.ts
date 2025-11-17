/**
 * Animation Utilities Index
 * 
 * Central export point for all animation utilities
 */

// Config
export { ANIMATION_CONFIG } from './animationConfig';
export type { AnimationConfig } from './animationConfig';

// Hooks
export { useReducedMotion } from './hooks/useReducedMotion';
export { useGSAPAnimation, useGSAPAnimationWithRef } from './hooks/useGSAPAnimation';
export { usePageTransition, usePageTransitionWithState } from './hooks/usePageTransition';
export type { UsePageTransitionReturn } from './hooks/usePageTransition';

// Element animations
export {
  fadeIn,
  fadeOut,
  slideInUp,
  slideInRight,
  slideInLeft,
  scaleIn,
  staggerAnimation,
  fadeSlideIn,
} from './elementAnimations';

// Interactive animations
export {
  buttonHover,
  buttonHoverOut,
  buttonClick,
  cardHover,
  cardHoverOut,
  selectionPulse,
} from './interactiveAnimations';

// Page transitions
export {
  pageEnter,
  pageExit,
  directionAwareTransition,
} from './pageTransitions';
export type { TransitionType, PageTransitionOptions } from './pageTransitions';

