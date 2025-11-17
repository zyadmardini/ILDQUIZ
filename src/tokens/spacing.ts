/**
 * Spacing Design Tokens
 * Extracted from Figma design system
 */

export const spacing = {
  xs: '3px',
  sm: '9px',
  md: '14px',
  lg: '26px',
  xl: '54px',
  gap: {
    small: '10px',
    medium: '15px',
    large: '16px',
  },
} as const;

export type Spacing = typeof spacing;

