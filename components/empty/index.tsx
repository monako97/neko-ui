import React from 'react';
import { cls } from './style';
import { cx } from '../emotion';
import Typography from '../typography';

export interface EmptyProps {
  className?: string;
}
const Empty: React.FC<EmptyProps> = ({ className }) => {
  return (
    <div className={cx(cls.empty, className)}>
      <Typography className={cls.label} type="secondary">
        无数据
      </Typography>
    </div>
  );
};

export default Empty;
