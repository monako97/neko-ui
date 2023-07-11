import { type JSXElement, createComponent, createEffect, createMemo, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { Dynamic } from 'solid-js/web';
import { baseStyle } from '../theme';
import type { CSSProperties, CustomElement } from '..';

export type TypographyType = 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'text';
export interface TypographyProps {
  class?: string;
  css?: string;
  type?: TypographyType;
  truncated?: boolean | number;
  tag?: string;
  disabled?: boolean;
  children?: JSXElement;
  style?: CSSProperties;
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

    if (props.type === 'danger') {
      color = '--error-color';
    } else if (props.disabled) {
      color = '--disable-color';
    }
    let truncated = '';

    if (props.truncated) {
      truncated = `
        overflow: hidden;
        /* stylelint-disable-next-line */
        display: -webkit-box;
        -webkit-box-orient: block-axis;
        -webkit-line-clamp: ${(typeof props.truncated === 'number' && props.truncated) || 1};
      `;
    }

    return `
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
    class: undefined,
    css: undefined,
    type: undefined,
    truncated: undefined,
    tag: undefined,
    disabled: undefined,
    style: undefined,
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
