import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'solid',
  size = 'medium',
  loading = false,
  children,
  className = '',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = ['ds-button', `ds-button--${variant}`, `ds-button--${size}`, loading ? 'ds-button--loading' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {loading ? (
        <span className="ds-button__dots" aria-hidden="true">
          <span className="ds-button__dot" />
          <span className="ds-button__dot" />
          <span className="ds-button__dot" />
        </span>
      ) : children}
    </button>
  );
}
