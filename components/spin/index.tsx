import { createEffect, Show, splitProps } from 'solid-js';
import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';

import type { CustomElement } from '..';
import { clearAttribute } from '../basic-config';
import theme, { inline } from '../theme';

const style = css`
  :host {
    display: inline-block;
    box-sizing: border-box;
  }

  .spin {
    inline-size: fit-content;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 16px;
    min-block-size: 16px;
    position: relative;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    opacity: 1;
    transition: opacity var(--transition-duration);
  }

  .spining {
    cursor: not-allowed;

    .content {
      opacity: 0.3;
      pointer-events: none;
      user-select: none;
      filter: blur(4px);
    }

    &::before {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border: 1px solid;
      border-color: var(--text-secondary) transparent;
      border-radius: 50%;
      font-size: large;
      text-align: center;
      inline-size: 16px;
      block-size: 16px;
      inset-block: 0;
      inset-inline: 0;
      box-sizing: border-box;
      line-height: 1;
      content: '';
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
      <style textContent={baseStyle()} />
      <style textContent={style} />
      <Show when={props.css}>
        <style textContent={css(props.css)} />
      </Show>
      <div
        class={cx('spin', props.class)}
        classList={{
          spining: props.spin,
        }}
      >
        <div class="content">{props.children}</div>
      </div>
    </>
  );
}

export type SpinElement = CustomElement<SpinProps>;

customElement<SpinProps>(
  'n-spin',
  { class: void 0, css: void 0, spin: void 0, children: void 0 },
  (_, opt) => {
    const el = opt.element;
    const childNodes = (opt.element.childNodes as NodeList) || [];
    const nodes = [...childNodes.values()];
    const [, props] = splitProps(_, ['children']);

    createEffect(() => {
      clearAttribute(el, ['css']);
      el.replaceChildren();
    });
    return (
      <>
        <style textContent={inline} />
        <Spin {...props}>{nodes}</Spin>
      </>
    );
  },
);

export default Spin;
