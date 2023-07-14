import { css } from '@moneko/css';

export const style = css`
  .palette {
    --alpha-gradient: repeating-conic-gradient(#eee 0 25%, transparent 0 50%) 0 / 10px 10px;

    inline-size: 100%;
    box-sizing: border-box;
    user-select: none;
  }

  .preview,
  .preview::after,
  .color i,
  .color i::before {
    border-radius: var(--border-radius);
  }

  .preview {
    margin-inline-start: 6px;
    inline-size: 46px;
    min-block-size: 26px;
    line-height: 1;
    font-family: sans-serif;
    text-align: center;
    color: #fff;
    cursor: pointer;
    background: var(--alpha-gradient);

    &::after {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      background-color: var(--c);
      box-shadow:
        rgb(0 0 0 / 10%) 0 0 0 1px inset,
        rgb(0 0 0 / 10%) 0 0 4px inset;
      text-shadow: var(--text-shadow);
      content: '';
    }

    &:hover::after {
      font-size: 24px;
      content: '⎘';
    }

    &[data-copy='success']::after {
      font-size: 16px;
      line-height: 26px;
      content: '✓';
    }
  }

  .form {
    display: flex;
    gap: 6px;
  }

  .input {
    flex: 1;
  }

  .picker {
    position: relative;
    border-radius: 4px;
    block-size: 150px;
    background:
      linear-gradient(to top, hsl(0deg 0% 0% / calc(var(--a))), transparent) 0 / 100%,
      linear-gradient(
          to left,
          hsl(calc(var(--h)) 100% 50% / calc(var(--a))),
          hsl(0deg 0% 100% / calc(var(--a)))
        )
        0 / 100%,
      var(--alpha-gradient);
    opacity: 1;
    transition: opacity var(--transition-duration);
    user-select: none;
    cursor: crosshair;

    &:active {
      opacity: 0.99;
    }

    &::after {
      position: absolute;
      inset-block-start: calc((100 - var(--v)) * 1%);
      inset-inline-start: calc(var(--s) * 1%);
      border-radius: 3px;
      inline-size: 6px;
      block-size: 6px;
      pointer-events: none;
      content: '';
      transform: translate(-50%, -50%);
      box-shadow:
        inset 0 0 0 1px #fff,
        0 0 1px rgb(0 0 0 / 20%),
        inset 0 0 2.5px 0 rgb(0 0 0 / 20%);
    }
  }

  .chooser {
    display: flex;
    padding: 8px 0;
  }

  .range {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .hue {
    background-image: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
  }

  .opacity {
    background: linear-gradient(
        to right,
        hsl(calc(var(--h)) 100% 50% / 0%),
        hsl(calc(var(--h)) 100% 50% / 100%)
      ),
      var(--alpha-gradient);
  }

  .slider {
    flex: 1;
    display: block;
    margin: 0;
    border-radius: 5px;
    inline-size: 100%;
    block-size: 10px;
    outline: 0;
    cursor: pointer;
    pointer-events: all;
    appearance: none;

    &::-webkit-slider-runnable-track {
      position: relative;
      display: flex;
      align-items: center;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      position: relative;
      border-radius: 50%;
      inline-size: 10px;
      block-size: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      transition: 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      transform: scale(1.2);
    }

    &::-moz-range-thumb {
      position: relative;
      border: 0;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      transition: 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      inline-size: 10px;
      block-size: 10px;
      transform: scale(1.2);
      box-sizing: border-box;
      pointer-events: none;
    }

    &::-webkit-slider-thumb:active,
    &:focus::-webkit-slider-thumb {
      transform: scale(1.5);
    }

    &::-moz-range-thumb:active,
    &:focus::-moz-range-thumb {
      transform: scale(1.5);
    }
  }

  .color {
    display: flex;
    padding-block-start: 8px;
    gap: 5px 9px;
    flex-wrap: wrap;

    i {
      position: relative;
      border: 0;
      font-size: 28px;
      text-align: center;
      background-color: var(--c, transparent);
      outline: 0;
      cursor: pointer;
      inline-size: 20px;
      block-size: 20px;
      font-style: normal;
      line-height: 17px;

      &::before,
      &::after {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        inline-size: 100%;
        block-size: 100%;
        content: '';
      }

      &::before {
        z-index: -1;
        background: var(--alpha-gradient);
      }

      &.eye-dropper::before {
        content: '⍝';
      }

      &::after {
        border-radius: inherit;
        background-color: var(--c, transparent);
        opacity: 0;
        transition:
          var(--transition-duration) transform var(--transition-timing-function),
          var(--transition-duration) opacity var(--transition-timing-function);
      }

      &:hover::after {
        transform: translate3d(2px, 2px, 0);
        opacity: 0.3;
      }
    }
  }
`;

export const switchCss = css`
  .switch {
    block-size: 25px;
    line-height: 25px;
    float: inline-start;
    border-radius: var(--border-radius);
    cursor: pointer;
    inline-size: 46px;
    font-size: 12px;
    text-align: center;
    color: var(--on-primary-selection);
    background-color: var(--primary-selection);
    text-transform: uppercase;
    outline-color: var(--primary-outline);
    transition-property: background-color, color, outline-color, border-radius, transform;
    transition-timing-function: var(--transition-timing-function);
    transition-duration: var(--transition-duration);

    &:hover {
      color: var(--primary-hover);
    }

    &:active {
      color: var(--primary-active);
      transform: scale(0.98);
    }
  }
`;
