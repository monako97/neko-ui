import { css } from '@emotion/css';

export const alphaSliderCss = css`
  border-radius: 10px;
  width: 100%;
  height: 10px;
  background-position: 0 0, 5px 5px;
  background-size: 10px 10px;
  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  cursor: inherit;
  pointer-events: none;
  user-select: none;

  &::after {
    display: block;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    content: '';
    background-image: linear-gradient(to left, var(--offset-color, #fff), transparent);
    cursor: inherit;
  }
`;
export const sliderPickerCss = css`
  position: relative;
  margin-bottom: 4px;
  border-radius: var(--border-radius-base);
  width: 100%;
  height: 10px;
  user-select: none;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: block;
    margin: auto;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    opacity: 1;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 20%), 0 0 1px 2px rgb(0 0 0 / 30%);
    content: '';
    transform: translateX(var(--offset-x, 0));
    cursor: inherit;
    pointer-events: none;
  }

  canvas {
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 100%;
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
  border-radius: var(--border-radius-base);
  width: 200px;
  height: 150px;

  canvas {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: crosshair;
  }

  &::after {
    position: absolute;
    top: var(--offset-y, 1px);
    left: var(--offset-x, 199px);
    display: block;
    border-radius: 50%;
    width: 4px;
    height: 4px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%), 0 0 1px 2px rgb(0 0 0 / 40%);
    transform: translate(-3px, -2px);
    content: '';
    pointer-events: none;
  }
`;
export const settingCss = css`
  display: flex;
  margin-top: 4px;
  width: 100%;
`;
export const stripCss = css`
  flex: 1;
`;
export const previewCss = css`
  margin-left: 4px;
  border-radius: var(--border-radius-base);
  width: 24px;
  background-position: 0 0, 5px 5px;
  background-size: 10px 10px;
  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);

  &::after {
    display: block;
    border-radius: var(--border-radius-base);
    width: 100%;
    height: 100%;
    background: var(--offset-color, #fff);
    opacity: var(--offset-alpha, #fff);
    box-shadow: rgb(0 0 0 / 15%) 0 0 0 1px inset, rgb(0 0 0 / 25%) 0 0 4px inset;
    content: '';
  }
`;
export const formCss = css`
  display: flex;
  margin-top: 8px;
  width: 100%;
`;
export const inputCss = css`
  flex: 1;
  padding-left: 4px;
  text-align: center;

  label {
    display: block;
    padding: 4px;
    font-size: 12px;
    text-align: center;
    color: var(--text-color, rgb(0 0 0 / 85%));
    line-height: 12px;
  }

  input {
    width: calc(100% - 8px);
  }

  &:first-of-type {
    flex: 2;
    padding-left: 0;
  }
`;
