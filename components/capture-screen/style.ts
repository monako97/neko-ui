import { css, keyframes } from '@emotion/css';

const recordFadeLoop = keyframes`0% {
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
    border: 1px solid var(--border-color-base);
    border-radius: var(--border-radius-base);
    width: 100%;
    transition: border-color var(--transition-duration) var(--transition-timing-function);
  }
`;
const recordingAndPausedCss = css`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

export const recordingCss = css`
  ${recordingAndPausedCss}

  background-color: var(--success-color, #52c41a);
  animation: ${recordFadeLoop} 2s infinite;
`;
export const pausedCss = css`
  ${recordingAndPausedCss}

  background-color: var(--warning-color, #faad14);
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
    border-left: 1px solid var(--border-color-base);
    height: 100%;
    transition: border-color var(--transition-duration) var(--transition-timing-function);
    transform: translateX(-16px);
    content: '';
  }
`;
