import React, { useState, FC, useEffect, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { isEqual } from '@moneko/common';
import { mdxComponents, type ExampleModule } from '@moneko/core';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from '@moneko/react-live';
import { Prism } from 'neko-ui';

const sandboxCss = css`
  .sandbox-box {
    break-inside: avoid;
    box-sizing: border-box;
    padding-bottom: 1rem;
  }

  .sandbox-container,
  .sandbox-view,
  .sandbox-btn,
  .sandbox-live-editor {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  .sandbox-container,
  .sandbox-view,
  .sandbox-live-editor {
    transition-property: border-color;
    border: var(--border-base);
  }

  .sandbox-container {
    border-radius: var(--border-radius, 8px);
  }

  .sandbox-title {
    margin: 0.5rem 0 !important;
    padding: 0 1rem;
    font-weight: 500;
  }

  .sandbox-view {
    position: relative;
    border-width: 0.0625rem 0 0;
    padding: 1rem 1rem 2rem;
  }

  .sandbox-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.25rem;
    width: fit-content;
    font-size: var(--font-size-sm, 12px);
    cursor: pointer;
    border-top-left-radius: var(--border-radius, 8px);
    line-height: 1rem;
    user-select: none;
    transition-property: background-color, color, transform;
  }

  .sandbox-btn::after {
    display: inline-block;
    font-size: var(--font-size-xs, 10px);
    font-family: neko-icon, sans-serif;
    text-indent: 0.25rem;
    content: '\\e63e';
  }

  .sandbox-btn:active {
    transform: scale(0.95);
  }

  .sandbox-btn[data-open='true'] {
    color: white;
    background-color: var(--primary-color, #5794ff);
  }

  .sandbox-btn[data-open='false'] {
    color: var(--primary-color, #5794ff);
    background-color: var(--primary-color-bg, #f0f8ff);
    border-bottom-right-radius: var(--border-radius, 8px);
  }

  .sandbox-live-editor {
    --code-color: var(--text-color, rgb(0 0 0 / 65%));

    border-width: 0.0625rem 0 0;
    padding: 1rem;
  }

  .sandbox-live-editor.hide {
    display: none;
  }

  .sandbox-error-msg {
    color: var(--error-color);
  }
`;

injectGlobal([sandboxCss]);

const Sandbox: FC<ExampleModule> = ({ soucre, title }) => {
  const [init, setInit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <LiveProvider
      code={soucre}
      scope={mdxComponents}
      language="tsx"
      theme={{
        plain: {},
        styles: [],
      }}
    >
      <div className="sandbox-box">
        <div className="sandbox-container">
          <h4 className="sandbox-title">{title}</h4>
          <div className="sandbox-view">
            <LiveError className="sandbox-error-msg" />
            <LivePreview />
            <span
              className="sandbox-btn"
              data-open={open}
              onClick={() => {
                if (!init) {
                  setInit(true);
                }
                setOpen(!open);
              }}
            >
              编辑示例代码
            </span>
          </div>
          {init && (
            <LiveEditor className={`sandbox-live-editor ${open ? '' : 'hide'}`} prism={Prism} />
          )}
        </div>
      </div>
    </LiveProvider>
  );
};

export default memo(Sandbox, isEqual);
