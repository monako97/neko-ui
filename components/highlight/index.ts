// import '../prism';

// /** 用于匹配类似 "diff-xxxx" 的语言名，例如 "diff-git"、"diff-svn" */
// const LANGUAGE_REGEX = /^diff-([\w-]+)/i;

// /** 根据指定语言高亮代码片段
//  * @param {string} code - 待高亮的代码
//  * @param {string} lang - 代码语言
//  * @returns {string} 高亮后的代码字符串
//  */
// function highlight(code: string, lang: string): string {
//   // 如果 Prism 支持当前语言，使用 Prism 高亮器高亮代码
//   if (window.Prism.languages[lang]) {
//     return window.Prism.highlight(code, window.Prism.languages[lang], lang);
//   } else if (LANGUAGE_REGEX.test(lang)) {
//     // 如果当前语言名匹配 "diff-xxxx" 格式，使用 Prism 的 diff 语言高亮器
//     window.Prism.languages[lang] = window.Prism.languages.diff;
//     return window.Prism.highlight(code, window.Prism.languages[lang], lang);
//   }
//   // 默认使用 Prism 的 markup 语言高亮器
//   return window.Prism.highlight(code, window.Prism.languages.markup, 'markup');
// }

// export default highlight;
