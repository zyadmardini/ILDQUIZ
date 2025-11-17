/**
 * Animation Configuration
 * 
 * Centralized configuration for all GSAP animations
 * Provides consistent timing, easing, and duration values
 */

export const ANIMATION_CONFIG = {
  // Durations (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.4,
    pageTransition: 0.4,
  },

  // Easing functions
  easing: {
    // Entrances - start fast, end slow
    in: 'power2.in',
    // Exits - start slow, end fast
    out: 'power2.out',
    // Both - smooth in and out
    inOut: 'power2.inOut',
    // Elastic bounce effect
    elastic: 'elastic.out(1, 0.3)',
  },

  // Stagger delays (in seconds)
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },

  // Default animation values
  defaults: {
    opacity: {
      from: 0,
      to: 1,
    },
    scale: {
      from: 0.8,
      to: 1,
    },
    y: {
      from: 20,
      to: 0,
    },
    x: {
      from: 20,
      to: 0,
    },
  },
} as const;

export type AnimationConfig = typeof ANIMATION_CONFIG;

