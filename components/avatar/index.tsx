import React, { useEffect, useMemo, useRef, useState } from 'react';
import clipPath from './clip-path.svg';
import { cls, svgPrefix } from './style';
import { type ComponentSize } from '../';
import { cx } from '../emotion';

const clip = decodeURIComponent(clipPath.replace(svgPrefix, ''));

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: React.ReactNode;
  alt?: string;
  size?: number | ComponentSize;
  username?: string;
  color?: string;
}
const avatarSize: Record<ComponentSize, number> = {
  small: 24,
  normal: 32,
  large: 40,
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  username,
  size,
  style = {},
  color,
  ...props
}) => {
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const hasSvg = document.documentElement.querySelector('clipPath#clipPathAvatar');

    if (!hasSvg) {
      const svg = document.createElement('a');

      svg.innerHTML = clip;
      document.body.insertBefore(svg.firstChild as ChildNode, document.body.firstChild);
    }
  }, []);
  const _style = useMemo(() => {
    if (typeof size === 'number') {
      style.width = size;
      style.height = size;
    } else if (size && avatarSize[size]) {
      style.width = avatarSize[size];
      style.height = avatarSize[size];
    }
    if (color)
      Object.assign(style, {
        '--avatar-color': color,
      });
    return style;
  }, [color, size, style]);

  const img = useMemo(
    () => (typeof src === 'string' ? <img src={src} alt={alt} /> : src),
    [alt, src]
  );

  useEffect(() => {
    if (label.current && box.current) {
      if (label.current.clientWidth + 6 > box.current.clientWidth) {
        setScale((box.current.clientWidth - 6) / label.current.clientWidth);
      }
    }
  }, []);

  return (
    <div ref={box} className={cx(cls.avatar, className)} style={_style} {...props}>
      {img ? (
        img
      ) : username ? (
        <span ref={label} style={{ transform: `scale(${scale})` }}>
          {username}
        </span>
      ) : null}
    </div>
  );
};

export default Avatar;
