import React from 'react';
import { cls } from './style';
import { cx } from '..';

export interface LoadingProps {
  className?: string;
  style?: React.CSSProperties;
  loading: boolean;
  children?: React.ReactNode;
}
const Loading: React.FC<LoadingProps> = ({ loading, children, style, className }) => {
  return (
    <div className={cx(cls.box, loading && cls.loading, className)} style={style}>
      <div className={cls.content}>{children}</div>
    </div>
  );
};

export default Loading;
