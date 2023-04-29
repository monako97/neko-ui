import React, { useEffect, useMemo, useRef } from 'react';
import { mdxComponents, type ExampleModule, myDemoKv, sso } from '@moneko/core';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from '@moneko/react-live';
import { cx, injectGlobal, Markdown, Prism } from 'neko-ui';

injectGlobal`
  .sandbox-box {
    break-inside: avoid;
    box-sizing: border-box;
    padding-block-end: 16px;
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
    padding: 4px;
    inline-size: fit-content;
    font-size: var(--font-size-sm);
    cursor: pointer;
    border-start-start-radius: var(--border-radius);
    line-height: 16px;
    user-select: none;
    transition-property: background-color, color, transform;
  }

  .sandbox-btn::after {
    display: inline-block;
    font-size: var(--font-size-xs);
    font-family: neko-icon, sans-serif;
    text-indent: 4px;
    content: '\\e63e';
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
    transform: translateY(13px);
    border-end-end-radius: 0;
  }

  .sandbox-live-editor {
    --code-color: var(--text-color);

    border-style: dotted;
    border-width: 1px 0 0;
    padding: 16px;
    margin-inline: -16px;
  }

  .sandbox-live-editor.hide {
    display: none;
  }

  .sandbox-error-msg {
    color: var(--error-color);
  }

  .sandbox-group {
    inline-size: 100%;
  }
`;

const Sandbox: React.FC<ExampleModule> = ({ title, description, ...props }) => {
  const store = useRef(
    sso({
      open: false,
    })
  );
  const { open } = store.current;
  const hasDesc = useMemo(() => !!description?.trim().length, [description]);

  useEffect(() => {
    const _store = store.current;

    return () => {
      _store();
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
              className={cx('sandbox-btn', hasDesc && 'sandbox-btn-desc')}
              data-open={open}
              onClick={() => store.current('open', (prev) => !prev)}
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
          <LiveEditor className={`sandbox-live-editor ${open ? '' : 'hide'}`} prism={Prism} />
        </fieldset>
      </section>
    </LiveProvider>
  );
};

interface SandboxGroupProps {
  name: string;
  col?: number;
  ignore?: string[];
}

export const SandboxGroup: React.FC<SandboxGroupProps> = ({ name, col = 2, ignore = [] }) => {
  return (
    <div
      className="sandbox-group"
      style={{
        columnCount: col,
      }}
    >
      {myDemoKv[name]
        ?.filter((e) => (e.title ? !ignore.includes(e.title) : true))
        .map((m, i) => (
          <Sandbox key={i} {...m} />
        ))}
    </div>
  );
};

export default React.memo(Sandbox, () => true);
