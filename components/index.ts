export * from '@moneko/css';
export { default as Prism } from './prism';
export { default as getOptions, type FieldNames, type BaseOption } from './get-options';
export { default as Button, type ButtonType, type ButtonElement } from './button';
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
  type TreeSingleElement,
  type TreeSingleSchemaElement,
  type TreeSingleStringElement,
  type TreeMultipleElement,
  type TreeMultipleSchemaElement,
  type TreeMultipleStringElement,
} from './tree';
export { default as Radio, type RadioProps, type RadioElement } from './radio';
export { default as Checkbox, type CheckboxProps, type CheckboxElement } from './checkbox';
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
  default as CaptureScreen,
  type CaptureScreenProps,
  type CaptureScreenElement,
} from './capture-screen';
export { default as Tabs, type TabsProps, type TabsElement, type TabOption } from './tabs';
export {
  theme,
  setTheme,
  generateTheme,
  baseStyle,
  toneColor,
  type ThemeOption,
  type ColorScheme,
} from './theme';
export type ComponentSize = 'small' | 'normal' | 'large';
export type ComponentStatus = 'normal' | 'success' | 'warning' | 'error' | 'info';
import type { ICustomElement } from 'component-register';
import type { PropertiesHyphen } from 'csstype';
import type {
  AvatarElement,
  AvatarGroupElement,
  BackTopElement,
  ButtonElement,
  CaptureScreenElement,
  CarouselElement,
  CheckboxElement,
  CodeElement,
  ColorPaletteElement,
  ColorPickerElement,
  DropdownMultipleElement,
  DropdownSingleElement,
  EmptyElement,
  HighlightTextElement,
  ImgElement,
  InputElement,
  InputNumberElement,
  MdElement,
  PopoverElement,
  RadioElement,
  SegmentedElement,
  SelectMultipleElement,
  SelectSingleElement,
  SkeletonElement,
  SpinElement,
  SwitchElement,
  TreeMultipleElement,
  TreeSingleElement,
  TypographyElement,
} from 'neko-ui';

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
// eslint-disable-next-line no-unused-vars
type IEvent<T> = (e: CustomEvent<T>) => void;
// eslint-disable-next-line no-unused-vars
type ICustomEvent<T, K extends keyof T> = T extends { [key in K]?: (v: infer V) => void }
  ? IEvent<V>
  : // eslint-disable-next-line no-unused-vars
  T extends { [key in K]?: (...args: infer Args) => void }
  ? IEvent<Args>
  : never;

type IOmit<T, Keys extends keyof T> = Omit<T, Keys> & {
  [K in Keys]?: ICustomEvent<T, K>;
};

export type CustomElement<T extends Partial<ICustomElement> = ICustomElement> = IOmit<
  T,
  | 'onChange'
  | 'onOpenChange'
  | 'onErrorRecorder'
  | 'onStopRecorder'
  | 'onStartRecorder'
  | 'onRecorderDataAvailable'
  | 'onErrorCapture'
  | 'onStopCapture'
  | 'onStartCapture'
  | 'onSaveRecorder'
> & {
  ref?: CustomElement<T> | { current: CustomElement<T> | null };
};

interface CustomElementTags {
  'n-avatar': AvatarElement;
  'n-avatar-group': AvatarGroupElement;
  'n-back-top': BackTopElement;
  'n-button': ButtonElement;
  'n-capture-screen': CaptureScreenElement;
  'n-carousel': CarouselElement;
  'n-checkbox': CheckboxElement;
  'n-code': CodeElement;
  'n-color-palette': ColorPaletteElement;
  'n-color-picker': ColorPickerElement;
  'n-dropdown': DropdownSingleElement | DropdownMultipleElement;
  'n-empty': EmptyElement;
  'n-highlight-text': HighlightTextElement;
  'n-img': ImgElement;
  'n-input': InputElement;
  'n-input-number': InputNumberElement;
  'n-md': MdElement;
  'n-popover': PopoverElement;
  'n-radio': RadioElement;
  'n-segmented': SegmentedElement;
  'n-select': SelectSingleElement | SelectMultipleElement;
  'n-skeleton': SkeletonElement;
  'n-spin': SpinElement;
  'n-switch': SwitchElement;
  'n-tree': TreeSingleElement | TreeMultipleElement;
  'n-typography': TypographyElement;
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
