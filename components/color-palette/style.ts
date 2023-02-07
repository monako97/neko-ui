import { css } from '@emotion/css';

export const alphaSliderCss = css`
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
  cursor: inherit;
  pointer-events: none;
  user-select: none;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to left, var(--offset-color, #fff), transparent);
    border-radius: 10px;
    cursor: inherit;
  }
`;
export const sliderPickerCss = css`
  position: relative;
  width: 100%;
  height: 10px;
  user-select: none;
  margin-bottom: 4px;
  border-radius: var(--border-radius-base);
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: block;
    opacity: 1;
    transform: translateX(var(--offset-x, 0));
    cursor: inherit;
    z-index: 1;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.2),
      0 0 1px 2px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
export const paletteCss = css`
  width: 200px;
  box-sizing: border-box;
  user-select: none;
`;
export const svpanelCss = css`
  position: relative;
  display: block;
  width: 200px;
  height: 150px;
  border-radius: var(--border-radius-base);

  canvas {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  &:hover {
    cursor: crosshair;
  }

  &::after {
    position: absolute;
    top: var(--offset-y, 1px);
    left: var(--offset-x, 199px);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
      0 0 1px 2px rgba(0, 0, 0, 0.4);
    display: block;
    transform: translate(-3px, -2px);
    content: '';
    pointer-events: none;
  }
`;
export const settingCss = css`
  width: 100%;
  margin-top: 4px;
  display: flex;
`;
export const stripCss = css`
  flex: 1;
`;
export const previewCss = css`
  width: 24px;
  margin-left: 4px;
  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
  border-radius: var(--border-radius-base);

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: var(--offset-color, #fff);
    border-radius: var(--border-radius-base);
    opacity: var(--offset-alpha, #fff);
    box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset, rgba(0, 0, 0, 0.25) 0 0 4px inset;
  }
`;
export const formCss = css`
  width: 100%;
  display: flex;
  margin-top: 8px;
`;
export const inputCss = css`
  flex: 1;
  padding-left: 4px;
  text-align: center;

  label {
    text-align: center;
    padding: 4px;
    font-size: 12px;
    color: var(--text-color, rgba(0, 0, 0, 0.85));
    line-height: 12px;
    display: block;
  }

  input {
    width: calc(100% - 8px);
  }

  &:first-of-type {
    flex: 2;
    padding-left: 0;
  }
`;
