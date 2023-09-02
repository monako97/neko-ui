/** 语言配置 */
export interface LocaleConfig {
  /** 语言名称 (未设置时使用文件名)*/
  language?: string;
  /** 描述 */
  title: string;
  /** Icon */
  icon?: string;
  /** 翻译字典 */
  translation: Record<string, string>;
}
