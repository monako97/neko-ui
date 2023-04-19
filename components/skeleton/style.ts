import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const cls = {
  skeleton: prefixCls('skeleton'),
  active: prefixCls('skeleton-active'),
  title: prefixCls('skeleton-title'),
  paragraph: prefixCls('skeleton-paragraph'),
  body: prefixCls('skeleton-body'),
  avatar: prefixCls('skeleton-avatar'),
};

injectGlobal`
  :root {
    --skeleton-bg: rgb(0 0 0 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(0 0 0 / 5%) 40%,
        rgb(0 0 0 / 15%) 50%,
        rgb(0 0 0 / 5%) 60%
      )
      transparent 180%/200% 100%;
  }

  [data-theme='dark'] {
    --skeleton-bg: rgb(255 255 255 / 6%);
    --skeleton-bg-active: linear-gradient(
        100deg,
        rgb(255 255 255 / 5%) 40%,
        rgb(255 255 255 / 15%) 50%,
        rgb(255 255 255 / 5%) 60%
      )
      transparent 180%/200% 100%;
  }
  .${cls.skeleton} {
    display: flex;
    inline-size: 100%;
    gap: 16px;
  }
  .${cls.avatar} {
    border-radius: 50%;
    inline-size: 32px;
    block-size: 32px;
  }

  .${cls.body} {
    flex: 1;
  }
  .${cls.title} {
    margin-block-end: 16px;
    inline-size: 32%;
    block-size: 32px;
  }
  .${cls.paragraph} {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: 12px;
  }
  .${cls.paragraph} > div {
    inline-size: 100%;
    block-size: 16px;
    list-style: none;
  }

  .${cls.paragraph} > div:last-of-type {
    inline-size: 65%;
  }
  .${cls.avatar}, .${cls.title}, .${cls.paragraph} > div {
    overflow: hidden;
    border-radius: var(--border-radius);
    background: var(--skeleton-bg);
    transition: background-color var(--transition-duration) var(--transition-timing-function);
  }

  .${cls.active} {
    &::after {
      display: block;
      block-size: 100%;
      animation: skeleton-effect 1.4s ease-in-out infinite;
      background: var(--skeleton-bg-active);
      content: '';
      transition: background-color var(--transition-duration) var(--transition-timing-function);
    }
  }

  @keyframes skeleton-effect {
    to {
      background-position-x: -20%;
    }
  }
`;
