import React, { useMemo } from 'react';
import styles from './index.less';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  imgProps?: React.HTMLAttributes<HTMLImageElement>;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  src = 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
  alt,
  imgProps = {},
  ...props
}) => {
  const cls = useMemo(() => [styles.avatar, className].filter(Boolean).join(' '), [className]);

  return (
    <div className={cls} {...props}>
      <img {...imgProps} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
