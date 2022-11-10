import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CodeBlock from '../code';
import styles from './index.less';
import { Sandpack } from '@codesandbox/sandpack-react';
import codesandboxCss from '../../../codesandbox/styles.css?raw';
import codesandboxEntry from '../../../codesandbox/index.tsx?raw';
import { classNames } from '@moneko/common';

const Snapshot: React.FC<{
  title: string;
  path: string;
  lang: string;
  style?: string;
  hideSource?: boolean;
  cols?: number;
}> = ({ path, lang, style, hideSource, cols, title }) => {
  const [visible, setVisible] = useState<'code' | 'style' | 'editor' | false>(false);
  const isHtml = lang === 'html';
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const view = useMemo(() => require('@pkg/' + path), [path]);
  const handleVisible = useCallback(
    (type: 'code' | 'style' | 'editor') => {
      setVisible(visible === type ? false : type);
    },
    [visible]
  );
  const code = useMemo(() => (path ? require('@pkg/' + path + '?raw') : null), [path]);
  const styleCode = useMemo(() => (style ? require('@pkg/' + style + '?raw') : null), [style]);

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div className={classNames(styles.snapshot, cols && styles[`cols${cols}`])}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.preview}>
        <div className={styles.view}>
          {isHtml ? (
            <div
              dangerouslySetInnerHTML={{
                __html: view,
              }}
            />
          ) : (
            React.createElement(view.default)
          )}
        </div>
        <div className={styles.toolbar}>
          {style && (
            <div
              className={classNames(styles.btn, visible === 'style' && styles.open)}
              onClick={() => handleVisible('style')}
            >
              {visible === 'style' ? 'hide' : 'show'} style
            </div>
          )}
          {!hideSource && (
            <div
              className={classNames(styles.btn, visible === 'code' && styles.open)}
              onClick={() => handleVisible('code')}
            >
              {visible === 'code' ? 'hide' : 'show'} source
            </div>
          )}
          <div
            className={classNames(styles.btn, visible === 'editor' && styles.open)}
            onClick={() => handleVisible('editor')}
          >
            {visible === 'editor' ? 'hide' : 'show'} editor
          </div>
        </div>
      </div>
      {visible && (
        <div className={styles.code}>
          {visible === 'code' && <CodeBlock code={code as string} lang={lang} />}
          {visible === 'style' && <CodeBlock code={styleCode as string} lang="css" />}
          {visible === 'editor' && (
            <div className={styles.editor}>
              <Sandpack
                theme={
                  (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ||
                  'auto'
                }
                template="react-ts"
                files={{
                  '/App.tsx': code,
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
                    'neko-ui': '^1.0.18',
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

export default Snapshot;
