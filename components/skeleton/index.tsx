import React, { useMemo } from 'react';
import { cls } from './style';
import { cx } from '../emotion';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 行 */
  rows?: number;
  /** 显示动画 */
  active?: boolean;
  /** 显示头像 */
  avatar?: boolean;
  /** 显示标题 */
  title?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  rows = 3,
  className,
  active,
  avatar,
  title,
  ...props
}) => {
  const activeCls = useMemo(() => active && cls.active, [active]);

  return (
    <div {...props} className={cx(cls.skeleton, className)}>
      {avatar && <div className={cx(cls.avatar, activeCls)} />}
      <div className={cls.body}>
        {title && <div className={cx(cls.title, activeCls)} />}
        <div className={cls.paragraph}>
          {Array(rows)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={cx(activeCls)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
