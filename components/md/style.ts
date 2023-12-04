import { css } from '@moneko/css';

export const style = css`
  :host,
  :root {
    --table-heading-bg: var(--border-color);
  }

  .n-photo-header > span,
  .n-md-body,
  .n-md-toc {
    backdrop-filter: blur(16px);
    /* stylelint-disable-next-line */
    -webkit-backdrop-filter: blur(16px);
  }

  .n-md-box:not(.site-doc-main) {
    position: relative;
    display: flex;
    margin: 0 auto;
    max-inline-size: 1280px;
    flex-direction: row-reverse;
    gap: 16px;
  }

  .n-md-toc,
  .n-md-body {
    border-radius: var(--border-radius);
    background-color: var(--component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
  }

  .n-md-body {
    overflow: hidden;
    margin: 0 auto 24px;
    padding: 24px;
    color: var(--text-color);
    max-inline-size: 100%;
    box-sizing: border-box;
    overflow-wrap: break-word;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color;
    flex: 1;
  }

  .n-md-body .n-md-body,
  .n-md-body n-md {
    overflow: visible;
    margin: 0;
    padding: 0;
    background-color: unset;
    backdrop-filter: none;
    box-shadow: none;
  }

  .n-md-body:has(div:only-child:empty) {
    margin: 0;
    padding: 0;
    background-color: unset;
    backdrop-filter: none;
    box-shadow: none;
  }

  a {
    position: relative;
    text-decoration: none;
    color: var(--text-color);
  }

  a:visited {
    color: var(--text-secondary);
  }

  a:hover {
    color: var(--primary-hover, #80b3ff);
  }

  p {
    padding: 0;
    font-size: var(--font-size);
    line-height: 1.8;
    vertical-align: baseline;
    word-wrap: break-word;
    word-break: break-word;
    content-visibility: auto;
    contain-intrinsic-size: 32px;
    margin-block-end: 1em;
  }

  ol {
    margin: 0;
    padding: 0 0 0 24px;
    font-size: var(--font-size);
  }

  .n-md-toc {
    position: sticky;
    inset-block-start: 24px;
    inset-inline-end: 0;
    z-index: 10;
    display: block;
    overflow-y: auto;
    margin: 0 0 24px;
    padding: 16px;
    max-inline-size: 200px;
    block-size: fit-content;
    max-block-size: calc(100vb - 132px);
    box-sizing: border-box;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: border-color, background-color, box-shadow;
  }

  .n-md-toc li,
  .n-md-toc ol {
    display: grid;
    inline-size: fit-content;
    max-inline-size: 100%;
    font-size: var(--font-size-sm);
    list-style: none;
  }

  .n-md-toc li a {
    overflow: hidden;
    max-inline-size: 100%;
    font-size: var(--font-size-sm);
    text-overflow: ellipsis;
    text-decoration: none;
    white-space: nowrap;
    color: var(--text-color);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: color;
  }

  .n-md-toc .active,
  .n-md-toc .active a {
    color: var(--primary-color, #5794ff);
    text-shadow: 0 1px var(--primary-shadow);
  }

  .n-md-toc a[href^='http'],
  .n-md-toc a[href^='\/\/'],
  .n-md-body table a[href^='http'] {
    &:not(:has(img, n-img))::after {
      content: ' ⎋';
      opacity: 0.3;
    }
  }

  a[href^='mailto:']::after {
    content: ' 📧';
    opacity: 0.4;
  }

  a[href]::before {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 0;
    inline-size: 100%;
    block-size: 2px;
    background-color: var(--primary-hover, #80b3ff);
    transform: scaleX(0);
    transform-origin: center;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: transform, background-color;
    opacity: 0.5;
    content: '';
  }

  a[href]:has(img, n-img)::before {
    content: none !important;
  }

  a:hover::before {
    transform: scaleX(1);
  }

  th img[src*='browser-logos'] {
    display: block;
    inline-size: 32px;
    block-size: 32px;
  }

  h1::before,
  h2::before,
  h3::before,
  h4::before,
  h5::before,
  h6::before {
    color: var(--primary-color, #5794ff);
    content: attr(data-prefix);
  }

  h1[data-prefix]::before,
  h2[data-prefix]::before,
  h3[data-prefix]::before,
  h4[data-prefix]::before,
  h5[data-prefix]::before,
  h6[data-prefix]::before {
    color: var(--primary-color, #5794ff);
    content: attr(data-prefix) !important;
  }

  code:not([class]),
  mark {
    border-radius: var(--border-radius);
    padding: 2px 7px;
    font-size: 90%;
    color: var(--primary-heading);
    background-color: var(--text-selection);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, color;
  }

  [data-prefix] code,
  [data-prefix] mark {
    font-size: 60%;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-block: 1em;
    font-weight: 500;
    color: var(--text-heading);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: border-color, background-color, box-shadow, color;
  }

  table,
  tr th,
  tr td,
  blockquote,
  blockquote::after,
  blockquote::before,
  blockquote p {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  dl {
    padding: 0;
    margin-block-end: 1em;
  }

  h1 {
    font-size: 1.6em;
    line-height: 54px;
  }

  h2 {
    font-size: 1.5em;
    line-height: 42px;
    counter-increment: section;
  }

  h2::before {
    content: counter(section) '. ';
  }

  h1,
  h2 {
    border-block-end: 1px dotted var(--border-color);
    padding-block-end: 10px;
  }

  h3 {
    font-size: 1.4em;
    line-height: 30px;
  }

  h4 {
    font-size: 1.3em;
    line-height: 28px;
  }

  h5 {
    font-size: 1.2em;
    list-style: none;
  }

  hr {
    margin: 16px 0;
    border: 0 none;
    padding: 0;
    block-size: 2px;
    text-align: start;
    color: var(--text-color);
    background-color: var(--border-color);
  }

  p img,
  p n-img {
    position: relative;
    display: flex;
    overflow: hidden;
    margin: auto;
    border-radius: var(--border-radius);
    max-inline-size: 100%;
    inline-size: fit-content;
    cursor: pointer;
  }

  ul {
    font-size: var(--font-size);
  }

  dl dt {
    margin-block-start: 16px;
    padding: 10px 0;
    font-size: 1em;
    font-weight: bold;
    font-style: italic;
  }

  dl dd {
    margin-block-end: 16px;
    margin-inline-start: 0;
    padding: 0 16px;
  }

  table {
    overflow: hidden;
    margin-block-end: 16px;
    border-block-end: 1px solid var(--table-heading-bg);
    inline-size: 100%;
    max-inline-size: 100%;
    border-spacing: 0;
    transition-property: border-color;
    word-break: break-all;
  }

  table:last-child {
    margin-block-end: 0;
  }

  table tbody tr:nth-child(2n) {
    background-color: var(--primary-details-bg);
  }

  table tbody tr:hover {
    background-color: var(--primary-selection);
  }

  table tr th {
    font-weight: 500;
    min-inline-size: 54px;
    color: var(--text-heading);
    background-color: var(--table-heading-bg);
    transition-property: background-color, color;
  }

  table tr th,
  table td {
    padding: 8px 16px;
  }

  tr:first-child th:first-child {
    border-start-start-radius: var(--border-radius);
  }

  tr:first-child th:last-child {
    border-start-end-radius: var(--border-radius);
  }

  blockquote {
    position: relative;
    margin: 30px 48px;
    border-radius: var(--border-radius);
    padding: 16px;
    font-weight: 500;
    background-color: var(--primary-selection);
    transition-property: background-color;
  }

  blockquote::before,
  blockquote::after {
    position: absolute;
    font-size: 56px;
    font-family: sans-serif;
    color: var(--primary-active);
    transition-property: color;
    content: '❞';
    line-height: 1;
  }

  blockquote::before {
    inset-block-start: -8px;
    inset-inline-start: 0;
    transform: translateX(-44px) rotate(180deg);
  }

  blockquote::after {
    inset-inline-end: 0;
    inset-block-end: -8px;
    transform: translateX(44px);
  }

  blockquote.n-tip {
    margin: 16px 0 16px 8px;
    border-inline-start: 4px solid var(--primary-color, #5794ff);
  }

  blockquote.n-tip::after {
    content: none;
  }

  blockquote.n-tip::before {
    inset-block-start: 18px;
    inset-inline-start: -12px;
    border-radius: 100%;
    inline-size: 20px;
    block-size: 20px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: var(--primary-color, #5794ff);
    transform: none;
    content: '!';
    line-height: 20px;
  }

  blockquote cite {
    font-size: var(--font-size);
    color: var(--cite-color, #bfbfbf);
    line-height: 20px;
  }

  blockquote cite::before {
    content: '\\2014 \\00A0';
  }

  blockquote p {
    margin: auto 0;
    font-size: var(--font-size);
    line-height: 24px;
    transition-property: color;
  }

  details {
    overflow: hidden;
    border-inline-start: 5px solid var(--primary-hover, #5794ff);
    border-radius: var(--border-radius);
    padding: 12px 24px;
    background: var(--primary-details-bg);
    box-sizing: border-box;
    user-select: none;
    box-shadow: 0 2px 8px 0 var(--primary-shadow, rgb(0 0 0 / 5%));
  }

  details,
  details summary {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: background-color, transform, border-color;
  }

  details:not(:last-of-type) {
    margin-block-end: 16px;
  }

  details > summary,
  details > summary ~ * {
    font-size: var(--font-size);
    font-weight: normal;
    font-style: normal;
    line-height: 1.4;
    transition-property: background-color, transform, border-color, margin;
  }

  details > summary:not(:last-of-type) details > summary ~ *:not(:last-of-type) {
    margin-block-end: 16px;
  }

  details > summary {
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transform: translateX(-18px);
  }

  details > summary::-webkit-details-marker,
  details > summary::marker {
    display: none;
    color: transparent;
  }

  details > summary::before {
    display: inline-block;
    margin-inline-end: 4px;
    inline-size: 14px;
    font-weight: lighter;
    text-align: center;
    opacity: 0.5;
    content: '⛌';
    transform: rotate(45deg);
  }

  details[open] {
    user-select: auto;
  }

  details[open] > details {
    margin-block-start: 10px;
  }

  details[open] > summary {
    margin-block-end: 10px;
  }

  details[open] > summary::before {
    transform: rotate(0);
  }

  .katex-display {
    overflow-x: auto;
  }

  .n-photo-header {
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 16px;
  }

  .n-photo-header > span {
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 14px;
    font-weight: lighter;
    background-color: rgb(0 0 0 / 20%);
  }

  .n-code {
    display: block;
    margin-block-end: 16px;
  }

  .n-code:last-child {
    margin-block-end: 0;
  }

  @media screen and (width <= 1100px) {
    .n-md-box,
    .n-md-box:not(.site-doc-main),
    .n-md-body {
      max-inline-size: auto;
    }

    .n-md-toc {
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
