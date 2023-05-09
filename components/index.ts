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
export {
  default as colorScheme,
  generateTheme,
  type ColorScheme,
  type ThemeOption,
} from './color-scheme';
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
export { default as Radio, type RadioProps, type RadioOption } from './radio';
export { default as Checkbox, type CheckboxProps, type CheckboxOption } from './checkbox';
export { default as Segmented, type SegmentedProps, type SegmentedOption } from './segmented';
export { default as Tooltip, type TooltipProps } from './tooltip';
export { default as ColorPalette, type ColorPaletteProps } from './color-palette';
export { default as ColorPicker, type ColorPickerProps } from './color-picker';
export { default as Skeleton } from './skeleton';
export { default as Dropdown, type DropdownProps } from './dropdown';
export { default as Popover, type PopoverProps, type TriggerOption } from './popover';
export { default as Select, type SelectProps } from './select';
export { default as CodeBlock, type CodeBlockProps } from './code-block';
export { default as Photo, type PhotoProps, type ImageData } from './photo';
export { default as Carousel, type CarouselProps } from './carousel';
export { default as Portal, type PortalProps } from './portal';
export { default as Typography, type TypographyProps } from './typography';
export { default as Switch, type SwitchProps } from './switch';
export { default as prefixCls, setPrefixCls } from './prefix-cls';
export { default as highlight } from './highlight';
export { default as Prism } from './prism';
export {
  default as getOptions,
  defaultFieldNames,
  type FieldNames,
  type BaseOption,
} from './get-options';

export type ComponentSize = 'small' | 'normal' | 'large';
