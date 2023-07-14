import { css } from '@moneko/css';

export const imgCss = css`
  .img {
    max-inline-size: 100%;
    max-block-size: 100%;
    object-fit: contain;
    transition: opacity 0.3s;
  }

  .none {
    pointer-events: none;
    opacity: 0.25;
  }
`;
export const style = css`
  .close {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    z-index: 1;
    color: #fff;
    transition: transform var(--transition-duration);
    cursor: pointer;
    transform: scale(0);

    &::before {
      padding: 0 16px;
      font-size: 24px;
      content: '⛌';
      line-height: 46px;
    }
  }

  .portal {
    position: fixed;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      position: absolute;
      z-index: -1;
      background: var(--img) center/cover no-repeat;
      content: '';
      inline-size: 100%;
      block-size: 100%;
      pointer-events: none;
      opacity: 0.5;
    }

    &::after {
      position: absolute;
      z-index: -1;
      content: '';
      inline-size: 100%;
      block-size: 100%;
      pointer-events: none;
      backdrop-filter: blur(50px);
      /* stylelint-disable-next-line */
      -webkit-backdrop-filter: blur(50px);
    }

    &:hover {
      .close {
        transform: scale(1);
      }
    }
  }

  .open {
    animation: photo-in var(--transition-duration) forwards;
  }

  .closeing {
    animation: photo-out var(--transition-duration) forwards;
  }

  @keyframes photo-in {
    0% {
      pointer-events: none;
    }

    100% {
      inline-size: 100vi;
      block-size: 100vb;
      inset-block-start: 0;
      inset-inline-start: 0;
    }
  }

  @keyframes photo-out {
    from {
      inline-size: 100vi;
      block-size: 100vb;
      inset-block-start: 0;
      inset-inline-start: 0;
    }

    to {
      pointer-events: none;
    }
  }
`;
