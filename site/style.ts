import { css } from '@moneko/css';

export const noBg = css`
  .n-md-body:has(n-md) {
    overflow: initial;
    padding: 0;
    background-color: transparent;
    box-shadow: unset;
    backdrop-filter: unset;
    margin-block-end: 0;
  }
`;

export const styles = css`
  #root {
    flex-wrap: wrap;
  }

  n-provider {
    display: flex;
    inline-size: 100vi;
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
    background-color: var(--bg);

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
    .site-doc-main {
      inline-size: calc(100% - 116px);
    }
  }
`;