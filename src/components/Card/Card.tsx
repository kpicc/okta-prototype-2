import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'medium',
  children,
  className = '',
  ...rest
}: CardProps) {
  const classes = ['ds-card', `ds-card--${variant}`, `ds-card--padding-${padding}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
