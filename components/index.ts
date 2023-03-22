import { injectGlobal } from '@emotion/css';
import { getColorVariableString } from '@moneko/common';

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

export { default as colorScheme, type ColorSchema } from './color-scheme';

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

export type ComponentSize = 'small' | 'normal' | 'large';

export { default as prefixCls, setPrefixCls } from './prefix-cls';

export { default as highlight } from './highlight';

export { default as Prism } from './prism';

injectGlobal([
  `:root {
    ${getColorVariableString('#5794ff', { name: 'primary' })}
    ${getColorVariableString('#faad14', { name: 'warning' })}
    ${getColorVariableString('#ff4d4f', { name: 'error' })}
    ${getColorVariableString('#52c41a', { name: 'success' })}
  }

  :root[data-theme='dark'] {
    ${getColorVariableString('#4d81dc', { name: 'primary', theme: 'dark' })}
    ${getColorVariableString('#bb8314', { name: 'warning', theme: 'dark' })}
    ${getColorVariableString('#901c22', { name: 'error', theme: 'dark' })}
    ${getColorVariableString('#419418', { name: 'success', theme: 'dark' })}
  }`,
]);
