import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from './animationConfig';

/**
 * Interactive Animation Utilities
 * 
 * GSAP animations for user interactions (hover, click, etc.)
 */

/**
 * Button hover animation - scale up slightly
 */
export function buttonHover(
  element: gsap.TweenTarget,
  options: {
    scale?: number;
    duration?: number;
  } = {}
): gsap.core.Tween {
  const {
    scale = 1.05,
    duration = ANIMATION_CONFIG.duration.fast,
  } = options;

  return gsap.to(element, {
    scale,
    duration,
    ease: ANIMATION_CONFIG.easing.out,
  });
}

/**
 * Button hover out animation - return to normal
 */
export function buttonHoverOut(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
  } = {}
): gsap.core.Tween {
  const { duration = ANIMATION_CONFIG.duration.fast } = options;

  return gsap.to(element, {
    scale: 1,
    duration,
    ease: ANIMATION_CONFIG.easing.out,
  });
}

/**
 * Button click animation - quick scale down then up
 */
export function buttonClick(
  element: gsap.TweenTarget,
  options: {
    scale?: number;
    duration?: number;
  } = {}
): gsap.core.Timeline {
  const {
    scale = 0.95,
    duration = ANIMATION_CONFIG.duration.fast,
  } = options;

  const tl = gsap.timeline();
  tl.to(element, {
    scale,
    duration: duration * 0.5,
    ease: ANIMATION_CONFIG.easing.in,
  });
  tl.to(element, {
    scale: 1,
    duration: duration * 0.5,
    ease: ANIMATION_CONFIG.easing.out,
  });

  return tl;
}

/**
 * Card hover animation - lift effect
 */
export function cardHover(
  element: gsap.TweenTarget,
  options: {
    y?: number;
    scale?: number;
    duration?: number;
  } = {}
): gsap.core.Tween {
  const {
    y = -5,
    scale = 1.02,
    duration = ANIMATION_CONFIG.duration.normal,
  } = options;

  return gsap.to(element, {
    y,
    scale,
    duration,
    ease: ANIMATION_CONFIG.easing.out,
  });
}

/**
 * Card hover out animation
 */
export function cardHoverOut(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
  } = {}
): gsap.core.Tween {
  const { duration = ANIMATION_CONFIG.duration.normal } = options;

  return gsap.to(element, {
    y: 0,
    scale: 1,
    duration,
    ease: ANIMATION_CONFIG.easing.out,
  });
}

/**
 * Selection feedback animation - subtle scale down
 */
export function selectionPulse(
  element: gsap.TweenTarget,
  options: {
    scale?: number;
    duration?: number;
  } = {}
): gsap.core.Timeline {
  const {
    scale = 0.95, // Scale down slightly instead of up
    duration = ANIMATION_CONFIG.duration.fast,
  } = options;

  const tl = gsap.timeline();
  tl.to(element, {
    scale,
    duration: duration * 0.5,
    ease: ANIMATION_CONFIG.easing.in,
  });
  tl.to(element, {
    scale: 1,
    duration: duration * 0.5,
    ease: ANIMATION_CONFIG.easing.out,
  });

  return tl;
}

