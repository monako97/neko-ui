/**
 * 按需导入 `swc`
 * @description 使用 swc 时的按需导入配置
 */
export interface SwcImportOnDemand {
  /** 要使用的库名称，而不是导入语句中指定的库名称。`member` 是替换的成员
   * @example
   * const conf = {
   *    importOnDemand: {
   *        'antd': {
   *           transform: 'es/${member}',
   *           memberTransformers: ['dashed_case']
   *        }
   *    }
   * }
   * // 以下代码将会按照预期进行转换
   * import { Button } from 'antd';
   * // to
   * import Button from 'antd/es/button'
   */
  transform: string;
  /** 设置转换时需要单独导入的样式，`member` 是替换的成员
   * @default false
   * @example
   * const conf = {
   *    importOnDemand: {
   *        antd: {
   *           transform: 'es/${member}',
   *           style: 'es/${member}/style',
   *           memberTransformers: ['dashed_case']
   *        }
   *    }
   * }
   * // 以下代码将会按照预期进行转换
   * import { BackTop } from 'antd';
   * // to
   * import BackTop from 'antd/es/back-top';
   * import 'antd/es/back-top/style';
   */
  style?: string | boolean;
  /** 不转换为默认导出格式
   * @default false
   * @example
   * 当设置为true时，将保留 import { Button } 语法，而不是转换为 `import Button`
   */
  skipDefaultConversion?: boolean;
  /** 当遇到会导致导入整个模块时，是否抛出
   * @default true
   */
  preventFullImport?: boolean;
  /** 成员转换规则
   * @default []
   */
  memberTransformers?: MemberTransformer[];
}
export enum MemberTransformer {
  /** 帕斯卡拼写法(大驼峰): 所有单词的首字母大写，然后直接连接起来，单词之间没有连接符 */
  pascal_case = 'pascal_case',
  /** 骆驼拼写法(小驼峰): 第一个单词的首字母小写, 后续所有单词的首字母大写，然后直接连接起来，单词之间没有连接符 */
  camel_case = 'camel_case',
  /** 连字符拼写法: 各个单词或缩写之间以`-`做间隔 */
  kebab_case = 'kebab_case',
  /** 破折号式: 每个单词全小写或全大写，多单词使用`-`隔开 */
  dashed_case = 'dashed_case',
  /** 蛇形命名: 每个单词全小写或全大写，多单词使用`_`隔开 */
  snake_case = 'snake_case',
  /** 大写 */
  upper_case = 'upper_case',
  /** 最后大写 */
  upper_first = 'upper_first',
  /** 小写 */
  lower_case = 'lower_case',
  /** 最后小写 */
  lower_first = 'lower_first',
}
