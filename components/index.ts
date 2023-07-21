export * from '@moneko/css';
export { default as Prism } from './prism';
export { default as getOptions } from './get-options';
export { default as Button, type ButtonProps, type ButtonElement } from './button';
export { default as Avatar, type AvatarElement, type AvatarProps } from './avatar';
export {
  default as AvatarGroup,
  type AvatarGroupElement,
  type AvatarGroupProps,
} from './avatar-group';
export { default as Md, type MdElement, type MdProps } from './md';
export { default as Code, type CodeProps, type CodeElement } from './code';
export { default as Img, type ImgProps, type ImgElement } from './img';
export { default as Carousel, type CarouselProps, type CarouselElement } from './carousel';
export { default as Spin, type SpinProps, type SpinElement } from './spin';
export { default as Switch, type SwitchProps, type SwitchElement } from './switch';
export { default as Skeleton, type SkeletonProps, type SkeletonElement } from './skeleton';
export {
  default as HighlightText,
  type HighlightTextProps,
  type HighlightTextElement,
} from './highlight-text';
export { default as Segmented, type SegmentedProps, type SegmentedElement } from './segmented';
export { default as Typography, type TypographyProps, type TypographyElement } from './typography';
export {
  default as Tree,
  type TreeProps,
  type TreeElement,
  type TreeSchemaElement,
  type TreeStringElement,
  type TreeMultipleElement,
  type TreeMultipleSchemaElement,
  type TreeMultipleStringElement,
} from './tree';
export { default as Radio, type RadioProps, type RadioElement } from './radio';
export {
  default as Checkbox,
  type CheckboxGroupProps,
  type CheckboxBoolProps,
  type CheckboxBoolElement,
  type CheckboxGroupElement,
} from './checkbox';
export { default as BackTop, type BackTopProps, type BackTopElement } from './back-top';
export { default as Input, type InputProps, type InputElement } from './input';
export {
  default as InputNumber,
  type InputNumberProps,
  type InputNumberElement,
} from './input-number';
export { default as Popover, type PopoverProps, type PopoverElement } from './popover';
export {
  default as Dropdown,
  type DropdownElement,
  type DropdownMultipleElement,
} from './dropdown';
export { default as Select, type SelectElement, type SelectMultipleElement } from './select';
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
  default as CaptureScreen,
  type CaptureScreenProps,
  type CaptureScreenElement,
} from './capture-screen';
export { default as Tabs, type TabsProps, type TabsElement, type TabOption } from './tabs';
export { default as Tag, type TagProps, type TagElement } from './tag';
export {
  default as Menu,
  type MenuProps,
  type MenuMultipleProps,
  type MenuElement,
  type MenuMultipleElement,
  type MenuOption,
} from './menu';
export { default as Cron, type CronProps, type CronElement } from './cron';
export {
  theme,
  setTheme,
  generateTheme,
  baseStyle,
  toneColor,
  type ThemeOption,
  ColorScheme,
} from './theme';
export {
  FieldName,
  Size,
  Status,
  type BasicConfig,
  type BaseOption,
  type CustomElement,
} from './basic-config';
import type { ICustomElement } from 'component-register';
import type {
  AvatarElement,
  AvatarGroupElement,
  BackTopElement,
  ButtonElement,
  CaptureScreenElement,
  CarouselElement,
  CheckboxBoolElement,
  CheckboxGroupElement,
  CodeElement,
  ColorPaletteElement,
  ColorPickerElement,
  CronElement,
  DropdownElement,
  DropdownMultipleElement,
  EmptyElement,
  HighlightTextElement,
  ImgElement,
  InputElement,
  InputNumberElement,
  MdElement,
  MenuElement,
  MenuMultipleElement,
  PopoverElement,
  RadioElement,
  SegmentedElement,
  SelectElement,
  SelectMultipleElement,
  SkeletonElement,
  SpinElement,
  SwitchElement,
  TabsElement,
  TagElement,
  TreeElement,
  TreeMultipleElement,
  TreeMultipleSchemaElement,
  TreeMultipleStringElement,
  TreeSchemaElement,
  TreeStringElement,
  TypographyElement,
} from 'neko-ui';

export interface ComponentOptions<T> {
  element: T & ICustomElement;
}

interface CustomElementTags {
  'n-avatar': AvatarElement;
  'n-avatar-group': AvatarGroupElement;
  'n-back-top': BackTopElement;
  'n-button': ButtonElement;
  'n-capture-screen': CaptureScreenElement;
  'n-carousel': CarouselElement;
  'n-checkbox': CheckboxBoolElement | CheckboxGroupElement;
  'n-code': CodeElement;
  'n-color-palette': ColorPaletteElement;
  'n-color-picker': ColorPickerElement;
  'n-dropdown': DropdownElement | DropdownMultipleElement;
  'n-empty': EmptyElement;
  'n-highlight-text': HighlightTextElement;
  'n-img': ImgElement;
  'n-input': InputElement;
  'n-input-number': InputNumberElement;
  'n-md': MdElement;
  'n-popover': PopoverElement;
  'n-radio': RadioElement;
  'n-segmented': SegmentedElement;
  'n-select': SelectElement | SelectMultipleElement;
  'n-skeleton': SkeletonElement;
  'n-spin': SpinElement;
  'n-switch': SwitchElement;
  'n-tree':
    | TreeElement
    | TreeStringElement
    | TreeSchemaElement
    | TreeMultipleElement
    | TreeMultipleStringElement
    | TreeMultipleSchemaElement;
  'n-typography': TypographyElement;
  'n-tabs': TabsElement;
  'n-tag': TagElement;
  'n-menu': MenuElement | MenuMultipleElement;
  'n-cron': CronElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}
