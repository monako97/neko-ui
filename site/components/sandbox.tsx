import React, { useState, FC, useEffect, memo, useCallback, useMemo } from 'react';
import { injectGlobal } from '@emotion/css';
import { classNames, isEqual } from '@moneko/common';
import { mdxComponents, type ExampleModule } from '@moneko/core';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from '@moneko/react-live';
import { Markdown, Prism } from 'neko-ui';

const sandboxCss = `
  .sandbox-box {
    break-inside: avoid;
    box-sizing: border-box;
    padding-bottom: 1rem;
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
    border-radius: var(--border-radius, 8px);
  }

  fieldset {
    padding: 0.5rem 1rem 0;
  }

  .sandbox-title {
    padding: 0 0.5rem;
    font-size: 14px;
    font-weight: 500;
  }

  .sandbox-view {
    position: relative;
    padding-bottom: 2rem;
    padding-inline: 0.5rem;
  }

  .sandbox-view > div {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .sandbox-view .n-md-box,
  .sandbox-view pre {
    width: 100%;
  }

  .sandbox-view pre:first-of-type {
    margin-top: 0.5rem;
  }

  .sandbox-info {
    border: var(--border-base);
    border-style: dotted;
    border-width: 0.0625rem 0 0;
    margin-inline: -1rem;
    padding: 0 1rem 0.5rem;
  }

  .sandbox-info .sandbox-title::before {
    content: none;
  }

  .sandbox-description {
    padding: 0 8px;
  }

  .sandbox-description p:first-of-type {
    margin-top: 4px;
  }

  .sandbox-description p:last-of-type {
    margin-bottom: 4px;
  }

  .sandbox-btn {
    position: absolute;
    right: -16px;
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

  .sandbox-btn.sandbox-btn-desc {
    transform: translateY(13px);
    border-bottom-right-radius: 0;
  }

  .sandbox-live-editor {
    --code-color: var(--text-color, rgb(0 0 0 / 65%));

    border-style: dotted;
    border-width: 0.0625rem 0 0;
    padding: 1rem;
    margin-inline: -1rem;
  }

  .sandbox-live-editor.hide {
    display: none;
  }

  .sandbox-error-msg {
    color: var(--error-color);
  }
`;

injectGlobal([sandboxCss]);
const Sandbox: FC<ExampleModule> = ({ title, description, ...props }) => {
  const [init, setInit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(
    function () {
      if (!init) {
        setInit(true);
      }
      setOpen(!open);
    },
    [init, open]
  );
  const hasDesc = useMemo(() => description?.trim().length, [description]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <LiveProvider
      {...props}
      scope={mdxComponents}
      theme={{
        plain: {},
        styles: [],
      }}
    >
      <section className="sandbox-box">
        <fieldset className="sandbox-container">
          <legend className="sandbox-title">{title}</legend>
          <section className="sandbox-view">
            <LiveError className="sandbox-error-msg" />
            <LivePreview />
            <span
              className={classNames('sandbox-btn', hasDesc && 'sandbox-btn-desc')}
              data-open={open}
              onClick={handleOpen}
            >
              编辑示例代码
            </span>
          </section>
          {hasDesc ? (
            <fieldset className="sandbox-info">
              <legend className="sandbox-title">描述</legend>
              <div className="sandbox-description">
                <Markdown text={description} />
              </div>
            </fieldset>
          ) : null}
          {init && (
            <LiveEditor className={`sandbox-live-editor ${open ? '' : 'hide'}`} prism={Prism} />
          )}
        </fieldset>
      </section>
    </LiveProvider>
  );
};

export default memo(Sandbox, isEqual);
