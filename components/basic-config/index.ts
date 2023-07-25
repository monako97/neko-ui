import type { JSXElement } from 'solid-js';
import type { ICustomElement } from 'component-register';

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
  icon?: JSXElement;
  /** 值 */
  value?: string | number;
  /** 标题 */
  label?: JSXElement;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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
  offsetWidth?: number;
};
