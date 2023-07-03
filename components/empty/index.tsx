import { css, cx } from '@moneko/css';
import { customElement } from 'solid-element';
import Typography from '../typography';
import type { CSSProperties } from '..';

const style = css`
  .empty-container {
    inline-size: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
  }

  .empty-label {
    font-size: var(--font-size-sm);
  }
`;

export interface EmptyProps {
  class?: string;
  css?: string;
  style?: CSSProperties;
}
function Empty(props: EmptyProps) {
  return (
    <>
      <style>{style}</style>
      <div class={cx('empty-container', props.class)}>
        <Typography class="empty-label" type="secondary">
          无数据
        </Typography>
      </div>
    </>
  );
}

export interface EmptyElement extends EmptyProps {
  ref?: EmptyElement | { current: EmptyElement | null };
}

interface CustomElementTags {
  'n-empty': EmptyElement;
}
declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements extends HTMLElementTags, CustomElementTags {}
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements extends CustomElementTags, CustomElementTags {}
  }
}
customElement(
  'n-empty',
  {
    class: undefined,
    css: undefined,
    style: undefined,
  },
  Empty
);

export default Empty;
