export const colors = {
  white: '#ffffff',
  black: '#000000',

  brand: {
    primary: '#DB5C05',
    'primary-dark': '#C35500',
    secondary: '#012F4C',
    accent: '#156BA3',
  },

  neutral: {
    0: '#FFFFFF',
    100: '#F5F5F5',
    200: '#E0E0E0',
    300: '#CECECE',
    400: '#DEDEDE',
    500: '#8F8F8F',
    700: '#4E4E4E',
    900: '#000000',
  },

  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#156BA3',
  },

  text: {
    primary: 'var(--color-neutral-900)',
    secondary: 'var(--color-neutral-700)',
    muted: 'var(--color-neutral-500)',
    inverse: 'var(--color-neutral-0)',
    brand: 'var(--color-brand-primary)',
    link: 'var(--color-brand-primary)',
    'link-hover': 'var(--color-brand-primary-dark)',
  },

  background: {
    primary: 'var(--color-neutral-0)',
    secondary: 'var(--color-neutral-100)',
    brand: 'var(--color-brand-primary)',
    'brand-hover': 'var(--color-brand-primary-dark)',
    inverse: 'var(--color-neutral-900)',
  },

  border: {
    default: 'var(--color-neutral-300)',
    subtle: 'var(--color-neutral-200)',
    strong: 'var(--color-neutral-700)',
    brand: 'var(--color-brand-primary)',
    focus: 'var(--color-brand-primary)',
  },
} as const;

export type Colors = typeof colors;
