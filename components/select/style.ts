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

  .tag {
    display: flex;
    align-items: center;
    border: 1px solid var(--primary-border);
    border-radius: calc(var(--border-radius) / 1.5);
    padding: 0 8px;
    font-size: 12px;
    background-color: var(--primary-outline);
    line-height: 20px;
    pointer-events: none;
    transition: 0.3s opacity;
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

      .tag {
        border-color: var(--disable-border);
        color: var(--disable-color);
        background-color: var(--disable-bg);
      }
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

  .del {
    cursor: pointer;
    pointer-events: all;

    &::before {
      font-size: 12px;
      opacity: 0.5;
      content: '⛌';
      margin-inline-start: 5px;
    }

    &:hover {
      color: var(--error-color);
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

    &:hover {
      opacity: 1;
    }
  }

  .danger {
    --primary-border: var(--error-border);
    --primary-outline: var(--error-outline);

    color: var(--error-color);
  }
`;
