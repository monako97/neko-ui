export * from '@moneko/css';
export { default as Prism } from './prism';
export {
  default as getOptions,
  defaultFieldNames,
  type FieldNames,
  type BaseOption,
} from './get-options';
export { default as Avatar, type AvatarElement, type AvatarProps } from './avatar';
export {
  default as AvatarGroup,
  type AvatarGroupElement,
  type AvatarGroupProps,
} from './avatar-group';
export { default as Md, type MdElement, type MdProps } from './md';
export { default as Code, type CodeProps, type CodeElement } from './code';
export { default as Img, type ImgProps, type ImgElement } from './img';
export { default as Carousel, type CarouselProps } from './carousel';
export { default as Spin, type SpinProps } from './spin';
export { default as Switch, type SwitchProps } from './switch';
export { default as Skeleton, type SkeletonProps } from './skeleton';
export { default as HighlightText, type HighlightTextProps } from './highlight-text';
export { default as Segmented, type SegmentedProps } from './segmented';
export { default as Typography, type TypographyProps } from './typography';
export { default as Tree, type TreeProps } from './tree';
export { default as Radio, type RadioProps } from './radio';
export { default as Checkbox, type CheckboxProps } from './checkbox';
export { default as BackTop, type BackTopProps, type BackTopElement } from './back-top';
export { default as Input, type InputProps, type InputElement } from './input';
export {
  default as InputNumber,
  type InputNumberProps,
  type InputNumberElement,
} from './input-number';
export { default as Popover, type PopoverProps } from './popover';
export {
  default as Dropdown,
  type DropdownSingleElement,
  type DropdownMultipleElement,
} from './dropdown';
export { default as Select, type SelectSingleElement, type SelectMultipleElement } from './select';
export {
  default as ColorPalette,
  type ColorPaletteProps,
  type ColorPaletteElement,
} from './color-palette';
export {
  default as ColorPicker,
  type ColorPickerProps,
  type ColorPickerElement,
} from './color-picker';
export { default as Empty, type EmptyProps, type EmptyElement } from './empty';
export {
  theme,
  setTheme,
  generateTheme,
  baseStyle,
  type ThemeOption,
  type ColorScheme,
} from './theme';

import type { ICustomElement } from 'component-register';
export type ComponentSize = 'small' | 'normal' | 'large';
export type ComponentStatus = 'normal' | 'success' | 'warning' | 'error' | 'info';
import type { PropertiesHyphen } from 'csstype';

export interface CSSProperties extends PropertiesHyphen {
  // Override
  [key: `-${string}`]: string | number | undefined;
}
export interface BaseElementTags {
  div: HTMLDivElement;
}
export interface ComponentOptions<T> {
  element: T & ICustomElement;
}
