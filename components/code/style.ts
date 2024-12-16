import { css } from '@moneko/css';

export const style = css`
  :host {
    --code-font-stack: 'Liberation Mono', monaco, menlo, consolas, 'Source Code Pro', 'Ubuntu Mono',
      'Microsoft Yahei', '微软雅黑', courier, 'Helvetica Neue', 'Lantinghei SC', stxihei, wenquanyi,
      sans-serif;

    position: relative;
    display: block;
    box-sizing: border-box;
  }

  .toolbar::after,
  .toolbar-copy::after,
  pre,
  code {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  [data-copy]::before {
    position: absolute;
    z-index: 1;
    display: inline-block;
    margin: auto;
    border: 1px solid;
    border-radius: var(--border-radius);
    padding: 4px 8px;
    font-size: var(--font-size-sm);
    transition:
      background-color 0.3s,
      color 0.3s,
      border-color 0.3s;
    content: '复制成功';
    inline-size: fit-content;
    animation-fill-mode: forwards;
    inset-block-start: 32px;
    inset-inline: 0;
  }

  [data-copy='success']::before {
    border-color: var(--success-border);
    color: var(--success-color);
    background-color: var(--success-bg);
    animation: copy-slide-in var(--transition-duration) var(--transition-timing-function);
  }

  [data-copy='failure']::before {
    border-color: var(--error-border);
    color: var(--error-color);
    background-color: var(--error-bg);
    animation:
      copy-slide-in var(--transition-duration) var(--transition-timing-function),
      error 1s var(--transition-timing-function) 1s;
    content: '复制失败';
  }

  [data-copy-exit]::before {
    animation: copy-slide-out var(--transition-duration) forwards var(--transition-timing-function);
  }

  @keyframes copy-slide-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0) scale(0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes copy-slide-out {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0) scale(0);
    }
  }

  pre,
  code {
    display: block;
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-size);
    font-family: var(--code-font-stack);
    text-align: start;
    white-space: pre-wrap;
    outline: none;
    text-shadow: none;
    overflow-wrap: normal;
    tab-size: 4;
    hyphens: none;
    max-inline-size: 100%;
    line-height: 1.8;
    transition-property: box-shadow, background-color, border-color, color;
  }

  pre {
    position: relative;
    overflow: visible;
    margin: auto;
    color: var(--code-color);
    background-color: var(--primary-component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
  }

  pre > code {
    overflow: auto;
    padding: 32px 16px 8px;
    pointer-events: auto;
  }

  pre.language-css,
  pre.language-less,
  pre.language-regex {
    color: var(--code-lang-style-color);
  }

  pre > .toolbar::after {
    position: absolute;
    z-index: 2;
    display: block;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    font-size: var(--font-size);
    font-family: Ubuntu, sans-serif;
    font-weight: bold;
    text-align: center;
    color: var(--text-color);
    background-color: var(--code-toolbar-bg, rgb(220 224 229 / 50%));
    box-shadow: 0 1px 5px rgb(0 0 0 / 10%);
    text-transform: uppercase;
    backdrop-filter: blur(10px);
    content: attr(data-language) '';
    block-size: 24px;
    inline-size: 100%;
    line-height: 24px;
    transition-property: background-color, border-color, color;
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  pre > .toolbar::before {
    position: absolute;
    z-index: 3;
    display: inline-block;
    border-radius: var(--border-radius);
    text-align: center;
    background-color: #fc625d;
    box-shadow:
      0 0 0 4px #fc625d,
      20px 0 0 4px #fdbc40,
      40px 0 0 4px #35cd4b;
    cursor: pointer;
    content: '';
    block-size: 4px;
    inline-size: 4px;
    inset-block-start: 10px;
    inset-inline-start: 12px;
  }

  pre > .toolbar > .toolbar-copy {
    position: absolute;
    z-index: 3;
    border: none;
    padding: 0;
    background: none;
    outline: none;
    cursor: pointer;
    inset-block-start: 0;
    inset-inline-end: 8px;
  }

  pre > .toolbar > .toolbar-copy:active {
    transform: scale(0.95);
  }

  .toolbar > .toolbar-copy::after {
    display: block;
    font-size: 24px;
    font-family: sans-serif;
    color: var(--text-color);
    user-select: none;
    content: '⎘';
    line-height: 24px;
    transition-property: color, transform;
  }

  .toolbar > .toolbar-copy:hover::after {
    color: var(--primary-color, #5794ff);
  }

  .not-toolbar > code {
    padding-block-start: 8px !important;
  }

  pre::-webkit-scrollbar {
    block-size: 5px;
    inline-size: 5px;
  }
`;
export const darkCss = css({
  ':host': {
    '--code-color': '#eee',
    '--code-lang-style-color': '#fd9170',
    '--code-toolbar-bg': 'rgb(63, 63, 63, 0.7)',
    '--atrule': '#c792ea',
    '--attr-name': '#9cdcfe',
    '--attr-value': '#ce9178',
    '--attr-equals': '#ccc',
    '--attribute': '#a5e844',
    '--boolean': '#c792ea',
    '--builtin': '#ffcb6b',
    '--cdata': '#80cbc4',
    '--char': '#80cbc4',
    '--class': '#ffcb6b',
    '--class-name': '#f2ff00',
    '--comment': '#616161',
    '--constant': '#c792ea',
    '--doctype': '#616161',
    '--entity': '#f66',
    '--function': '#dcdcaa',
    '--hexcode': '#f2ff00',
    '--id': '#c792ea',
    '--important': '#c792ea',
    '--keyword': '#c792ea',
    '--number': '#fd9170',
    '--operator': '#569cd6',
    '--prolog': '#616161',
    '--property': '#80cbc4',
    '--pseudo-class': '#a5e844',
    '--pseudo-element': '#a5e844',
    '--punctuation': '#89ddff',
    '--regex': '#f2ff00',
    '--selector': '#f66',
    '--string': '#a5e844',
    '--symbol': '#c792ea',
    '--tag': '#569cd6',
    '--unit': '#fd9170',
    '--url': '#f66',
    '--variable': '#f66',
    '--inserted-bg': 'rgba(0, 255, 128, .15)',
    '--deleted-bg': 'rgba(255, 0, 0, .15)',
  },
});
export const lightCss = css({
  ':host': {
    '--code-color': '#90a4ae',
    '--code-lang-style-color': '#f76d47',
    '--namespace': 'rgba(56, 64, 68, 0.7)',
    '--tag': '#4b69c6',
    '--atrule': '#7c4dff',
    '--attr-name': '#39adb5',
    '--attr-value': '#f6a434',
    '--attr-equals': '#90a4ae',
    '--attribute': '#f6a434',
    '--boolean': '#7c4dff',
    '--builtin': '#39adb5',
    '--cdata': '#39adb5',
    '--char': '#39adb5',
    '--class': '#39adb5',
    '--class-name': '#6182b8',
    '--comment': '#aabfc9',
    '--constant': '#7c4dff',
    '--doctype': '#aabfc9',
    '--entity': '#e53935',
    '--hexcode': '#f76d47',
    '--id': '#7c4dff',
    '--important': '#7c4dff',
    '--keyword': '#7c4dff',
    '--number': '#f76d47',
    '--operator': '#91b3e0',
    '--prolog': '#aabfc9',
    '--property': '#39adb5',
    '--pseudo-class': '#f6a434',
    '--pseudo-element': '#f6a434',
    '--punctuation': '#39adb5',
    '--regex': '#6182b8',
    '--selector': '#e53935',
    '--string': '#f6a434',
    '--symbol': '#7c4dff',
    '--unit': '#f76d47',
    '--url': '#e53935',
    '--variable': '#e53935',
    '--function': '#4078f2',
    '--name': '#39adb5',
    '--prefix-inserted': 'green',
    '--prefix-deleted': 'red',
    '--inserted-bg': 'rgba(0, 255, 128, .1)',
    '--deleted-bg': 'rgba(255, 0, 0, .1)',
  },
});
