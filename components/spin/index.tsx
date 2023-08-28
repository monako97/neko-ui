import { type JSX, createComponent, mergeProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import theme from '../theme';
import type { CustomElement } from '..';

const style = css`
  .box {
    position: relative;
    box-sizing: border-box;
  }

  .content {
    opacity: 1;
    transition: opacity var(--transition-duration);
  }

  .spin {
    cursor: not-allowed;

    .content {
      opacity: 0.3;
      pointer-events: none;
      user-select: none;
    }

    &::before {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border: 1px solid;
      border-color: var(--text-secondary) transparent;
      border-radius: 16px;
      font-size: large;
      text-align: center;
      inline-size: 32px;
      block-size: 32px;
      inset-block-start: 0;
      inset-block-end: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      box-sizing: border-box;
      content: '✲';
      animation: spin-rotate-effect 1s infinite;
    }
  }

  @keyframes spin-rotate-effect {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export interface SpinProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 自定义样式表 */
  css?: string;
  /** 自定义类名 */
  class?: string;
  /** 加载状态 */
  spin?: boolean;
  /** 内容 */
  children?: JSX.Element | JSX.Element[];
}

function Spin(props: SpinProps) {
  const { baseStyle } = theme;

  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <div class={cx('box', props.spin && 'spin', props.class)}>
        <div class="content">{props.children}</div>
      </div>
    </>
  );
}

export type SpinElement = CustomElement<SpinProps>;

customElement<SpinProps>('n-spin', { class: void 0, css: void 0, spin: void 0 }, (_, opt) => {
  const el = opt.element;
  const props = mergeProps(
    {
      children: [...el.childNodes.values()],
    },
    _,
  );

  return createComponent(Spin, props);
});
export default Spin;
