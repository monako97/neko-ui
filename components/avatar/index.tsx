import {
  Match,
  Switch,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onMount,
} from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import clipPath from './clip-path.svg';
import favicon from './favicon.svg';
import type { ComponentSize } from '../index';
const faviconBg = `data:image/svg+xml;base64,${window.btoa(
  decodeURIComponent(favicon.replace('data:image/svg+xml,', ''))
)}`;
const clip = decodeURIComponent(clipPath.replace('data:image/svg+xml,', ''));
const style = css`
  .avatar {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    inline-size: 32px;
    block-size: 32px;
    transition: transform 0.3s;
    cursor: pointer;
    user-select: none;
    background-image: linear-gradient(
      45deg,
      var(--primary-outline) 0%,
      var(--success-outline) 100%
    );
    animation: avatar-morph-effect 8s ease-in-out infinite;

    &::before,
    &::after {
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      display: block;
      inline-size: 100%;
      block-size: 100%;
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
      inset-inline-start: 0;
      inline-size: 100%;
      block-size: 100%;
      clip-path: url('#clipPathAvatar');
      transition: transform 0.3s;
    }
  }

  @keyframes avatar-morph-effect {
    0% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }

    50% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }

    100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
  }
`;

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | ComponentSize;
  username?: string;
  color?: string;
  class?: string;
  css?: string;
}

const avatarSize: Record<string, string> = {
  small: '24px',
  normal: '32px',
  large: '40px',
};

function Avatar(_props: AvatarProps) {
  const props = mergeProps({ size: 32 }, _props);
  let box: HTMLDivElement | undefined;
  let label: HTMLSpanElement | undefined;
  const [scale, setScale] = createSignal(1);

  onMount(() => {
    const hasSvg = document.documentElement.querySelector('clipPath#clipPathAvatar');

    if (!hasSvg) {
      const svg = document.createElement('a');

      svg.innerHTML = clip;
      document.body.insertBefore(svg.firstChild as ChildNode, document.body.firstChild);
    }
  });
  const _style = createMemo(() => {
    const size = avatarSize[props.size] || `${props.size}px` || '32px';

    return css`
      .avatar {
        --avatar-color: ${props.color};

        inline-size: ${size};
        block-size: ${size};
      }
    `;
  });

  createEffect(() => {
    if (label && box) {
      if (label.clientWidth + 6 > box.clientWidth) {
        setScale((box.clientWidth - 6) / label.clientWidth);
      }
    }
  });

  return (
    <>
      <style>
        {style}
        {_style()}
        {css(props.css)}
      </style>
      <div ref={box} class={cx('avatar', props.class)}>
        <Switch>
          <Match when={typeof props.src === 'string'}>
            <img src={props.src} alt={props.alt} />
          </Match>
          <Match when={props.username}>
            <span ref={label} style={{ transform: `scale(${scale()})` }}>
              {props.username}
            </span>
          </Match>
        </Switch>
      </div>
    </>
  );
}

export interface AvatarElement extends AvatarProps {
  ref?: AvatarElement | { current: AvatarElement | null };
}

interface CustomElementTags {
  'n-avatar': AvatarElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}

customElement(
  'n-avatar',
  {
    css: undefined,
    size: undefined,
    src: undefined,
    alt: undefined,
    username: undefined,
    color: undefined,
    class: undefined,
  },
  Avatar
);
export default Avatar;
