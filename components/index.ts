'use client';

export { default as Avatar, type AvatarElement, type AvatarProps } from './avatar';
export {
  default as AvatarGroup,
  type AvatarGroupElement,
  type AvatarGroupProps,
} from './avatar/group';
export { default as BackTop, type BackTopElement, type BackTopProps } from './back-top';
export { type BaseOption, type BasicConfig, FieldName, Size, Status } from './basic-config';
export { default as Button, type ButtonElement, type ButtonProps } from './button';
export {
  default as CaptureScreen,
  type CaptureScreenElement,
  type CaptureScreenProps,
} from './capture-screen';
export { default as Carousel, type CarouselElement, type CarouselProps } from './carousel';
export {
  default as Checkbox,
  type CheckboxBoolElement,
  type CheckboxBoolProps,
  type CheckboxGroupElement,
  type CheckboxGroupProps,
} from './checkbox';
export { default as Code, type CodeElement, type CodeProps, type Language } from './code';
export {
  default as ColorPalette,
  type ColorPaletteElement,
  type ColorPaletteProps,
} from './color-palette';
export {
  default as ColorPicker,
  type ColorPickerElement,
  type ColorPickerProps,
} from './color-picker';
export { default as Cron, type CronElement, type CronProps } from './cron';
export { default as DatePicker, type DatePickerElement, type DatePickerProps } from './date-picker';
export { default as dayjs } from './date-picker/dayjs';
export {
  default as Dropdown,
  type DropdownElement,
  type DropdownMultipleElement,
  type DropdownMultipleProps,
  type DropdownProps,
} from './dropdown';
export { default as Empty, type EmptyElement, type EmptyProps } from './empty';
export { default as fromSchema } from './from-schema';
export { default as getOptions } from './get-options';
export {
  default as HighlightText,
  type HighlightTextElement,
  type HighlightTextProps,
} from './highlight-text';
export { default as icon, type IconAttribute } from './icon';
export { default as Img, type ImgElement, type ImgProps } from './img';
export { default as Input, type InputElement, type InputProps } from './input';
export {
  default as InputNumber,
  type InputNumberElement,
  type InputNumberProps,
} from './input-number';
export { default as Md, type MdElement, type MdProps } from './md';
export { default as mdStyle } from './md-style';
export {
  default as Menu,
  type MenuElement,
  type MenuMultipleElement,
  type MenuMultipleProps,
  type MenuOption,
  type MenuProps,
} from './menu';
export {
  default as Modal,
  type ModalElement,
  type ModalProps,
  OpenState,
  type OpenStateKey,
} from './modal';
export {
  default as notification,
  type NotificationProps,
  type NotificationType,
} from './notification';
export { default as Pagination, type PaginationElement, type PaginationProps } from './pagination';
export { default as Popover, type PopoverElement, type PopoverProps } from './popover';
export { default as Prism } from './prism';
export { default as Provider, type ProviderElement, type ProviderProps } from './provider';
export { type IntRange, default as QrCode, type QrCodeElement, type QrCodeProps } from './qrcode';
export { default as Radio, type RadioElement, type RadioOption, type RadioProps } from './radio';
export { default as Segmented, type SegmentedElement, type SegmentedProps } from './segmented';
export {
  default as Select,
  type SelectElement,
  type SelectMultipleElement,
  type SelectMultipleProps,
  type SelectProps,
} from './select';
export { default as Skeleton, type SkeletonElement, type SkeletonProps } from './skeleton';
export { default as Spin, type SpinElement, type SpinProps } from './spin';
export { default as Switch, type SwitchElement, type SwitchProps } from './switch';
export { default as Table, type TableElement, type TableProps } from './table';
export { type TabOption, default as Tabs, type TabsElement, type TabsProps } from './tabs';
export { default as Tag, type TagElement, type TagProps } from './tag';
export {
  type ColorScheme,
  generateColor,
  default as theme,
  type ThemeOption,
  toneColor,
} from './theme';
export {
  default as Tree,
  type TreeData,
  type TreeElement,
  type TreeMultipleElement,
  type TreeMultipleProps,
  type TreeMultipleSchemaElement,
  type TreeMultipleSchemaProps,
  type TreeMultipleStringElement,
  type TreeMultipleStringProps,
  type TreeProps,
  type TreeSchemaElement,
  type TreeSchemaProps,
  type TreeStringElement,
  type TreeStringProps,
} from './tree';
export { default as Typography, type TypographyElement, type TypographyProps } from './typography';
export type { CustomElement } from 'custom-element-type';
export { customElement, getCurrentElement, hot, noShadowDOM, withSolid } from 'solid-element';
import type { ICustomElement, Transform } from 'custom-element-type';

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
  DatePickerElement,
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
  ModalElement,
  PaginationElement,
  PopoverElement,
  ProviderElement,
  QrCodeElement,
  RadioElement,
  SegmentedElement,
  SelectElement,
  SelectMultipleElement,
  SkeletonElement,
  SpinElement,
  SwitchElement,
  TableElement,
  TabsElement,
  TagElement,
  TreeElement,
  TreeMultipleElement,
  TreeMultipleSchemaElement,
  TreeMultipleStringElement,
  TreeSchemaElement,
  TreeStringElement,
  TypographyElement,
} from '.';

/** 组件列表
 * @author monako97
 * @ignore optional
 */
interface CustomElementTags {
  /** 头像 */
  'n-avatar': AvatarElement;
  /** 头像组 */
  'n-avatar-group': AvatarGroupElement;
  /** 返回顶部 */
  'n-back-top': BackTopElement;
  /** 按钮 */
  'n-button': ButtonElement;
  /** 捕获屏幕 */
  'n-capture-screen': CaptureScreenElement;
  /** 走马灯、轮播 */
  'n-carousel': CarouselElement;
  /** 复选框 */
  'n-checkbox': CheckboxBoolElement | CheckboxGroupElement;
  /** 代码框 */
  'n-code': CodeElement;
  /** 取色器 */
  'n-color-palette': ColorPaletteElement;
  /** 取色器(弹出类型) */
  'n-color-picker': ColorPickerElement;
  /** 下拉面板 */
  'n-dropdown': DropdownElement | DropdownMultipleElement;
  /** 空面板 */
  'n-empty': EmptyElement;
  /** 匹配高亮文字 */
  'n-highlight-text': HighlightTextElement;
  /** 图片查看器 */
  'n-img': ImgElement;
  /** 输入框 */
  'n-input': InputElement;
  /** 数字输入框 */
  'n-input-number': InputNumberElement;
  /** Markdown渲染 */
  'n-md': MdElement;
  /** 弹出气泡面板 */
  'n-popover': PopoverElement;
  /** 单选项 */
  'n-radio': RadioElement;
  /** 分段控制器 */
  'n-segmented': SegmentedElement;
  /** 下拉选择框 */
  'n-select': SelectElement | SelectMultipleElement;
  /** 骨架屏 */
  'n-skeleton': SkeletonElement;
  /** 加载中 */
  'n-spin': SpinElement;
  /** 开关 */
  'n-switch': SwitchElement;
  /** 树形渲染 */
  'n-tree':
    | TreeElement
    | TreeStringElement
    | TreeSchemaElement
    | TreeMultipleElement
    | TreeMultipleStringElement
    | TreeMultipleSchemaElement;
  /** 文字排版 */
  'n-typography': TypographyElement;
  /** 标签页 */
  'n-tabs': TabsElement;
  /** 标签 */
  'n-tag': TagElement;
  /** 导航菜单 */
  'n-menu': MenuElement | MenuMultipleElement;
  /** Cron表达式编辑器 */
  'n-cron': CronElement;
  /** 日期选择器
   * @since 2.1.0
   */
  'n-data-picker': DatePickerElement;
  /** 数据表格
   * @since 2.2.0
   */
  'n-table': TableElement;
  /** 分页器
   * @since 2.2.0
   */
  'n-pagination': PaginationElement;
  /** 响应内部变化
   * @since 2.3.0
   */
  'n-provider': ProviderElement;
  /** 模态框
   * @since 2.6.0
   */
  'n-modal': ModalElement;
  /**
   * 二维码
   * @since 2.9.0
   */
  'n-qrcode': QrCodeElement;
}
type IntrinsicNekoElement = Transform<CustomElementTags>;

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, IntrinsicNekoElement {}
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface HTMLElementTagNameMap extends IntrinsicNekoElement {}
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface IntrinsicElements extends IntrinsicNekoElement {}
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface HTMLElementTagNameMap extends IntrinsicNekoElement {}
}

export interface ComponentOptions<T> {
  element: T & ICustomElement;
}
