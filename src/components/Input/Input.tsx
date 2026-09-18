import type { InputHTMLAttributes } from 'react';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'small' | 'medium' | 'large';
  error?: boolean;
}

export function Input({
  inputSize = 'medium',
  error = false,
  className = '',
  ...rest
}: InputProps) {
  const classes = ['ds-input', `ds-input--${inputSize}`, error && 'ds-input--error', className]
    .filter(Boolean)
    .join(' ');

  return <input className={classes} {...rest} />;
}
