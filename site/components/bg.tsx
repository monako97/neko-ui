import React, { type FC } from 'react';
import { injectGlobal } from '@emotion/css';
import { createPortal } from 'react-dom';

const bg = `
  .site-bg {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(limegreen, transparent),
      linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent);
    transform: translate(-50%, -50%);
    background-blend-mode: screen;
    animation: colorful-stripe 15s infinite alternate linear;
    pointer-events: none;
    opacity: 0.05;
  }

  @keyframes colorful-stripe {
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

injectGlobal([bg]);
const Bg: FC = () => {
  return createPortal(<div className="site-bg" />, document.body);
};

export default Bg;
