import { css } from '@moneko/css';

export const style = css`
  :host {
    position: relative;
    box-sizing: border-box;
  }

  .not-toolbar code {
    padding-block-start: 8px !important;

    .line-numbers-rows {
      padding-block-start: 8px !important;
    }
  }

  .n-editor {
    --font-size: 13px;

    margin-block-start: 0;
    position: relative;

    textarea {
      position: absolute;
      z-index: 1;
      margin: 0;
      border: none;
      padding: 0;
      font-size: var(--font-size);
      white-space: inherit;
      color: transparent;
      background-color: transparent;
      outline: none;
      resize: none;
      box-sizing: border-box;
      inset-block: 32px 8px;
      inset-inline: 16px;
      min-block-size: 64px;
      caret-color: var(--text-color);
      block-size: fit-content;
      line-height: inherit !important;

      &.line-numbers {
        inset-inline: 54px 10px;
      }

      &.not-toolbar {
        inset-block-start: 8px;
        min-block-size: 20px;
      }
    }

    pre {
      margin-block-start: 0 !important;
      pointer-events: none;
      inline-size: 100%;
      block-size: 100%;
      min-block-size: 65px;
      line-height: inherit !important;

      &.not-toolbar {
        min-block-size: 36px;
      }

      .toolbar {
        pointer-events: all;
      }

      code {
        line-height: inherit !important;
      }
    }
  }
`;
