import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'filled' | 'outline-inverse';
  children: ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  className = '',
  ...rest
}: BadgeProps) {
  const classes = ['ds-badge', `ds-badge--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
