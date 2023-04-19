import React from 'react';
import { css, keyframes } from '@emotion/css';
import { createPortal } from 'react-dom';

const colorfulStripe = keyframes`
  100% {
    filter: hue-rotate(360deg);
  }
`;
const bg = css`
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  z-index: -1;
  inline-size: 100vi;
  block-size: 100vb;
  background: linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  transform: translate(-50%, -50%);
  background-blend-mode: screen;
  animation: ${colorfulStripe} 15s infinite alternate linear;
  pointer-events: none;
  opacity: 0.05;
`;

const Bg: React.FC = () => {
  return createPortal(<div className={bg} />, document.body);
};

export default Bg;
