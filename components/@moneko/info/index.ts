/** 虚拟模块 `app:info`
 * @description 应用信息
 * @ignore optional
 */
export interface Api {
  /** 应用名称 */
  name: string;
  /** 应用名称(大写) */
  projectName: string;
  /** 应用描述 */
  description: string;
  /** 应用版本 */
  version: string;
  /** 应用类型 */
  type: 'mobile' | 'site' | 'backstage' | 'micro' | 'library';
  /** 开发者 */
  author: Author;
  /** 存储库 */
  repository: Repository;
  /** 路由模式 */
  routerMode: 'hash' | 'browser';
  /** 根路由 */
  base: string;
  /** 类名前缀 */
  prefixCls?: string;
  /** 主题风格 */
  theme?: string;
}

/** 开发者
 * @ignore optional
 */
interface Author {
  /** 名称 */
  name: string;
  /** 主页 */
  url?: string;
  /** 邮箱 */
  email?: string;
}

/** 存储库
 * @ignore optional
 */
interface Repository {
  /** 类型 */
  type?: string;
  /** 存储库地址 */
  url?: string;
  /** 存储库目录 */
  directory?: string;
}
