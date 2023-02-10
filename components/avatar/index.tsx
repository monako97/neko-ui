import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css, keyframes } from '@emotion/css';
import { classNames } from '@moneko/common';
import favicon from './favicon.svg?raw';
import clipPath from './clip-path.svg?raw';
import type { ComponentSize } from '..';

const avatarMorph = keyframes`
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }

  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
`;

const faviconBg = `data:image/svg+xml;base64,${window.btoa(favicon)}`;
const avatarCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s;
  background-image: linear-gradient(45deg, #cabdeb 0%, #e9887c 100%);
  animation: ${avatarMorph} 8s ease-in-out infinite;
  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    content: '';
    transition: transform 0.3s;
  }

  &::before {
    background-color: var(--avatar-color);
    clip-path: url('#clipPathAvatar');
  }
  &::after {
    background: url(${faviconBg}) no-repeat center/contain;
  }
  span {
    transition: transform 0.3s;
  }

  &:hover {
    > *,
    &::after,
    &::before {
      transform: scale(1.2);
    }
  }

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: url('#clipPathAvatar');
    transition: transform 0.3s;
  }
`;

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: ReactNode;
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

const Avatar: FC<AvatarProps> = ({
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
  const cls = useMemo(() => classNames(avatarCss, className), [className]);

  useEffect(() => {
    const hasSvg = document.documentElement.querySelector('clipPath#clipPathAvatar');

    if (!hasSvg) {
      const svg = document.createElement('a');

      svg.innerHTML = clipPath;
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

  useEffect(() => {
    if (label.current && box.current) {
      if (label.current.clientWidth + 6 > box.current.clientWidth) {
        setScale((box.current.clientWidth - 6) / label.current.clientWidth);
      }
    }
  }, []);
  const img = useMemo(
    () => (typeof src === 'string' ? <img src={src} alt={alt} /> : src),
    [alt, src]
  );

  return (
    <div ref={box} className={cls} style={_style} {...props}>
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
