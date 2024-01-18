import { css } from '@moneko/css';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
    pointer-events: none;
  }

  .notification {
    inline-size: fit-content;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 5px 16px;
    background-color: var(--modal-component-bg);
    opacity: var(--opacity);
    box-shadow: var(--notification-box-shadow);
    backdrop-filter: blur(10px);
    gap: 8px;
    pointer-events: all;
    animation: scale-in 0.2s forwards;

    &.closeing {
      animation: scale-out 0.2s forwards;
    }

    &.error {
      color: var(--error-color);
      background-color: var(--error-notify-bg);
    }

    &.success {
      color: var(--success-color);
      background-color: var(--success-notify-bg);
    }

    &.warning {
      color: var(--warning-color);
      background-color: var(--warning-notify-bg);
    }

    &.primary {
      color: var(--primary-color);
      background-color: var(--primary-notify-bg);
    }
  }

  .close {
    border-radius: 16px;
    font-size: 14px;
    text-align: center;
    opacity: 0.8;
    outline: 2px solid transparent;
    transition: transform var(--transition-duration);
    transform: translate3d(50%, 0, 1px);
    cursor: pointer;
    block-size: 14px;
    line-height: 1;
    inline-size: 14px;

    &::before {
      content: '⛌';
    }

    &:hover {
      opacity: 1;
    }
  }

  @keyframes scale-in {
    from {
      transform: translate3d(0, -100%, 1px);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 1px);
      opacity: 1;
    }
  }

  @keyframes scale-out {
    0% {
      z-index: -1;
      opacity: 1;
      margin-block-start: 0;
    }

    100% {
      z-index: -1;
      opacity: 0;
      margin-block-start: -50px;
    }
  }
`;
