import { type JSX, createComponent, createEffect, createMemo, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Dynamic } from 'solid-js/web';
import { baseStyle } from '../theme';

export interface TypographyProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
}

function Typography(props: TypographyProps) {
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
        display: inline-block;
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
      <style>
        {baseStyle()}
        {customCss()}
        {css(props.css)}
      </style>
      <Dynamic component={_.tag} class={cx('typography', _.class)} style={_.style}>
        {_.children}
      </Dynamic>
    </>
  );
}

export type TypographyElement = CustomElement<TypographyProps>;

customElement(
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
      el.replaceChildren();
    });
    return createComponent(Typography, props);
  },
);
export default Typography;
