import { css } from '@moneko/css';

export const style = css`
  .capture-screen {
    display: block;
  }

  .view {
    position: relative;
  }

  .view video {
    border: var(--border-base);
    border-radius: var(--border-radius);
    inline-size: 100%;
    transition: border-color var(--transition-duration) var(--transition-timing-function);
  }

  .recording,
  .paused {
    position: absolute;
    inset-block-start: 5px;
    inset-inline-end: 5px;
    border-radius: 50%;
    inline-size: 10px;
    block-size: 10px;
  }

  .recording {
    background-color: var(--success-color, #52c41a);
    animation: record-fade-loop-effect 2s infinite;
  }

  .paused {
    background-color: var(--warning-color, #faad14);
  }

  .controller {
    display: flex;
    margin: 16px 0;
  }

  .btn {
    margin-inline-end: 16px;
  }

  .record {
    display: flex;
    margin-inline-start: 16px;

    &::before {
      display: block;
      border-inline-start: 1px solid var(--border-color);
      block-size: 100%;
      transition: border-color var(--transition-duration) var(--transition-timing-function);
      transform: translateX(-16px);
      content: '';
    }
  }

  @keyframes record-fade-loop-effect {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
