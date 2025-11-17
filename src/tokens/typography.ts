/**
 * Typography Design Tokens
 * Extracted from Figma design system
 */

export const typography = {
  fontFamily: {
    primary: "'Helvetica Neue', sans-serif",
    display: "'Krona One', sans-serif",
  },
  fontSize: {
    display: '29px',
    headingLarge: '25px',
    headingMedium: '24px',
    bodyLarge: '23px',
    bodyMedium: '21px',
    bodySmall: '20px',
    bodyXSmall: '19px',
    caption: '18px',
    icon: '42px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    normal: 'normal',
    tight: '0',
  },
} as const;

export type Typography = typeof typography;

