import { css } from '@moneko/css';

export const mdNoShadowCss = css`
  .n-md-body {
    padding: 0;
    margin-block-end: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;

export const codeNoShadowCss = css`
  .n-editor,
  pre {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    box-shadow: none;
  }
`;

export const sandboxCss = css`
  :host {
    display: inline-block;
    inline-size: 100%;
    max-inline-size: 100%;
    break-inside: avoid;
    color: var(--text-color);
  }

  .sandbox-box {
    break-inside: avoid;
    box-sizing: border-box;
  }

  .sandbox-container,
  .sandbox-info,
  .sandbox-view,
  .sandbox-btn,
  .sandbox-live-editor {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  .sandbox-container,
  .sandbox-info,
  .sandbox-live-editor {
    transition-property: border-color;
    border: var(--border-base);
  }

  .sandbox-container {
    border-radius: var(--border-radius);
  }

  fieldset {
    padding: 8px 16px 0;
  }

  .sandbox-title {
    padding: 0 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .sandbox-view {
    position: relative;
    padding-block-end: 32px;
    padding-inline: 8px;
  }

  .sandbox-view > div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .sandbox-view > .lang-btn {
    position: absolute;
    z-index: 1;
    display: inline-block;
    margin: auto;
    inline-size: fit-content;
    inset-inline: 0;
    inset-block-end: 0;
    transform: translateY(calc(50%)) scale(0.8);
  }

  .sandbox-view .n-md-box,
  .sandbox-view pre {
    inline-size: 100%;
  }

  .sandbox-view pre:first-of-type {
    margin-block-start: 8px;
  }

  .sandbox-info {
    border: var(--border-base);
    border-style: dotted;
    border-width: 1px 0 0;
    margin-inline: -16px;
    margin-block-start: -12px;
    padding: 0 16px 8px;
  }

  .sandbox-info .sandbox-title::before {
    content: none;
  }

  .sandbox-description {
    padding: 0 8px;
  }

  .sandbox-description p:first-of-type {
    margin-block-start: 4px;
  }

  .sandbox-description p:last-of-type {
    margin-block-end: 4px;
  }

  .sandbox-btn {
    position: absolute;
    inset-inline-end: -16px;
    inset-block-end: 0;
    padding: 0 4px;
    inline-size: fit-content;
    font-size: var(--font-size-sm);
    cursor: pointer;
    border-start-start-radius: var(--border-radius);
    line-height: 24px;
    user-select: none;
    transition-property: background-color, color, transform;
  }

  .sandbox-btn::after {
    display: inline-block;
    text-indent: 4px;
    line-height: 1;
    content: '{ ... }';
  }

  .sandbox-btn:active {
    transform: scale(0.95);
  }

  .sandbox-btn[data-open='true'] {
    color: white;
    background-color: var(--primary-color);
  }

  .sandbox-btn[data-open='false'] {
    color: var(--primary-color);
    background-color: var(--primary-outline);
    border-end-end-radius: var(--border-radius);
  }

  .sandbox-btn.sandbox-btn-desc {
    transform: translateY(12px);
    border-end-end-radius: 0;
    border-end-start-radius: var(--border-radius);
  }

  .sandbox-live-editor {
    display: block;
    margin: 0 -16px;
    border-style: dotted;
    border-width: 1px 0 0;
    inline-size: calc(100% + 32px);
  }

  .sandbox-live-editor.hide {
    display: none;
  }

  .sandbox-error-msg,
  .n-preview-error {
    color: var(--error-color);
  }

  n-code-live::part(root) {
    display: block;
    gap: 4px;
  }
`;

export const groupCss = css`
  .sandbox-group {
    display: flex;
    margin: 0 auto 24px;
    border-radius: var(--border-radius);
    padding: 24px;
    background-color: var(--component-bg);
    box-shadow: 0 2px 8px 0 var(--primary-shadow);
    inline-size: 100%;
    max-inline-size: 1280px;
    box-sizing: border-box;
    flex-wrap: wrap;
    gap: 16px 24px;
  }

  @media screen and (width <= 580px) {
    site-sandbox {
      flex: 100% !important;
    }
  }
`;
