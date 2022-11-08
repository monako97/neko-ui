import React, { useMemo } from 'react';
import getPrefixCls from '../get-prefix-cls';
import { classNames } from '@moneko/common';
import './index.global.less';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  imgProps?: React.HTMLAttributes<HTMLImageElement>;
}

const Avatar: React.FC<AvatarProps> = ({ className, src, alt, imgProps = {}, ...props }) => {
  const cls = useMemo(() => classNames(getPrefixCls('avatar'), className), [className]);

  return (
    <div className={cls} {...props}>
      <img {...imgProps} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
