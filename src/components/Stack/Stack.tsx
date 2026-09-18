import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Stack.css';

type SpacingToken = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: SpacingToken;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  children: ReactNode;
}

export function Stack({
  direction = 'column',
  gap = '4',
  align,
  justify,
  wrap = false,
  children,
  className = '',
  style,
  ...rest
}: StackProps) {
  const classes = ['ds-stack', `ds-stack--${direction}`, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        gap: `var(--space-${gap})`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
