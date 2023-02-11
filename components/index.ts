import { css, injectGlobal } from '@emotion/css';

export {
  default as Markdown,
  getMarkedImgList,
  markdownUtil,
  type PhotoViewDataType,
  type MarkdownProps,
  type CodeToolType,
  type AnchorType,
} from './markdown';

export { default as BackTop, type BackTopProps } from './back-top';

export {
  default as HighlightText,
  strToHighlight,
  RegExp_HighLight,
  type HighlightFlag,
  type Highlight,
  type HighlightTextProps,
  type HighlightTextJson,
} from './highlight-text';

export { default as useTheme, type ThemeTypes } from './use-theme';

export { default as Avatar, type AvatarProps } from './avatar';

export { default as AvatarGroup } from './avatar-group';
export type { AvatarGroupProps } from './avatar-group';

export {
  default as CaptureScreen,
  type CaptureScreenProp,
  type RecorderOptions,
} from './capture-screen';

export { default as WaveCircle, type WaveCircleProps } from './wave-circle';

export { default as Button, type ButtonProps, type ButtonType } from './button';

export { default as Input, type InputProps } from './input';

export { default as InputNumber, type InputNumberProps } from './input-number';

export { default as Tooltip, type TooltipProps, type TooltipTriggerOption } from './tooltip';

export { default as ColorPalette, type ColorPaletteProps } from './color-palette';

export { default as ColorPicker, type ColorPickerProps } from './color-picker';

export { default as Skeleton } from './skeleton';

export { default as CodeBlock, type CodeBlockProps } from './code-block';

export type ComponentSize = 'small' | 'normal' | 'large';

const defaultTheme = css`
  :root {
    --primary-color-deprecated-bg: #f0f8ff;
    --primary-color-deprecated-border: #d1e7ff;
    --primary-color-hover: #80b3ff;
    --primary-color: #5794ff;
    --primary-color-active: #3f72d9;
    --primary-color-outline: rgb(87 148 255 / 20%);
    --warning-color-deprecated-bg: #fffbe6;
    --warning-color-deprecated-border: #ffe58f;
    --warning-color-hover: #ffc53d;
    --warning-color: #faad14;
    --warning-color-active: #d48806;
    --warning-color-outline: rgb(250 173 20 / 20%);
    --error-color-deprecated-bg: #fff2f0;
    --error-color-deprecated-border: #ffccc7;
    --error-color-hover: #ff7875;
    --error-color: #ff4d4f;
    --error-color-active: #d9363e;
    --error-color-outline: rgb(255 77 79 / 20%);
    --success-color-deprecated-bg: #f6ffed;
    --success-color-deprecated-border: #b7eb8f;
    --success-color-hover: #73d13d;
    --success-color: #52c41a;
    --success-color-active: #389e0d;
    --success-color-outline: rgb(82 196 26 / 20%);
  }

  :root[data-theme='dark'] {
    --primary-color-deprecated-bg: #00408f;
    --primary-color-deprecated-border: #177ddb;
    --primary-color-hover: #177cdb;
    --primary-color: #177ddc;
    --primary-color-active: #3c9ae6;
    --primary-color-outline: rgb(23 125 220 / 20%);
    --warning-color-deprecated-bg: #8c5400;
    --warning-color-deprecated-border: #d79614;
    --warning-color-hover: #d79514;
    --warning-color: #d89614;
    --warning-color-active: #e4b139;
    --warning-color-outline: rgb(216 150 20 / 20%);
    --error-color-deprecated-bg: #590610;
    --error-color-deprecated-border: #a61d24;
    --error-color-hover: #a51d24;
    --error-color: #a61d24;
    --error-color-active: #b23b3d;
    --error-color-outline: rgb(166 29 36 / 20%);
    --success-color-deprecated-bg: #1d5e05;
    --success-color-deprecated-border: #49aa19;
    --success-color-hover: #49a919;
    --success-color: #49aa19;
    --success-color-active: #66b739;
    --success-color-outline: rgb(73 170 25 / 20%);
  }
`;

injectGlobal([defaultTheme]);
