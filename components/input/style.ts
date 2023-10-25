import { css } from '@moneko/css';

export const style = css`
  .label {
    --x: 0;

    position: absolute;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 4px;
    text-overflow: ellipsis;
    color: var(--text-secondary);
    opacity: 0;
    transition:
      transform var(--transition-duration),
      opacity var(--transition-duration),
      color var(--transition-duration),
      background-color var(--transition-duration);
    line-height: 1.45;
    pointer-events: none;
    transform-origin: left;
    max-inline-size: 100%;
    word-break: keep-all;
  }

  .normal {
    padding: 4px 10px;
    font-size: var(--font-size);
    line-height: 1.5;

    .label {
      transform: translate3d(calc(var(--x, 0) - 10px), 0, 1px);
    }
  }

  .large {
    padding: 6px 16px;
    font-size: var(--font-size-lg);
    line-height: 1.5;

    .label {
      transform: translate3d(calc(var(--x, 0) - 16px), 0, 1px);
    }
  }

  .small {
    padding: 2px;
    font-size: var(--font-size-sm);
    line-height: 20px;

    .label {
      transform: translate3d(calc(var(--x, 0) - 2px), 0, 1px);
    }
  }

  .input {
    overflow: hidden;
    border: none;
    font-size: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    inline-size: inherit;
    background: none;
    outline: none;
    appearance: none;
    flex: 1;

    &::placeholder {
      opacity: 0;
      transition:
        color var(--transition-duration),
        opacity var(--transition-duration);
    }

    &:focus::placeholder {
      opacity: 1;
    }

    &:not(:placeholder-shown) + .label,
    &:focus + .label {
      background: var(--component-bg);
      transform: translate3d(0, calc(-50% - 0.43em), 1px) scale(0.8);
    }

    &:focus + .label {
      color: var(--primary-color);
    }

    &:not(:placeholder-shown, :focus) + .label {
      color: var(--text-color);
    }
  }

  .fieldset {
    position: relative;
    display: flex;
    margin: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
    background-color: var(--component-bg);
    transition: all var(--transition-duration);
    inline-size: 100%;
    background-image: none;
    box-sizing: border-box;
    accent-color: var(--primary-color, #5794ff);

    &:hover {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
    }

    &:focus-within {
      border-color: var(--primary-hover, #80b3ff);
      border-inline-end-width: 1px;
      outline: 0;
      box-shadow: 0 0 0 2px var(--primary-outline);
    }

    &:invalid,
    &.error {
      --border-color: var(--error-border);
      --primary-hover: var(--error-hover);
      --primary-outline: var(--error-outline);
      --primary-color: var(--error-color);

      .label {
        --text-color: var(--error-color);
      }
    }

    &.success {
      --border-color: var(--success-border);
      --primary-hover: var(--success-hover);
      --primary-outline: var(--success-outline);
      --primary-color: var(--success-color);

      .label {
        --text-color: var(--success-color);
      }
    }

    &.warning {
      --border-color: var(--warning-border);
      --primary-hover: var(--warning-hover);
      --primary-outline: var(--warning-outline);
      --primary-color: var(--warning-color);

      .label {
        --text-color: var(--warning-color);
      }
    }

    &:disabled {
      --text-color: var(--disable-color);
      --border-color: var(--disable-border);
      --primary-hover: var(--disable-border);

      background-color: var(--disable-bg);
      cursor: not-allowed;

      .input {
        pointer-events: none;

        &:not(:placeholder-shown) + .label {
          background: var(--disable-border);
        }
      }
    }
  }

  .prefix {
    margin-inline-end: 4px;
  }

  .suffix,
  .caps-lock {
    margin-inline-start: 4px;
  }
`;
