import React, { createElement } from 'react';
import { cls } from './style';
import { cx } from '../emotion';

export type TypographyType = 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'normal';
export interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  type?: TypographyType;
  truncated?: boolean | { rows: number };
  tag?: keyof React.ReactHTML;
  disabled?: boolean;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  style,
  type,
  children,
  truncated,
  disabled,
  tag = 'span',
  ...props
}) => {
  return createElement(
    tag,
    {
      ...props,
      disabled: disabled,
      className: cx(cls.typography, type && cls[type], truncated && cls.truncated, className),
      style: {
        ...style,
        '--rows': typeof truncated === 'object' && truncated?.rows,
      } as React.CSSProperties,
    },
    children
  );
};

export default Typography;
