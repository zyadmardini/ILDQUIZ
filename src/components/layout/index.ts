/**
 * Layout Components
 *
 * Shared layout components used across pages:
 * - PageBackground: Reusable background component for all pages
 * - QuizPageLayout: Generic base layout for all patient quiz pages
 * - TwoColumnContent: Reusable two-column layout (image + content)
 * - PageTransition: Wrapper for page transition animations
 */

export { default as PageBackground } from './PageBackground';
export type { PageBackgroundProps } from './PageBackground';

export { default as QuizPageLayout } from './QuizPageLayout';
export type { QuizPageLayoutProps } from './QuizPageLayout';

export { default as TwoColumnContent } from './TwoColumnContent';
export type { TwoColumnContentProps } from './TwoColumnContent';

export { default as PageTransition } from './PageTransition';
export type { PageTransitionProps } from './PageTransition';

export { default as StaticUILayer } from './StaticUILayer';
export type { StaticUILayerProps } from './StaticUILayer';

