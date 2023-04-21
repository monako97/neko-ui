import { getColorVariableString } from '@moneko/common';
import { injectGlobal } from './emotion';

export * from './emotion';
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
export { default as Tree, type TreeProps, type TreeBaseProp, type TreeData } from './tree';
export { default as fromSchema } from './from-schema';
export {
  default as HighlightText,
  strToHighlight,
  RegExp_HighLight,
  type HighlightFlag,
  type Highlight,
  type HighlightTextProps,
  type HighlightTextJson,
} from './highlight-text';

export { default as colorScheme, type ColorScheme } from './color-scheme';

export { default as Avatar, type AvatarProps } from './avatar';

export { default as AvatarGroup, type AvatarGroupProps } from './avatar-group';

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

export { default as Photo, type PhotoProps, type ImageData } from './photo';

export { default as Carousel, type CarouselProps } from './carousel';

export type ComponentSize = 'small' | 'normal' | 'large';

export { default as Portal, type PortalProps } from './portal';

export { default as prefixCls, setPrefixCls } from './prefix-cls';

export { default as highlight } from './highlight';

export { default as Prism } from './prism';

injectGlobal`
  :root {
    --font-size: 14px;
    --font-size-sm: 12px;
    --font-size-xs: 10px;
    --font-size-lg: 16px;
    --border-base: 1px solid var(--border-color);
    --border-color: rgb(5 5 5 / 6%);
    --border-radius: 8px;
    --component-background: rgb(255 255 255 / 80%);
    --text-color: rgb(0 0 0 / 65%);
    --text-secondary: #4e4e4e;
    --text-heading: #1b1b1b;
    --text-selection-bg: var(--primary-bg);
    --text-shadow-color: rgb(0 0 0 / 10%);
    --box-shadow-base: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    --font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue',
      'Arial', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji', 'Helvetica', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans';
    --transition-duration: 0.3s;
    --transition-timing-function: cubic-bezier(0.94, -0.1, 0.1, 1.2);
    ${getColorVariableString('#5794ff', { name: 'primary' })}
    ${getColorVariableString('#faad14', { name: 'warning' })}
    ${getColorVariableString('#ff4d4f', { name: 'error' })}
    ${getColorVariableString('#52c41a', { name: 'success' })}
  }

  :root[data-theme='dark'] {
    --text-color: #ffffffd9;
    --text-secondary: #cdcdcd;
    --text-heading: rgb(255 255 255 / 85%);
    --text-shadow-color: rgb(255 255 255 / 10%);
    --body-background: #000;
    --component-background: rgb(20 20 20 / 80%);
    --header-bg: rgb(20 20 20 / 90%);
    --border-color: #303030;
    ${getColorVariableString('#4d81dc', { name: 'primary', theme: 'dark' })}
    ${getColorVariableString('#bb8314', { name: 'warning', theme: 'dark' })}
    ${getColorVariableString('#901c22', { name: 'error', theme: 'dark' })}
    ${getColorVariableString('#419418', { name: 'success', theme: 'dark' })}
  }
`;
