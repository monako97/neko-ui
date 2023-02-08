import React, { FC, useEffect, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { type ExampleModule, myDemoKv } from '@moneko/core';
import { css } from '@emotion/css';
import { classNames, isFunction } from '@moneko/common';
import { Code } from 'neko-ui';
// import { Code } from '../../es';
import { Sandpack } from '@codesandbox/sandpack-react';
import codesandboxCss from '../../codesandbox/styles.css?raw';
import codesandboxEntry from '../../codesandbox/index.tsx?raw';

interface SnapshotGroupProps {
  name: string;
  col?: number;
}

interface SnapshotProps {
  module: ExampleModule;
  style?: string;
}

const btnCss =
  'n-w-fit n-bg-[#ddd]/50 n-px-4 n-py-0 n-rounded-t n-select-none n-mt-4 n-ml-2 n-float-right n-cursor-pointer n-text-center n-transition-snapshot hover:n-bg-primaryDeprecatedBg hover:n-text-primary';
const openCls = 'n-text-primary n-bg-primaryDeprecatedBg';
const codeCss = css`
  .n-md-body,
  pre {
    margin: 0;
  }
`;

type CodeKind = 'code' | 'style' | 'editor';

const Snapshot: FC<SnapshotProps> = ({ module, style }) => {
  const [open, setOpen] = useState<CodeKind | false>(false);
  const handleOpen = useCallback(
    (e: MouseEvent) => {
      const type = (e.target as HTMLElement).getAttribute('data-type') as CodeKind;

      setOpen(open === type ? false : type);
    },
    [open]
  );
  const styleCode = useMemo(() => (style ? require('@pkg/' + style + '?raw') : null), [style]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <div className="n-transition-snapshot n-rounded n-h-fit n-overflow-hidden n-border-base">
      {module.title && <h3 className="n-p-[1rem!important] n-m-[0!important]">{module.title}</h3>}
      <div className="n-transition-snapshot n-flex n-justify-between n-flex-col n-flex-1 n-p-6 n-pb-0 n-text-right">
        <div className="n-text-left">{isFunction(module.default) ? module.default() : null}</div>
        <div className="n-flex n-items-center n-justify-end n-transition-snapshot">
          {style && (
            <div
              className={classNames(btnCss, open === 'style' && openCls)}
              onClick={handleOpen}
              data-type="style"
            >
              {open === 'style' ? 'hide' : 'show'} style
            </div>
          )}
          {!module.hideSource && (
            <div
              className={classNames(btnCss, open === 'code' && openCls)}
              onClick={handleOpen}
              data-type="code"
            >
              {open === 'code' ? 'hide' : 'show'} source
            </div>
          )}
          <div
            className={classNames(btnCss, open === 'editor' && openCls)}
            onClick={handleOpen}
            data-type="editor"
          >
            {open === 'editor' ? 'hide' : 'show'} editor
          </div>
        </div>
      </div>
      {open && (
        <div className={classNames('n-transition-snapshot n-p-6 n-text-primary', codeCss)}>
          {open === 'code' && (
            <div className="n-transition-snapshot n-animate-silde-in">
              <Code code={module?.codeSoucre} lang="tsx" lineNumber={false} />
            </div>
          )}
          {open === 'style' && (
            <div className="n-transition-snapshot n-animate-silde-in">
              <Code code={styleCode as string} lang="css" lineNumber={false} />
            </div>
          )}
          {open === 'editor' && (
            <div className="n-transition-snapshot n-animate-silde-in">
              <Sandpack
                theme={
                  (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ||
                  'auto'
                }
                template="react-ts"
                files={{
                  '/App.tsx': module?.codeSoucre,
                  '/styles.css': {
                    code: codesandboxCss,
                  },
                  '/index.tsx': {
                    code: codesandboxEntry,
                    hidden: true,
                  },
                }}
                customSetup={{
                  dependencies: {
                    '@emotion/css': '11.10.5',
                    tailwindcss: '3.2.4',
                    'neko-ui': '1.0.29-beta.1',
                  },
                }}
                options={{
                  showConsoleButton: true,
                  wrapContent: true,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SnapshotGroup: FC<SnapshotGroupProps> = ({ name, col = 2 }) => {
  return (
    <div
      className="n-grid n-w-full n-gap-6 n-flex-wrap"
      style={{
        gridTemplateColumns: `repeat(${col},1fr)`,
      }}
    >
      {myDemoKv[name]?.map((module, i) => (
        <Snapshot key={i} module={module} />
      ))}
    </div>
  );
};

export default SnapshotGroup;
