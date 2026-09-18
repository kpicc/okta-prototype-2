export const typography = {
  fontFamily: {
    sans: '"Ambra Sans Text", "Ambra", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    h1: 'clamp(3rem, 5vw, 4rem)',
    h2: 'clamp(2rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2rem)',
    h4: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    h5: 'clamp(0.75rem, 1.5vw, 1rem)',
    h6: 'clamp(0.75rem, 1.2vw, 0.875rem)',
    body: 'clamp(0.875rem, 1.5vw, 1rem)',
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    h1: 'clamp(2.625rem, 4vw, 3.25rem)',
    h2: 'clamp(2.125rem, 3.5vw, 3rem)',
    h3: 'clamp(1.75rem, 3vw, 2.125rem)',
    h4: 'clamp(1.5rem, 2.5vw, 1.75rem)',
    h5: 'clamp(1.25rem, 1.8vw, 1.375rem)',
    h6: 'clamp(1rem, 1.5vw, 1.25rem)',
    body: 'clamp(1.25rem, 1.8vw, 1.5rem)',
  },
  letterSpacing: {
    tight: '-0.017em',
    normal: '0',
    wide: '0.025em',
    h5: 'clamp(0.075rem, 0.15vw, 0.1rem)',
  },
  textTransform: {
    uppercase: 'uppercase',
    none: 'none',
  },
} as const;

export type Typography = typeof typography;
