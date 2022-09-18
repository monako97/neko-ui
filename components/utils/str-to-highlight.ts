/**
 * 高亮字符串语法
 * @example
 * ```
 * const str = '%c:高亮文字:c%';
 * ```
 */
export const RegExp_HighLight = /%c:(.+?):c%/i;

type HighlightTextJsonType =
  | {
      highlight?: boolean;
      text: string;
    }[]
  | null;

/**
 * 字符串转换成高亮字符的Json格式
 * @param {string} text 字符串
 * @returns {HighlightTextJsonType} 高亮字符的Json
 */
export function strToHighlight(text: string): HighlightTextJsonType {
  let str = text,
    strArr = RegExp_HighLight.exec(str);

  if (strArr) {
    const textArr: HighlightTextJsonType = [];

    for (; strArr !== null; strArr = RegExp_HighLight.exec(str)) {
      // 普通部分
      let normalText: string | null = str.substring(0, strArr.index);

      if (normalText.trim().length) {
        textArr.push({
          text: normalText,
        });
      }

      // 高亮部分
      textArr.push({
        highlight: true,
        text: strArr[1],
      });
      str = str.substring(strArr[0].length + strArr.index);
      normalText = null;
    }
    if (str.trim().length) {
      textArr.push({
        text: str,
      });
    }
    return textArr;
  }
  return null;
}
