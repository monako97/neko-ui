import { css } from '@moneko/css';

export const style = css`
  .label {
    position: absolute;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 4px;
    text-overflow: ellipsis;
    color: var(--text-secondary);
    transition: transform 0.3s;
    line-height: inherit;
    pointer-events: none;
    transform-origin: left;
    transform: translate3d(calc(var(--x, 0) - 14px), 0, 1px);
    max-inline-size: 100%;
    word-break: keep-all;
  }

  .value,
  .placeholder {
    max-inline-size: 100%;
    padding: 0;
    transition: 0.3s opacity;
    pointer-events: none;
    flex: 1;
  }

  .placeholder {
    color: darkgray;
    opacity: 0;
  }

  .prefix,
  .suffix {
    display: flex;
    align-items: center;
  }

  .select {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 4px 10px;
    font-size: var(--font-size);
    color: var(--text-color);
    background-color: var(--component-bg);
    line-height: 1.5;
    min-inline-size: 200px;
    background-image: none;
    box-sizing: border-box;
    accent-color: var(--primary-color);
    gap: 4px;
    min-block-size: 28px;
    cursor: pointer;
    user-select: none;
    transition: border-color 0.3s ease;

    &:not(:has(.label)) {
      & .placeholder {
        opacity: 0.65;
      }
    }

    &:has(.tag) {
      &:not(:has(.prefix)) {
        padding-inline-start: 4px;
      }

      &:not(:has(.suffix)) {
        padding-inline-end: 4px;
      }
    }

    &:hover:not([aria-disabled='true']) {
      border-color: var(--primary-hover);
      border-inline-end-width: 1px;
    }

    &:focus:not([aria-disabled='true']) {
      border-color: var(--primary-hover);
      border-inline-end-width: 1px;
      outline: 0;
      box-shadow: 0 0 0 2px var(--primary-outline);
    }

    &[aria-disabled='true'] {
      border-color: var(--disable-border);
      color: var(--disable-color);
      background-color: var(--disable-bg);
      cursor: not-allowed;
    }

    &:focus .label,
    &:has(.label + .tags > .tag) .label,
    &:has(.label + .tags > .value) .label {
      line-height: 1;
      background: var(--component-bg);
      transform: translate3d(0, calc(-50% - 0.43em), 1px) scale(0.8);

      & + .tags > .placeholder {
        opacity: 0.65;
      }
    }
  }

  .value {
    opacity: 1;
  }

  .tags {
    flex: 1;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .opacity {
    opacity: 0.5;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;
