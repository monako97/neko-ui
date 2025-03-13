import { css } from '@moneko/css';

import type { ButtonProps } from '.';

function btnColor(type: ButtonProps['type']): string {
  let _cls = `.${type}`,
    fillCls = `.${type}.fill`;

  if (type === 'error') {
    _cls = `.${type},.danger`;
    fillCls = `.${type}.fill,.danger.fill`;
  }

  return css`
    ${_cls}:not(.disabled) {
      --btn-border: var(--${type}-border);
      --btn-bg: var(--${type}-selection);
      --btn-hover-bg: var(--btn-bg);
      --btn-hover-color: var(--${type}-hover);
      --btn-active-color: var(--${type}-active);
      --btn-outline-color: var(--${type}-outline);
      --btn-color: var(--${type}-color);
    }
    ${fillCls} {
      --btn-bg: var(--${type}-color);
      --btn-border: var(--${type}-color);
      --btn-hover-bg: var(--${type}-hover);
      --btn-active-bg: var(--${type}-active);
    }
  `;
}

export const style = css`
  .btn,
  .label,
  .icon {
    transition-duration: var(--transition-duration);
  }

  .label {
    display: block;
    line-height: normal;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition-property: color;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    color: inherit;
    transition-property: color;
  }

  .fill {
    &:not(.disabled, .default) {
      .label,
      .icon {
        color: #fff !important;
      }

      &:hover {
        --btn-bg: var(--btn-hover-color) !important;
      }

      &:active {
        --btn-bg: var(--btn-active-color) !important;
      }
    }
  }

  .fill.danger.default {
    .label,
    .icon {
      color: #fff !important;
    }
  }

  .btn {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--btn-border);
    border-radius: var(--border-radius);
    padding: 0 16px;
    inline-size: fit-content;
    min-inline-size: var(--btn-size);
    block-size: fit-content;
    min-block-size: var(--btn-size);
    font-size: var(--font-size);
    color: var(--btn-color);
    background-color: var(--btn-bg);
    outline-offset: 4px;
    gap: 3px;
    line-height: 1;
    cursor: pointer;
    transition-property:
      color, background-color, border-color, width, height, transform, padding, opacity;
    transition-timing-function: linear;
    touch-action: manipulation;
    box-sizing: border-box;
    user-select: none;
    outline: none;

    &:has(.icon) {
      padding: 0 10px;
    }

    &:not(.disabled) {
      &:active {
        transform: scale(0.98);

        .label,
        .icon {
          color: var(--btn-active-color);
        }

        &:not(.link, .flat) {
          border-color: var(--btn-active-color);
        }

        &:not(.link) {
          background-color: var(--btn-hover-bg);
        }
      }

      &:hover:not(.link) {
        background-color: var(--btn-hover-bg);
      }

      &:hover:not(.link, .flat),
      &:focus:not(.link, .flat) {
        border-color: var(--btn-hover-color);
      }

      &:hover .label,
      &:focus .label,
      &:hover .icon,
      &:focus .icon {
        color: var(--btn-hover-color);
      }
    }

    &.loading {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &.disabled {
      --btn-color: var(--disable-color);
      --btn-bg: var(--disable-bg);
      --btn-border: var(--disable-border);

      cursor: not-allowed;
    }
  }

  .normal {
    --btn-size: 32px;
  }

  .small {
    --btn-size: 24px;

    gap: 2px;
    padding: 0 7px;
    font-size: var(--font-size-xs);

    &:has(.icon) {
      padding: 0 5px;
    }
  }

  .large {
    --btn-size: 40px;

    font-size: var(--font-size-lg);
    gap: 4px;

    &:has(.icon) {
      padding: 0 12px;
    }
  }

  .default:not(.disabled) {
    --btn-outline-color: var(--primary-outline);
    --btn-color: var(--text-color);
    --btn-bg: var(--component-bg);
    --btn-border: var(--border-color);
    --btn-hover-color: var(--primary-hover);
    --btn-active-color: var(--primary-active);
  }

  ${btnColor('primary')}
  ${btnColor('error')}
  ${btnColor('success')}
  ${btnColor('warning')}
  

  .dashed {
    border-style: dashed;
  }

  .link {
    --btn-bg: transparent !important;
    --btn-border: transparent !important;

    border-color: transparent !important;
    background-color: transparent !important;

    &::after {
      content: none;
    }
  }

  .flat {
    --btn-border: transparent !important;

    background-color: transparent;

    &:not(.disabled, .link).default {
      --btn-hover-bg: rgb(0 0 0 / 6%);
    }
  }

  .ghost {
    background-color: transparent !important;
  }

  .circle {
    border-radius: 50% !important;
    padding: 0;
    min-inline-size: var(--btn-size);
    max-inline-size: var(--btn-size);
    min-block-size: var(--btn-size);
    max-block-size: var(--btn-size);
    text-align: center;
    line-height: var(--btn-size);
  }

  .block {
    display: flex;
    inline-size: 100%;
  }

  .without:not(.link, .flat)::before {
    animation: btn-wave-effect var(--transition-duration) cubic-bezier(1, 1, 1, 1);
    position: absolute;
    z-index: -1;
    display: block;
    border-radius: inherit;
    opacity: 0.2;
    box-shadow: 0 0 0 0 var(--btn-outline-color);
    inset: 0;
    animation-fill-mode: forwards;
    content: '';
    pointer-events: none;
  }

  @keyframes btn-wave-effect {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 var(--btn-hover-color);
    }

    /* 25% {
      opacity: 1;
      box-shadow: 0 0 0 4px var(--btn-hover-color);
    } */

    100% {
      opacity: 0;
      box-shadow: 0 0 0 6px var(--btn-outline-color);
    }
  }
`;
