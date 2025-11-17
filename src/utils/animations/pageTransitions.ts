import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from './animationConfig';

/**
 * Page Transition Utilities
 * 
 * GSAP animations for page transitions
 */

export type TransitionType = 'fade' | 'slide' | 'scale' | 'slideLeft' | 'slideRight';

export interface PageTransitionOptions {
  duration?: number;
  ease?: string;
  direction?: 'forward' | 'backward';
}

/**
 * Page enter animation
 */
export function pageEnter(
  element: gsap.TweenTarget,
  type: TransitionType = 'fade',
  options: PageTransitionOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const {
    duration = ANIMATION_CONFIG.duration.pageTransition,
    ease = ANIMATION_CONFIG.easing.out,
  } = options;

  // Ensure element starts visible (in case it was hidden)
  if (element && typeof element === 'object' && 'style' in element) {
    const el = element as HTMLElement;
    el.style.visibility = 'visible';
    el.style.pointerEvents = 'auto';
  }

  switch (type) {
    case 'fade':
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration, ease }
      );

    case 'slide':
      return gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration, ease }
      );

    case 'scale':
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration, ease }
      );

    case 'slideLeft':
      return gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration, ease }
      );

    case 'slideRight':
      return gsap.fromTo(
        element,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration, ease }
      );

    default:
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration, ease }
      );
  }
}

/**
 * Page exit animation
 */
export function pageExit(
  element: gsap.TweenTarget,
  type: TransitionType = 'fade',
  options: PageTransitionOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const {
    duration = ANIMATION_CONFIG.duration.pageTransition,
    ease = ANIMATION_CONFIG.easing.in,
  } = options;

  switch (type) {
    case 'fade':
      return gsap.to(element, {
        opacity: 0,
        duration,
        ease,
      });

    case 'slide':
      return gsap.to(element, {
        opacity: 0,
        y: -30,
        duration,
        ease,
      });

    case 'scale':
      return gsap.to(element, {
        opacity: 0,
        scale: 0.95,
        duration,
        ease,
      });

    case 'slideLeft':
      return gsap.to(element, {
        opacity: 0,
        x: -100,
        duration,
        ease,
      });

    case 'slideRight':
      return gsap.to(element, {
        opacity: 0,
        x: 100,
        duration,
        ease,
      });

    default:
      return gsap.to(element, {
        opacity: 0,
        duration,
        ease,
      });
  }
}

/**
 * Direction-aware page transition
 * Uses slideLeft/slideRight based on navigation direction
 */
export function directionAwareTransition(
  exitElement: gsap.TweenTarget,
  enterElement: gsap.TweenTarget,
  direction: 'forward' | 'backward' = 'forward',
  options: PageTransitionOptions = {}
): gsap.core.Timeline {
  const {
    duration = ANIMATION_CONFIG.duration.pageTransition,
  } = options;

  const exitType: TransitionType = direction === 'forward' ? 'slideLeft' : 'slideRight';
  const enterType: TransitionType = direction === 'forward' ? 'slideRight' : 'slideLeft';

  const tl = gsap.timeline();

  // Exit current page
  tl.add(pageExit(exitElement, exitType, { duration: duration * 0.5 }), 0);
  
  // Enter new page
  tl.add(pageEnter(enterElement, enterType, { duration: duration * 0.5 }), duration * 0.3);

  return tl;
}

