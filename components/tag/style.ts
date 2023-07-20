import { css } from '@moneko/css';

export const style = css`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 0 8px;
    font-size: var(--font-size-sm);
    color: var(--text-color);
    background-color: var(--component-bg);
    gap: 5px;
    line-height: 20px;

    a {
      text-decoration: unset;
      color: inherit;
    }
  }

  .icon {
    font-size: var(--font-size-sm);
    line-height: var(--font-size-sm);
  }

  .bordered {
    border: 1px solid var(--border-color);
  }

  .close {
    font-size: var(--font-size-sm);
    cursor: pointer;
    opacity: 0.5;
    transition: var(--transition-duration) var(--transition-timing-function) opacity;
    user-select: none;

    &:hover {
      opacity: 1;
    }
  }

  ${['primary', 'success', 'error', 'warning', 'tag-custom']
    .map(
      (s) =>
        `.${s} {--text-color: var(--${s}-color);--border-color: var(--${s}-secondary-bg);--component-bg: var(--${s}-details-bg);}`,
    )
    .join('')}

  .disabled {
    --text-color: var(--disable-color);
    --border-color: var(--disable-border);
    --component-bg: var(--disable-bg);
  }
`;
