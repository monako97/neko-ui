import type { JSX } from 'solid-js';

export type JSXElement = JSX.Element | HTMLElement | string | number | boolean;
export interface BasicConfig {
  /** 组件状态
   * @default 'normal'
   */
  status: keyof typeof Status;
  /** 组件尺寸
   * @default 'normal'
   */
  size: keyof typeof Size;
  /** 自定义 'label'、'value'、'options' 等映射的key */
  fieldName: Partial<{ [key in keyof typeof FieldName]: string }>;
}

export enum Size {
  /** 小 */
  small = 'small',
  /** 默认: 中 */
  normal = 'normal',
  /** 大 */
  large = 'large',
}

export enum Status {
  /** 默认 */
  normal = 'normal',
  /** 成功 */
  success = 'success',
  /** 警告 */
  warning = 'warning',
  /** 错误 */
  error = 'error',
  /** 详细 */
  info = 'info',
  /** 主要 */
  primary = 'primary',
}

export interface BaseOption {
  /** 图标 */
  icon?: JSXElement | (() => JSXElement);
  /** 值 */
  value?: string | number;
  /** 标题 */
  label?: JSXElement | (() => JSXElement);
  /** 不可用状态 */
  disabled?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: Record<string, unknown>;
  /** 选项状态
   * @default 'normal'
   */
  status?: Status;
  /** 分组子选项 */
  options?: (BaseOption | string)[];
  [key: string]: Any;
}

export enum FieldName {
  /** 标题 */
  label = 'label',
  /** 值 */
  value = 'value',
  /** 分组子选项 */
  options = 'options',
  /** 子选项 */
  children = 'children',
  /** 图标 */
  icon = 'icon',
  /** 后缀图标 */
  suffix = 'suffix',
  /** 标题 */
  title = 'title',
  /** 副标题 */
  subTitle = 'subTitle',
  /** 键 */
  key = 'key',
  /** 名称 */
  name = 'name',
}

export function camelToKebab(str: string) {
  return str
    .replace(/([A-Z])/g, '-$1') // 在大写字母前添加 "-"
    .toLowerCase(); // 转为小写
}
export function clearAttribute(el: HTMLElement | ICustomElement, fields: string[]) {
  fields.forEach((key) => {
    const field = key as 'className';
    const prev = el[field];

    el.removeAttribute(camelToKebab(field));
    el[field] = prev;
  });
}
