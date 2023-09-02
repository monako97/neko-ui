/** 文件级覆盖率
 * @ignore optional
 */
export interface CoverageType {
  /** 语句(statement coverage) */
  statements: string;
  /** 语句覆盖: 是不是每个语句都执行了 */
  coveredstatements: string;
  /** 条件(branch coverage) */
  conditionals: string;
  /** 条件覆盖: 是不是每个条件代码块都执行了 */
  coveredconditionals: string;
  /** 函数(function coverage) */
  methods: string;
  /** 函数覆盖: 是不是每个函数都调用了 */
  coveredmethods: string;
}
/** 项目级覆盖率
 * @ignore optional
 */
export interface ProjectCoverageType {
  /** 元素 */
  elements: string;
  /** 覆盖元素 */
  coveredelements: string;
  complexity: string;
  loc: string;
  ncloc: string;
  /** 经过测试的组件 */
  packages: string;
  /** 经过测试的文件 */
  files: string;
  /** 经过测试的类 */
  classes: string;
}
