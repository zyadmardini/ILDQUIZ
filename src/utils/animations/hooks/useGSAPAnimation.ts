import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';
import { ANIMATION_CONFIG } from '../animationConfig';

/**
 * useGSAPAnimation Hook
 * 
 * Generic hook for GSAP animations with automatic cleanup
 * 
 * @param animationFn - Function that receives GSAP context and element ref
 * @param deps - Dependency array (triggers re-animation when changed)
 * @returns Ref object to attach to the element
 * 
 * @example
 * const elementRef = useGSAPAnimation((ctx, el) => {
 *   ctx.from(el, { opacity: 0, y: 20, duration: 0.3 });
 * });
 */
export function useGSAPAnimation(
  animationFn: (ctx: gsap.Context, element: Element | null) => void,
  deps: React.DependencyList = []
): RefObject<HTMLElement> {
  const elementRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const ctxRef = useRef<gsap.Context | null>(null);
  const lastDepsRef = useRef<string>('');

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    // Create a stable key from dependencies to track if we've animated for these deps
    // This prevents double execution in React.StrictMode
    const depsKey = JSON.stringify(deps);
    
    // Prevent double execution - only animate if dependencies actually changed
    // This prevents React.StrictMode double execution on same mount
    // When component remounts with same deps, lastDepsRef resets to '', so it will animate (desired)
    if (lastDepsRef.current === depsKey) {
      return;
    }

    // Kill any existing animation before creating new one
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    // Create GSAP context for this animation
    const ctx = gsap.context((context) => {
      animationFn(context, element);
    }, element);

    ctxRef.current = ctx;
    lastDepsRef.current = depsKey;

    // Cleanup function
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      // Reset lastDepsRef only if dependencies changed (will be different on next run)
      // This allows re-animation when navigating back and forth with same patientId
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps]);

  return elementRef;
}

/**
 * useGSAPAnimationWithRef Hook
 * 
 * Version that accepts an external ref instead of creating one
 * 
 * @param ref - External ref to use
 * @param animationFn - Function that receives GSAP context and element ref
 * @param deps - Dependency array
 */
export function useGSAPAnimationWithRef<T extends HTMLElement>(
  ref: RefObject<T>,
  animationFn: (ctx: gsap.Context, element: T | null) => void,
  deps: React.DependencyList = []
): void {
  const prefersReducedMotion = useReducedMotion();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    // Create GSAP context for this animation
    const ctx = gsap.context((context) => {
      animationFn(context, element);
    }, element);

    ctxRef.current = ctx;

    // Cleanup function
    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ref, ...deps]);
}

