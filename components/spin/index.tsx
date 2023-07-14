import { For, type JSXElement } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import { baseStyle } from '../theme';
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

export interface SpinProps {
  class?: string;
  css?: string;
  spin?: boolean;
  children?: JSXElement[];
}

function Spin(props: SpinProps) {
  return (
    <>
      <style>
        {baseStyle()}
        {style}
        {css(props.css)}
      </style>
      <div class={cx('box', props.spin && 'spin', props.class)}>
        <div class="content">
          <For each={props.children}>{(item) => item}</For>
        </div>
      </div>
    </>
  );
}

export type SpinElement = CustomElement<SpinProps>;

customElement(
  'n-spin',
  { class: undefined, css: undefined, spin: undefined, children: undefined },
  Spin,
);
export default Spin;
