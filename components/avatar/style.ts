import favicon from './favicon.svg';
import { injectGlobal } from '../emotion';
import prefixCls from '../prefix-cls';

export const svgPrefix = 'data:image/svg+xml,';
export const cls = {
  avatar: prefixCls('avatar'),
};

const faviconBg = `data:image/svg+xml;base64,${window.btoa(
  decodeURIComponent(favicon.replace(svgPrefix, ''))
)}`;

injectGlobal`
  .${cls.avatar} {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    inline-size: 32px;
    block-size: 32px;
    transition: transform 0.3s;
    cursor: pointer;
    user-select: none;
    background-image: linear-gradient(45deg, var(--primary-outline) 0%, var(--success-outline) 100%);
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