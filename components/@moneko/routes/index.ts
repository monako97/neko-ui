import type { RouteDefinition } from '@solidjs/router';
interface IRouteDefinition extends Omit<RouteDefinition, 'children'> {
  children?: RouteConfig[];
}
export interface RouteConfig extends IRouteDefinition {
  /** 菜单id */
  key?: string;
  /** 地址 */
  path: string;
  /** 图标 */
  icon?: string;
  /** 名称 */
  label?: string | null;
  /** 隐藏菜单 */
  hideMenu?: boolean;
  /** 隐藏标签页 */
  hideTab?: boolean;
  /** 菜单父id */
  parentId?: string;
  /** 可否关闭标签 */
  closable?: boolean;
  /** 子菜单 */
  props?: Record<string, Any>;
  /** 元数据 */
  meta?: Record<string, string | number | boolean>;
}
