import { Show, createEffect } from 'solid-js';
import { css } from '@moneko/css';
import { Outlet, useLocation } from '@solidjs/router';
import { baseStyle } from 'neko-ui';
import '@/components';
import { activeKey } from '@/utils';

const noBg = css`
  .n-md-body:has(n-md):not(.site-empty) {
    overflow: initial;
    padding: 0;
    background-color: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    margin-block-end: 0;
  }
`;

const style = css`
  #root {
    flex-wrap: wrap;
  }

  .site-doc-main {
    margin-block-start: 16px;
    inline-size: calc(100% - 288px);
  }

  .site-page-view {
    box-sizing: border-box;
    margin: 16px auto 0;
    min-block-size: calc(100vb - 132px);

    n-md::part(body) > div:empty {
      margin: 0;
      padding: 0;
      background-color: none;
      backdrop-filter: none;
      box-shadow: none;
      pointer-events: none;
    }

    n-md::part(toc) {
      inset-block-start: 16px;
    }

    n-md::part(body) {
      tr > th,
      tr > td {
        &:last-child,
        &:nth-last-child(2) {
          min-inline-size: 45px;
        }
      }
    }
  }

  body {
    overflow-x: hidden;
  }

  body::before {
    position: fixed;
    inset-block-start: 0;
    z-index: 1;
    display: block;
    inline-size: 100vi;
    block-size: 100px;
    background: linear-gradient(
      124deg,
      #f44336,
      #e91e63,
      #9c27b0,
      #673ab7,
      #3f51b5,
      #2196f3,
      #03a9f4,
      #00bcd4,
      #009688,
      #4caf50,
      #8bc34a,
      #cddc39,
      #ffeb3b,
      #ffc107,
      #ff9800,
      #ff5722
    );
    background-size: 800% 800%;
    opacity: 0.2;
    content: '';
    transform: translateY(-100px);
    animation: colorful-stripe 15s var(--transition-timing-function) infinite;
  }

  .n-site-bg {
    position: fixed;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    z-index: -1;
    inline-size: 100vi;
    block-size: 100vb;
    background: linear-gradient(#673ab7, transparent), linear-gradient(90deg, #ff5722, transparent),
      linear-gradient(-90deg, #8bc34a, transparent);
    transform: translate(-50%, -50%);
    background-blend-mode: screen;
    animation: color-ful-stripe 15s infinite alternate linear;
    pointer-events: none;
    opacity: 0.05;
  }

  :root[data-theme='dark'] {
    background-color: #1c1c1c;

    .n-site-bg {
      opacity: 0;
    }
  }

  @keyframes color-ful-stripe {
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @media screen and (width <= 1100px) {
    n-md::part(box) {
      max-inline-size: auto;
    }

    .site-doc-main {
      inline-size: calc(100% - 116px);
    }

    .site-doc-main-box n-md::part(toc) {
      position: fixed;
      inset-inline-end: 16px;
      transform: translateX(100%);
      transition: transform var(--transition-duration) var(--transition-timing-function);

      &:hover {
        transform: translateX(0);
      }
    }
  }
`;

let box: HTMLDivElement;

function App() {
  const location = useLocation();

  createEffect(() => {
    box?.scrollTo({ top: 0, behavior: 'smooth' });
  });
  const backTopCss = css`
    .back-top {
      position: fixed;
    }
  `;

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <div class="n-site-bg" />
      <site-sider />
      <main ref={box} class="site-doc-main">
        <Show when={!activeKey(location).startsWith('@moneko')}>
          <site-coverage />
        </Show>
        <div class="site-page-view">
          <n-md css={noBg} not-render={true}>
            <div>
              <Outlet />
            </div>
          </n-md>
          <site-sandbox-group name={activeKey(location)} />
          <site-pagination />
        </div>
        <site-footer />
      </main>
      <n-back-top css={backTopCss} />
    </>
  );
}

export default App;
