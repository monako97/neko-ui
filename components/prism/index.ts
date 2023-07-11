import { createMemo } from 'solid-js';
import { css } from '@moneko/css';
import Prism from './prism.js';
import { theme } from '../theme';

const baseCss = css`
  [data-copy]::before {
    position: absolute;
    inset-block-start: 32px;
    inset-inline-end: 0;
    inset-inline-start: 0;
    z-index: 1;
    display: inline-block;
    margin: auto;
    border: 1px solid;
    border-radius: var(--border-radius);
    padding: 4px 8px;
    inline-size: fit-content;
    font-size: var(--font-size-sm);
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s;
    animation-fill-mode: forwards;
    content: '复制成功';
  }

  [data-copy='success']::before {
    border-color: var(--success-border);
    color: var(--success-color);
    background-color: var(--success-bg);
    animation: copy-slide-in 0.3s ease-in-out;
    content: '复制成功';
  }

  [data-copy='failure']::before {
    border-color: var(--error-border);
    color: var(--error-color);
    background-color: var(--error-bg);
    animation:
      copy-slide-in 0.3s ease-in-out,
      error 1s ease-in-out 1s;
    content: '复制失败';
  }

  [data-copy-exit]::before {
    animation: copy-slide-out 0.3s forwards ease-in-out;
  }

  @keyframes copy-slide-in {
    from {
      transform: translate3d(0, -100%, 0) scale(0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }

  @keyframes copy-slide-out {
    from {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }

    to {
      transform: translate3d(0, -100%, 0) scale(0);
      opacity: 0;
    }
  }

  pre > code {
    display: block;
    overflow: auto;
    margin: 0 16px 8px;
    padding: 32px 0 8px;
    max-inline-size: 100%;
    font-size: var(--font-size);
    white-space: pre;
    line-height: 1.8;
    pointer-events: auto;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: box-shadow, background-color, border-color, color;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: var(--code-color, #90a4ae);

    &::selection,
    & ::selection {
      background-color: var(--text-selection);
      text-shadow: 0 1px var(--primary-shadow);
    }
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: var(--code-lang-style-color, #f76d47);
  }

  .line-numbers-rows,
  .toolbar::after,
  .toolbar-copy::after,
  pre {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  [class*='language-'] .namespace {
    opacity: 0.7;
  }

  .tag {
    color: var(--token-tag, #e53935);
  }

  .atrule {
    color: var(--token-atrule, #7c4dff);
  }

  .attr-name {
    color: var(--token-attr-name, #39adb5);
  }

  .attr-value {
    color: var(--token-attr-value, #f6a434);
  }

  .attribute {
    color: var(--token-attribute, #f6a434);
  }

  .boolean {
    color: var(--token-boolean, #7c4dff);
  }

  .builtin {
    color: var(--token-builtin, #39adb5);
  }

  .cdata {
    color: var(--token-cdata, #39adb5);
  }

  .char {
    color: var(--token-char, #39adb5);
  }

  .class {
    color: var(--token-class, #39adb5);
  }

  .class-name,
  .maybe-class-name {
    color: var(--token-class-name, #6182b8);
  }

  .comment {
    color: var(--token-comment, #aabfc9);
  }

  .constant {
    color: var(--token-constant, #7c4dff);
  }

  .deleted {
    color: var(--token-deleted, #e53935);
  }

  .doctype {
    color: var(--token-doctype, #aabfc9);
  }

  .entity {
    color: var(--token-entity, #e53935);
  }

  .function {
    color: var(--token-function, #7c4dff);
  }

  .hexcode {
    color: var(--token-hexcode, #f76d47);
  }

  .id {
    font-weight: bold;
    color: var(--token-id, #7c4dff);
  }

  .important {
    font-weight: bold;
    color: var(--token-important, #7c4dff);
  }

  .inserted {
    color: var(--token-inserted, #39adb5);
  }

  .keyword {
    color: var(--token-keyword, #7c4dff);
  }

  .number {
    color: var(--token-number, #f76d47);
  }

  .operator {
    color: var(--token-operator, #39adb5);
  }

  .prolog {
    color: var(--token-prolog, #aabfc9);
  }

  .property {
    color: var(--token-property, #39adb5);
  }

  .pseudo-class {
    color: var(--token-pseudo-class, #f6a434);
  }

  .pseudo-element {
    color: var(--token-pseudo-element, #f6a434);
  }

  .punctuation {
    color: var(--token-punctuation, #39adb5);
  }

  .regex {
    color: var(--token-regex, #6182b8);
  }

  .selector {
    color: var(--token-selector, #e53935);
  }

  .string {
    color: var(--token-string, #f6a434);
  }

  .symbol {
    color: var(--token-symbol, #7c4dff);
  }

  .unit {
    color: var(--token-unit, #f76d47);
  }

  .url {
    color: var(--token-url, #e53935);
  }

  .variable {
    color: var(--token-variable, #e53935);
  }

  code[class*='language-'],
  pre,
  .n-editor textarea {
    font-family: 'Liberation Mono', Monaco, Menlo, Consolas, 'Source Code Pro', 'Ubuntu Mono',
      'Microsoft Yahei', '微软雅黑', Courier, 'Helvetica Neue', 'Lantinghei SC', STXihei, WenQuanYi,
      sans-serif;
    text-align: start;
    white-space: pre;
    word-wrap: normal;
    word-break: normal;
    word-spacing: normal;
    tab-size: 4;
    hyphens: none;
  }

  .deleted:not(.prefix) {
    display: block;
    color: inherit;
    background-color: rgb(255 0 0 / 10%);
  }

  .inserted:not(.prefix) {
    display: block;
    color: inherit;
    background-color: rgb(0 255 128 / 10%);
  }

  span .inline-color-wrapper {
    display: inline-block;
    overflow: hidden;
    margin: 0 0.333ch;
    border: var(--border-base);
    background: repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 0 / 10px 10px;
    outline: 1px solid rgb(0 0 0 / 50%);
    inline-size: 1.333ch;
    block-size: 1.333ch;
    box-sizing: border-box;
  }

  span .inline-color {
    display: block;
    inline-size: 120%;
    block-size: 120%;
  }

  pre,
  .n-editor {
    position: relative;
    display: block;
    overflow: visible;
    margin: auto;
    border-radius: var(--border-radius);
    max-inline-size: 100%;
    font-size: var(--font-size);
    white-space: pre-wrap;
    background-color: var(--primary-component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
    line-height: 20px;
    transition-property: color, background-color, box-shadow;
  }

  pre .toolbar::after {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: 1;
    display: block;
    overflow: hidden;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    inline-size: 100%;
    block-size: 24px;
    font-size: var(--font-size);
    font-family: Ubuntu, sans-serif;
    font-weight: bold;
    text-align: center;
    color: var(--text-color);
    background-color: var(--code-toolbar-bg, rgb(220 224 229 / 50%));
    box-shadow: 0 1px 5px rgb(0 0 0 / 10%);
    line-height: 24px;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
    /* stylelint-disable-next-line */
    -webkit-backdrop-filter: blur(16px);
    content: attr(data-lang) '';
    transition-property: background-color, border-color, color;
  }

  pre .toolbar::before {
    position: absolute;
    inset-block-start: 10px;
    inset-inline-start: 12px;
    z-index: 3;
    display: inline-block;
    border-radius: var(--border-radius);
    inline-size: 4px;
    block-size: 4px;
    text-align: center;
    background-color: #fc625d;
    box-shadow:
      0 0 0 4px #fc625d,
      20px 0 0 4px #fdbc40,
      40px 0 0 4px #35cd4b;
    cursor: pointer;
    content: '';
  }

  pre .toolbar .toolbar-copy {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 8px;
    z-index: 3;
    border: none;
    padding: 0;
    background: none;
    outline: none;
    cursor: pointer;
  }

  pre .toolbar .toolbar-copy:active {
    transform: scale(0.95);
  }

  .toolbar .toolbar-copy::after {
    user-select: none;
    display: block;
    font-size: 24px;
    font-family: sans-serif;
    color: var(--text-color);
    line-height: 24px;
    content: '⎘';
    transition-property: color, transform;
  }

  .toolbar .toolbar-copy:hover::after {
    color: var(--primary-color, #5794ff);
  }

  pre.line-numbers > code {
    margin: 0 10px 0 54px;
    white-space: inherit;
    counter-reset: linenumber;
  }

  pre.line-numbers .line-numbers-rows {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    overflow-y: auto;
    border-inline-end: 1px solid var(--border-color);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    padding: 32px 0 8px;
    inline-size: 44px;
    max-block-size: inherit;
    font-size: 100%;
    background-color: var(--primary-component-bg);
    letter-spacing: -1px;
    user-select: none;
    pointer-events: none;
    transition-property: background-color, border-color;
  }

  .line-numbers-rows > span {
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span::before {
    display: block;
    padding-inline-end: 0.8em;
    text-align: end;
    color: #999;
    opacity: 0.5;
    content: counter(linenumber);
  }

  pre::-webkit-scrollbar,
  pre ::-webkit-scrollbar {
    display: none;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
`;
const darkCss = css`
  :host {
    --code-color: #eee;
    --code-lang-style-color: #fd9170;
    --code-toolbar-bg: rgb(63 63 63 / 70%);
    --token-atrule: #c792ea;
    --token-attr-name: #ffcb6b;
    --token-attr-value: #a5e844;
    --token-attribute: #a5e844;
    --token-boolean: #c792ea;
    --token-builtin: #ffcb6b;
    --token-cdata: #80cbc4;
    --token-char: #80cbc4;
    --token-class: #ffcb6b;
    --token-class-name: #f2ff00;
    --token-comment: #616161;
    --token-constant: #c792ea;
    --token-deleted: #f66;
    --token-doctype: #616161;
    --token-entity: #f66;
    --token-function: #c792ea;
    --token-hexcode: #f2ff00;
    --token-id: #c792ea;
    --token-important: #c792ea;
    --token-inserted: #80cbc4;
    --token-keyword: #c792ea;
    --token-number: #fd9170;
    --token-operator: #89ddff;
    --token-prolog: #616161;
    --token-property: #80cbc4;
    --token-pseudo-class: #a5e844;
    --token-pseudo-element: #a5e844;
    --token-punctuation: #89ddff;
    --token-regex: #f2ff00;
    --token-selector: #f66;
    --token-string: #a5e844;
    --token-symbol: #c792ea;
    --token-tag: #f66;
    --token-unit: #fd9170;
    --token-url: #f66;
    --token-variable: #f66;
  }
`;

export const prismCss = createMemo(() => {
  return `${theme.scheme === 'dark' ? darkCss : ''}${baseCss}`;
});

export default Prism;
