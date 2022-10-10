import React, { useEffect, useMemo, useState } from 'react';
import { classNames, getPrefixCls } from '../utils';
import './index.global.less';

/**
 * 高亮字符串语法
 * @example
 * ```
 * const str = '%c:高亮文字:c%';
 * ```
 */
export const RegExp_HighLight = /%c:(.+?):c%/i;

export type HighlightTextJson =
  | {
      highlight?: boolean;
      text: string;
    }[]
  | null;
export interface HighlightTextProps {
  className?: string;
  style?: React.CSSProperties;
  /** 命中高亮部分的样式 */
  hitStyle?: React.CSSProperties;
  /** 命中高亮部分的类名 */
  hitClassName?: string;
  /** 内容 */
  text?: string;
  /** 需要高亮的内容 */
  highlight?: string | ({ highlight: string; flag: HighlightFlag } | string)[];
  flag?: HighlightFlag;
  /** 额外需要高亮的内容 */
  extra?: string;
}
export type HighlightFlag = 'g' | 'i' | 'm' | 'u' | 'y';
export type Highlight = {
  /** 命中高亮 */
  hit?: boolean;
  /** 内容 */
  text: string;
};

/**
 * 字符串转换成高亮字符的Json格式
 * @param {string} text 字符串
 * @returns {HighlightTextJson} 高亮字符的Json
 */
export function strToHighlight(text: string): Highlight[] | null {
  let str = text,
    strArr = RegExp_HighLight.exec(str);

  if (strArr) {
    const textArr: Highlight[] = [];

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
        hit: true,
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

const HighlightText: React.FC<HighlightTextProps> = ({
  className,
  style,
  hitStyle,
  hitClassName,
  text,
  highlight,
  extra,
  flag = 'g',
}) => {
  const [texts, setTexts] = useState<Highlight[] | null>();
  const hitCls = useMemo(() => classNames([getPrefixCls('hit'), hitClassName]), [hitClassName]);

  useEffect(() => {
    if (typeof text === 'string' && highlight) {
      let str = text;

      if (Array.isArray(highlight)) {
        for (let i = 0, len = highlight.length; i < len; i++) {
          const item = highlight[i];
          const isOne = typeof item === 'string';
          const hitStr = isOne ? item : item.highlight;
          const iFlag = isOne ? flag : item.flag;

          str = str.replace(new RegExp(hitStr, iFlag), `%c:${hitStr}:c%`);
        }
      } else {
        str = str.replace(new RegExp(highlight, flag), `%c:${highlight}:c%`);
      }
      setTexts(strToHighlight(str));
    } else {
      setTexts(null);
    }
  }, [flag, highlight, text]);
  const hitNode = useMemo(() => {
    return (
      texts?.map((item, i) => {
        return item.hit ? (
          <span key={item.text + i} className={hitCls} data-text={item.text} style={hitStyle}>
            {item.text}
          </span>
        ) : (
          item.text
        );
      }) ?? text
    );
  }, [hitCls, hitStyle, text, texts]);

  return (
    <div className={classNames([getPrefixCls('highlight-text'), className])} style={style}>
      {hitNode}
      {extra && (
        <span className={hitCls} style={hitStyle}>
          {extra}
        </span>
      )}
    </div>
  );
};

export default HighlightText;
