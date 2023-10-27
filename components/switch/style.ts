import { css } from '@moneko/css';

export const style = css`
  .switch {
    position: relative;
    display: inline-block;
    border-radius: 12px;
    padding: 2px;
    font-size: 12px;
    background-color: var(--primary-border);
    opacity: 1;
    outline: 0;
    box-shadow:
      inset 0 0 0 0 var(--primary-color),
      0 0 0 0 var(--primary-hover),
      0 0 0 0 var(--primary-border);
    transition:
      0.4s box-shadow,
      var(--transition-duration) background-color,
      var(--transition-duration) opacity;
    cursor: pointer;
    inline-size: fit-content;
    min-inline-size: 44px;
    block-size: 22px;
    line-height: 18px;
    user-select: none;
    box-sizing: border-box;

    &::before {
      color: var(--primary-secondary);
      padding-inline: 20px 8px;
      transition-duration: var(--transition-duration);
      transition-property: color, padding, background-color;
      content: attr(text-off) '';
    }

    &::after {
      position: absolute;
      margin: auto;
      border: 1.5px solid #fff;
      border-radius: 12px;
      background-color: #fff;
      outline: 2.05px solid #fff;
      box-shadow: 0 2px 4px 1px var(--primary-shadow);
      transition:
        0.6s transform ease,
        var(--transition-duration) padding ease,
        var(--transition-duration) inset-inline-start ease,
        var(--transition-duration) background-color 0.1s,
        var(--transition-duration) border-color;
      outline-offset: -0.05px;
      inset-block: 3px 3px;
      block-size: 14px;
      min-inline-size: 14px;
      content: '';
      inset-inline-start: 4px;
      box-sizing: border-box;
    }

    &:not([aria-disabled]),
    &[aria-disabled='false'] {
      &:not(.loading) {
        &:focus {
          box-shadow:
            inset 0 0 0 0 var(--primary-color),
            0 0 0 1px var(--primary-hover),
            0 0 1px 3px var(--primary-border);

          &.checked {
            box-shadow:
              inset 0 0 3px 12px var(--primary-color),
              0 0 0 1px var(--primary-hover),
              0 0 1px 3px var(--primary-border);
          }
        }

        &:hover {
          background-color: var(--primary-secondary-bg);
        }

        &:active {
          &::after {
            padding-inline: 10px;
            background-color: var(--primary-hover);
          }

          &.checked {
            &::after {
              transform: translateX(-10px);
            }
          }
        }
      }
    }

    &.loading,
    &[aria-disabled]:not([aria-disabled='false']) {
      color: var(--disable-color);
      background-color: var(--disable-bg);
      opacity: 0.8;
      cursor: not-allowed;
    }
  }

  .checked {
    box-shadow:
      inset 0 0 3px 12px var(--primary-color),
      0 0 0 0 var(--primary-hover),
      0 0 0 0 var(--primary-border);

    &::before {
      color: #fff;
      padding-inline: 8px 20px;
      content: attr(text-on) '';
    }

    &::after {
      inset-inline-start: calc(100% - 18px);
    }
  }

  .loading {
    &::after {
      border-block-start-color: var(--primary-color);
      border-block-end-color: var(--primary-color);
      animation: switch-loading 1.5s infinite linear;
    }
  }

  @keyframes switch-loading {
    form {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
