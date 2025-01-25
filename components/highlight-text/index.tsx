import { createEffect, createMemo, createUniqueId, mergeProps, Show } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import theme, { inline } from '../theme';

const style = css`
  .text {
    word-break: break-word;
    word-wrap: break-word;
    white-space: break-spaces;
    cursor: auto;
  }
`;

function highlight(
  box: HTMLDivElement,
  id: string,
  regExp: string,
  flag: HighlightRule['flag'],
  text: string,
) {
  const regex = new RegExp(regExp, flag);
  const match = regex.exec(text);

  if (match) {
    const range = new Range();
    let pos = 0;

    pos += match.index;
    if (box.firstChild) {
      range.setStart(box.firstChild, pos);
      pos += match[0].length;
      range.setEnd(box.firstChild, pos);
    }
    const highlight = CSS.highlights.get(id);

    if (highlight) {
      highlight.add(range);
    } else {
      CSS.highlights.set(id, new Highlight().add(range));
    }
  }
}

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
  children?: string;
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
  let box: HTMLDivElement | undefined;
  const id = createUniqueId();
  const text = createMemo(() => `${props.text}${props.extra ?? ''}`);

  createEffect(() => {
    if (box && props.highlight) {
      if (Array.isArray(props.highlight)) {
        for (let i = 0, len = props.highlight.length; i < len; i++) {
          const item = props.highlight[i];
          const isOne = typeof item === 'string';
          const hitStr = isOne ? item : item.highlight;

          if (hitStr.length) {
            highlight(box, id, hitStr, isOne ? props.flag : item.flag, text());
          }
        }
      } else if (props.highlight.length) {
        highlight(box, id, props.highlight, props.flag, text());
      }
    }
  });
  createEffect(() => {
    if (box && typeof props.extra === 'string') {
      const range = new Range();
      let pos = props.text?.length || 0;

      if (box.firstChild) {
        range.setStart(box.firstChild, pos);
        pos += props.extra.length;
        range.setEnd(box.firstChild, pos);
      }
      const highlight = CSS.highlights.get(id);

      if (highlight) {
        highlight.add(range);
      } else {
        CSS.highlights.set(id, new Highlight().add(range));
      }
    }
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <style textContent={`::highlight(${id}) {color: var(--primary-color, #5794ff);}`} />
      <Show when={props.css}>{css(props.css)}</Show>
      <div ref={box} class={cx('text', props.class)}>
        {text()}
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
    children: void 0,
  },
  (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        text: el.textContent,
        css: el.css,
      },
      _,
    );

    createEffect(() => {
      clearAttribute(el, ['css', 'text', 'highlight', 'extra']);
      el.replaceChildren();
    });
    return (
      <>
        <style textContent={inline} />
        <HighlightText {...props} />
      </>
    );
  },
);
export default HighlightText;
