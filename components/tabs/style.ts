import { css } from '@moneko/css';

export const addCss = css`
  .btn {
    padding: 4px;
    font-size: var(--font-size-lg);
  }
`;

export const btnCss = css`
  .remove {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    color: var(--text-secondary);
    transition: color var(--transition-timing-function) var(--transition-duration);
    margin-inline-start: 8px;

    &:hover {
      color: var(--error-color);
    }
  }

  .btn:has(.remove) {
    padding-inline-end: 10px;
  }
`;

export const style = css`
  :host {
    display: block;
    font-size: var(--font-size);
  }

  [aria-disabled='true'] {
    --primary-color: var(--disable-color);
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    max-inline-size: 100%;

    &::before {
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      content: '';
      display: block;
      inline-size: 100%;
      border-block-end: var(--border-base);
    }
  }

  .centered {
    justify-content: center;
  }

  .tab {
    cursor: pointer;
    position: relative;
  }

  .content {
    padding: 16px 0;
  }

  .slide-in {
    animation: slide-in var(--transition-timing-function) var(--transition-duration);
  }

  .items {
    position: relative;
    display: flex;
    column-gap: 4px;
    max-inline-size: calc(100% - 38px);
    overflow-x: scroll;

    &::after,
    &::before {
      inset-block: 0;
      inline-size: 30px;
      position: absolute;
      z-index: 1;
      opacity: 0;
      transition: opacity var(--transition-duration);
      content: '';
      pointer-events: none;
    }

    &::before {
      inset-inline-start: var(--s, 0);
      box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 8%);
    }

    &::after {
      inset-inline-end: 0;
      transform: translateX(var(--s, 0));
      box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 8%);
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .line {
    &::after {
      position: absolute;
      display: block;
      border-radius: 1px;
      background-color: var(--primary-color);
      content: '';
      inline-size: var(--w);
      inset-inline-start: var(--left);
      block-size: 2px;
      inset-block-end: -0.5px;
      transition-duration: var(--transition-duration);
      transition-timing-function: var(--transition-timing-function);
      transition-property: inline-size, block-size, inset-inline-start, background-color;
    }
  }

  .card {
    gap: 4px;

    .tab {
      display: block;
      border: var(--border-base);
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      background-color: var(--tab-bg);
      transition:
        border-color var(--transition-timing-function) var(--transition-duration),
        background-color var(--transition-timing-function) var(--transition-duration);

      &.active {
        background-color: var(--tab-current-bg);
        border-block-end-color: var(--tab-current-bg);
      }
    }
  }

  .tab.add {
    position: sticky;
    background-color: initial;
    inset-inline-end: 0;
  }

  .warp-left::before {
    opacity: 1;
  }

  .warp-right::after {
    opacity: 1;
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
