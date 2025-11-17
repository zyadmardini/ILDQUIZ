import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from './animationConfig';

/**
 * Element Animation Utilities
 * 
 * Reusable GSAP animation functions for common element animations
 */

/**
 * Fade in animation
 */
export function fadeIn(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    opacity?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    opacity = ANIMATION_CONFIG.defaults.opacity.to,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity,
      duration,
      delay,
      ease,
    }
  );
}

/**
 * Fade out animation
 */
export function fadeOut(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.in,
  } = options;

  return gsap.to(element, {
    opacity: 0,
    duration,
    delay,
    ease,
  });
}

/**
 * Slide in from bottom
 */
export function slideInUp(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    y?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    y = ANIMATION_CONFIG.defaults.y.from,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
    }
  );
}

/**
 * Slide in from right
 */
export function slideInRight(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    x?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    x = ANIMATION_CONFIG.defaults.x.from,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease,
    }
  );
}

/**
 * Slide in from left
 */
export function slideInLeft(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    x?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    x = -ANIMATION_CONFIG.defaults.x.from,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease,
    }
  );
}

/**
 * Scale in animation
 */
export function scaleIn(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    scale?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    scale = ANIMATION_CONFIG.defaults.scale.from,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, scale },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease,
    }
  );
}

/**
 * Staggered animation for multiple elements
 */
export function staggerAnimation(
  elements: gsap.TweenTarget,
  animationFn: (element: gsap.TweenTarget) => gsap.core.Tween,
  options: {
    stagger?: number;
    delay?: number;
  } = {}
): gsap.core.Timeline {
  const {
    stagger = ANIMATION_CONFIG.stagger.normal,
    delay = 0,
  } = options;

  const tl = gsap.timeline({ delay });
  
  gsap.utils.toArray(elements).forEach((element, index) => {
    tl.add(animationFn(element), index * stagger);
  });

  return tl;
}

/**
 * Combined fade and slide animation
 */
export function fadeSlideIn(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = ANIMATION_CONFIG.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.easing.out,
    direction = 'up',
    distance = ANIMATION_CONFIG.defaults.y.from,
  } = options;

  // Use smaller distance for horizontal animations to prevent overflow
  const horizontalDistance = direction === 'left' || direction === 'right' 
    ? Math.min(distance, 15) // Limit horizontal movement to 15px max
    : distance;

  const fromProps: gsap.TweenVars = { 
    opacity: 0,
    // Use transform instead of x/y to prevent layout shifts
    force3D: true,
  };
  const toProps: gsap.TweenVars = { 
    opacity: 1, 
    duration, 
    delay, 
    ease,
    force3D: true,
  };

  switch (direction) {
    case 'up':
      fromProps.y = distance;
      toProps.y = 0;
      break;
    case 'down':
      fromProps.y = -distance;
      toProps.y = 0;
      break;
    case 'left':
      fromProps.x = horizontalDistance;
      toProps.x = 0;
      break;
    case 'right':
      fromProps.x = -horizontalDistance;
      toProps.x = 0;
      break;
  }

  return gsap.fromTo(element, fromProps, toProps);
}

