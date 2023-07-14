import { type CSSInterpolation, css } from '@moneko/css';
import type { ButtonType } from '.';

function btnColor(type: ButtonType): CSSInterpolation {
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
  .label {
    /* transition-timing-function: var(--transition-timing-function); */
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

  .link {
    --btn-color: var(--primary-color);

    &::after {
      content: none;
    }
  }

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--btn-border);
    border-radius: var(--border-radius);
    padding: 4px 16px;
    inline-size: fit-content;
    min-inline-size: var(--btn-size);
    block-size: fit-content;
    min-block-size: var(--btn-size);
    font-size: var(--font-size);
    color: var(--btn-color);
    background-color: var(--btn-bg);
    outline-offset: 4px;
    line-height: 1;
    cursor: pointer;
    transition-property: color, background-color, border-color, width, height, transform;
    touch-action: manipulation;
    box-sizing: border-box;
    user-select: none;

    &:focus:not(.disabled) {
      border-color: var(--btn-hover-color);
      background-color: var(--btn-bg);
      outline: none;

      .label {
        color: var(--btn-hover-color);
      }
    }

    &:hover:not(.disabled) {
      border-color: var(--btn-hover-color);
      background-color: var(--btn-bg);

      .label {
        color: var(--btn-hover-color);
      }
    }

    &:active:not(.disabled) {
      border-color: var(--btn-active-color);
      background-color: var(--btn-bg);
      transform: scale(0.98);

      .label {
        color: var(--btn-active-color);
      }
    }
  }

  .normal {
    --btn-size: 32px;
  }

  .small {
    --btn-size: 24px;

    padding: 0 7px;
    font-size: var(--font-size-xs);
  }

  .large {
    --btn-size: 40px;

    font-size: var(--font-size-lg);
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
  .fill {
    &:not(.disabled, .default) {
      .label {
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
    .label {
      color: #fff !important;
    }
  }

  .dashed {
    border-style: dashed;
  }

  .flat,
  .link {
    border-color: transparent !important;
    background-color: transparent;
  }

  .ghost,
  .link {
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

  .disabled {
    --btn-color: var(--disable-color);
    --btn-bg: var(--disable-bg);
    --btn-border: var(--disable-border);

    cursor: not-allowed;
  }

  .block {
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
