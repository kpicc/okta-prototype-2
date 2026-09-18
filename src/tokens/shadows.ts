export const shadows = {
  none: 'none',
  sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0px 2px 10px rgba(0, 0, 0, 0.25)',
  lg: '2px 2px 10px rgba(0, 0, 0, 0.25)',
  innerLeft: '-25px 0px 20px -20px #dddddd',
} as const;

export type Shadows = typeof shadows;
