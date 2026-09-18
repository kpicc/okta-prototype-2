export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '10px',
  xl: '20px',
  pill: '30px',
  full: '100px',
} as const;

export type Radius = typeof radius;
