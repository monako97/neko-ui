import type { BasicConfig } from '../basic-config';
import type { Schema } from '../from-schema';

export interface TreeBaseProp {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 尺寸
   * @default 'normal'
   */
  size?: BasicConfig['size'];
  /** 只读 */
  readonly?: boolean;
  /** 开启取消选中, 仅多选模式生效 */
  toggle?: boolean;
  /** 方向
   * @default 'ltr'
   */
  direction?: 'rtl' | 'ltr';
  /** 点击行时的回调函数 */
  onRowClick?: (e: MouseEvent, key: string, item: TreeData) => void;
  /** 双击行时的回调函数 */
  onRowDoubleClick?: (e: MouseEvent, key: string, item: TreeData) => void;
  /** 自定义渲染行 */
  renderRow?: (item: TreeData, title: JSX.Element, subTitle?: JSX.Element) => JSX.Element[];
  /** 开启此选项支持 `JSONSchema`
   * @default false
   */
  fromSchema?: false;
  /** 自定义节点字段 */
  fieldNames?: BasicConfig['fieldName'];
}

interface TreeBaseProps extends TreeBaseProp {
  /** 选中的值, 多选模式时为数组 */
  value?: string;
  /** 多选模式
   * @default false
   */
  multiple?: false;
  /** 选中的值发生修改时的回调函数, 多选模式时入参为数组 */
  onChange?(key?: string, item?: TreeData): void;
}
interface TreeMultipleBaseProps extends TreeBaseProp {
  /** 选中的值 */
  value?: string[];
  /** 多选模式
   * @default true
   */
  multiple: true;
  onChange?(key?: string[], item?: TreeData): void;
}
export interface TreeProps extends TreeBaseProps {
  /** 数据源 */
  data: TreeData[];
}
export interface TreeSchemaProps extends Omit<TreeBaseProps, 'fromSchema'> {
  /** 开启此选项支持 `JSONSchema` */
  fromSchema: true;
  /** 数据源 */
  data: Schema;
}
export interface TreeStringProps extends TreeBaseProps {
  /** 数据源 */
  data: string;
}
export interface TreeMultipleProps extends TreeMultipleBaseProps {
  /** 数据源 */
  data: TreeData[];
}
export interface TreeMultipleSchemaProps extends Omit<TreeMultipleBaseProps, 'fromSchema'> {
  /** 开启此选项支持 `JSONSchema` */
  fromSchema: true;
  /** 数据源 */
  data: Schema;
}
export interface TreeMultipleStringProps extends TreeMultipleBaseProps {
  /** 数据源 */
  data: string;
}
type CustomEvents = 'onChange' | 'onRowDoubleClick' | 'onRowClick';

export type TreeElement = CustomElement<TreeProps, CustomEvents>;
export type TreeSchemaElement = CustomElement<TreeSchemaProps, CustomEvents>;
export type TreeStringElement = CustomElement<TreeStringProps, CustomEvents>;
export type TreeMultipleElement = CustomElement<TreeMultipleProps, CustomEvents>;
export type TreeMultipleSchemaElement = CustomElement<TreeMultipleSchemaProps, CustomEvents>;
export type TreeMultipleStringElement = CustomElement<TreeMultipleStringProps, CustomEvents>;

export interface TreeStack extends TreeData {
  /** 深度 */
  depth?: number;
}

export interface TreeData<T = string> {
  /** key(唯一值) */
  key: T;
  /** 属性 */
  name?: string;
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
  /** 详细描述 */
  description?: string;
  /** 子项 */
  children?: TreeData<T>[];
  [key: string | number | symbol]:
    | T
    | string
    | number
    | symbol
    | boolean
    | TreeData<T>[]
    | undefined;
}
