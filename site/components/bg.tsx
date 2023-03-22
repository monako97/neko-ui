import React, { type FC, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { createPortal } from 'react-dom';

const bg = css`
  .site-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    animation: rotate 10s linear infinite;
    filter: blur(8rem);
  }

  .site-polygon::after,
  .site-polygon::before,
  .site-bg::after,
  .site-bg::before {
    position: absolute;
    z-index: 1;
    width: 30%;
    height: 30%;
    opacity: 0.25;
    content: '';
  }

  .site-bg::before {
    top: 50%;
    left: 0%;
    background: #9c27b0;
    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  .site-bg::after {
    top: 0%;
    left: 0%;
    background: #b0ab27;
    clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
  }

  .site-polygon::after {
    top: 10%;
    left: 40%;
    background: #e91e63;
    clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  .site-polygon::before {
    top: 50%;
    left: 50%;
    background: #ff9800;
    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  @keyframes rotate {
    100% {
      transform: rotate(0deg);
    }

    0% {
      transform: rotate(360deg);
    }
  }
`;

injectGlobal([bg]);

const Bg: FC = () => {
  return createPortal(
    <div className="site-bg">
      <div className="site-polygon" />
    </div>,
    document.body
  );
};

export default memo(Bg, () => true);
