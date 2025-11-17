/**
 * Color Design Tokens
 * Extracted from Figma design system
 */

export const colors = {
  background: {
    primary: '#929292',
    secondary: '#c9c9c9',
    overlay: 'rgba(217,217,217,0.43)',
    dark: '#1e1e1e',
    white: '#ffffff',
  },
  accent: {
    primary: '#f2664f',
    pressed: '#f39a8c',
  },
  text: {
    primary: '#1e1e1e',
    secondary: '#ffffff',
    accent: '#f2664f',
  },
} as const;

export type Colors = typeof colors;

