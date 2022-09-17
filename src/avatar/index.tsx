import React, { useMemo } from 'react';
import styles from './index.less';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  imgProps?: React.HTMLAttributes<HTMLImageElement>;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  src = 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
  imgProps = {},
  ...props
}) => {
  const cls = useMemo(() => [styles.avatar, className].filter(Boolean).join(' '), [className]);

  return (
    <div className={cls} {...props}>
      <img src={src} {...imgProps} />
    </div>
  );
};

export default Avatar;
