import React from 'react';
import { injectGlobal, Portal } from 'neko-ui';

injectGlobal`
  .n-site-bg {
    position: fixed;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    z-index: -1;
    inline-size: 100vi;
    block-size: 100vb;
    background: linear-gradient(limegreen, transparent),
      linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent);
    transform: translate(-50%, -50%);
    background-blend-mode: screen;
    animation: color-ful-stripe 15s infinite alternate linear;
    pointer-events: none;
    opacity: 0.05;
  }

  @keyframes color-ful-stripe {
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

const Bg: React.FC = () => {
  return (
    <Portal>
      <div className="n-site-bg" />
    </Portal>
  );
};

export default Bg;
