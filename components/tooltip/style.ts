import { css, keyframes } from '@emotion/css';

export const variablesCss = `
  :root {
    --tooltip-bg: rgba(255, 255, 255, 0.8);
    --tooltip-shadow-color: rgba(0, 0, 0, 0.1);
  }

  [data-theme='dark'] {
    --tooltip-bg: rgba(0, 0, 0, 0.8);
    --tooltip-shadow-color: rgba(255, 255, 255, 0.05);
  }
`;

const slideDownIn = keyframes`0% {
    transform: scaleY(.8);
    transform-origin: 100% 100%;
    opacity: 0;
}

100% {
    transform: scaleY(1);
    transform-origin: 100% 100%;
    opacity: 1;
}
`;
const slideDownOut = keyframes`0% {
    transform: scaleY(1);
    transform-origin: 100% 100%;
    opacity: 1;
}

100% {
    transform: scaleY(.8);
    transform-origin: 100% 100%;
    opacity: 0;
}
`;

export const tooltipCss = css`
  position: relative;
  display: inline-block;

  &::-webkit-scrollbar {
    width: 1px;
  }
`;

export const portalCss = css`
  position: fixed;
  display: inline-block;
  border-radius: var(--border-radius-base, 4px);
  padding: 4px 8px;
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--tooltip-bg);
  filter: drop-shadow(0.5px 1px 4px var(--tooltip-shadow-color))
    drop-shadow(1px 2px 8px var(--tooltip-shadow-color))
    drop-shadow(2px 4px 16px var(--tooltip-shadow-color));
  backdrop-filter: blur(16px);

  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 12px;
    height: 8px;
    background: inherit;
    content: '';
    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
    transform: translateY(100%);
  }
`;

export const tooltipInUp = css`
  animation: ${slideDownIn} 0.3s forwards;
  transform: scaleY(1);
`;
export const tooltipOutUp = css`
  animation: ${slideDownOut} 0.3s forwards;
  transform: scaleY(1);
`;