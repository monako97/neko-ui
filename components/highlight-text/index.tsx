import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import theme from '../theme';

const style = css`
  .text {
    word-break: break-word;
    word-wrap: break-word;
    white-space: break-spaces;
    cursor: auto;
  }

  .hit {
    color: var(--primary-color, #5794ff);
  }
`;

export type HighlightTextJson =
  | {
      highlight?: boolean;
      text: string;
    }[]
  | null;
export interface HighlightTextProps {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 内容 */
  text?: string;
  /** 需要高亮的内容 */
  highlight?: string | (HighlightRule | string)[];
  /** RegExp flag */
  flag?: HighlightRule['flag'];
  /** 额外需要高亮的内容 */
  extra?: string;
}

interface HighlightRule {
  /** 需要高亮的内容 */
  highlight: string;
  /** RegExp flag */
  flag?: 'g' | 'i' | 'm' | 'u' | 'y';
}

export interface Highlight {
  /** 命中高亮 */
  hit?: boolean;
  /** 内容 */
  text: string;
}

function HighlightText(props: HighlightTextProps) {
  const { baseStyle } = theme;
  const [texts, setTexts] = createSignal<Highlight[] | null>();
  const hitNode = createMemo(() => {
    return (
      texts()?.map((item) => {
        return item.hit ? (
          <span class="hit" data-text={item.text}>
            {item.text}
          </span>
        ) : (
          item.text
        );
      }) ?? props.text
    );
  });

  /**
   * 字符串转换成高亮字符的Json格式
   * @param {string} text 字符串
   * @returns {HighlightTextJson} 高亮字符的Json
   */
  function strToHighlight(text: string): Highlight[] | null {
    /**
     * 高亮字符串语法
     * @example
     * ```
     * const str = '%c:高亮文字:c%';
     * ```
     */
    const RegExp_HighLight = /%c:(.+?):c%/i;
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

  createEffect(() => {
    if (typeof props.text === 'string' && props.highlight) {
      let str = props.text;

      if (Array.isArray(props.highlight)) {
        for (let i = 0, len = props.highlight.length; i < len; i++) {
          const item = props.highlight[i];
          const isOne = typeof item === 'string';
          const hitStr = isOne ? item : item.highlight;
          const iFlag = isOne ? props.flag : item.flag;

          if (hitStr.length) {
            str = str.replace(new RegExp(hitStr, iFlag), `%c:${hitStr}:c%`);
          }
        }
      } else if (props.highlight.length) {
        str = str.replace(new RegExp(props.highlight, props.flag), `%c:${props.highlight}:c%`);
      }
      setTexts(strToHighlight(str));
    } else {
      setTexts(null);
    }
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>{css(props.css)}</Show>
      <div class={cx('text', props.class)}>
        {hitNode()}
        {props.extra && <span class="hit">{props.extra}</span>}
      </div>
    </>
  );
}

export type HighlightTextElement = CustomElement<HighlightTextProps>;
customElement<HighlightTextProps>(
  'n-highlight-text',
  {
    class: void 0,
    css: void 0,
    text: void 0,
    highlight: void 0,
    flag: void 0,
    extra: void 0,
  },
  HighlightText,
);
export default HighlightText;
