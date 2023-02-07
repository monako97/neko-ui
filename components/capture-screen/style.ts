import { css, keyframes } from '@emotion/css';

const recordFadeLoop = keyframes`    
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

export const captureScreenCss = css`
  display: block;
`;
export const videoCss = css`
  position: relative;

  video {
    width: 100%;
    border: 1px solid var(--border-color-base);
    border-radius: var(--border-radius-base);
    transition: border-color var(--transition-duration) var(--transition-timing-function);
  }
`;
const recordingAndPausedCss = css`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

export const recordingCss = css`
  ${recordingAndPausedCss}
  background-color: var(--success-color);
  animation: ${recordFadeLoop} 2s infinite;
`;
export const pausedCss = css`
  ${recordingAndPausedCss}
  background-color: var(--warning-color);
`;
export const controllerCss = css`
  display: flex;
  margin: 16px 0;
`;
export const btnCss = css`
  margin-right: 16px;
`;
export const recordCss = css`
  display: flex;
  margin-left: 16px;

  &::before {
    display: block;
    height: 100%;
    border-left: 1px solid var(--border-color-base);
    transform: translateX(-16px);
    transition: border-color var(--transition-duration) var(--transition-timing-function);
    content: '';
  }
`;
