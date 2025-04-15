import { createEffect, createMemo, mergeProps, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute, type JSXElement } from '../basic-config';
import theme from '../theme';

export interface TypographyProps {
  /** 自定义类名 */
  class?: string;
  /** 自定义样式表 */
  css?: string;
  /** 文本格式
   * @default 'text'
   */
  type?: 'primary' | 'warning' | 'success' | 'error' | 'text' | 'secondary';
  /** 启用超出隐藏
   * @default false
   */
  truncated?: boolean | number;
  /** 自定义标签名
   * @default 'span'
   */
  tag?: string;
  /** 禁用 */
  disabled?: boolean;
  children?: JSXElement;
  style?: Record<string, string | number>;
}

function Typography(props: TypographyProps) {
  const { baseStyle } = theme;
  const _ = mergeProps(
    {
      type: 'text',
      tag: 'span',
    },
    props,
  );
  const customCss = createMemo(() => {
    let color = props.type === 'secondary' ? '--text-secondary' : `--${props.type}-color`;

    if (props.type === 'error') {
      color = '--error-color';
    } else if (props.disabled) {
      color = '--disable-color';
    }
    let truncated = '';

    if (props.truncated) {
      truncated = css`
        overflow: hidden;
        /* stylelint-disable-next-line */
        display: -webkit-box;
        -webkit-box-orient: block-axis;
        -webkit-line-clamp: ${(typeof props.truncated === 'number' && props.truncated) || 1};
      `;
    }

    return css`
      :host {
        max-inline-size: 100%;
      }

      .typography {
        font-size: var(--font-size);
        word-break: break-word;
        word-wrap: break-word;
        color: var(${color});
        cursor: ${props.disabled ? 'not-allowed' : 'auto'};
        ${truncated}
      }
    `;
  });

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={customCss()} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <Dynamic component={_.tag} class={cx('typography', _.class)} style={_.style}>
        {_.children}
      </Dynamic>
    </>
  );
}

export type TypographyElement = CustomElement<TypographyProps>;

Typography.registry = () => {
  customElement<TypographyProps>(
    'n-typography',
    {
      class: void 0,
      css: void 0,
      type: void 0,
      truncated: void 0,
      tag: void 0,
      disabled: void 0,
      style: void 0,
    },
    (_, opt) => {
      const el = opt.element;
      const props = mergeProps(
        {
          children: [...el.childNodes.values()],
        },
        _,
      );

      createEffect(() => {
        clearAttribute(el, ['css', 'tag', 'style']);
        el.replaceChildren();
      });
      return <Typography {...props} />;
    },
  );
};

export default Typography;
