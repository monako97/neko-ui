export interface KaTexProps {
  /** 自定义类名 */
  class?: string;
  /** 数学公式 */
  children?: string;
  /** 确定输出的标记语言
   * @default 'htmlAndMathml'
   */
  output?: 'html' | 'htmlAndMathml' | 'mathml';
  /** command */
  // eslint-disable-next-line no-unused-vars
  trust?: boolean | ((context: TrustContext) => boolean);
  /** `\color` 行为 */
  colorIsTextColor?: boolean;
  /** 严格模式 */
  strict?: boolean;
  /** Run KaTeX code in the global group. */
  globalGroup?: boolean;
  /** 如果 true, 则显示数学用`a2em`左边距渲染刷新左 */
  fleqn?: boolean;
  /** 如果 true, 显示数学的`\tag`呈现在左侧而不是右侧 */
  leqno?: boolean;
  /** 显示模式
   * @default false
   */
  displayMode?: boolean;
  /** 抛出错误
   * @default true
   */
  throwOnError?: boolean;
  /** All user-specified sizes */
  maxSize?: number;
  /** 将宏扩展的数量限制在指定数量，以防止例如无限的宏循环
   * @default 1000
   */
  maxExpand?: number;
  /** 线的边界指定最小厚度 */
  minRuleThickness?: number;
  /** 当`throwOnError`设置为 false 时, 无效的 `LaTeX` 呈现的颜色
   * @default '#cc0000'
   */
  errorColor?: string;
  /** 自定义宏的集合 */
  macros?: object;
}

interface TrustContext {
  command: string;
  url: string;
  protocol: string;
}
