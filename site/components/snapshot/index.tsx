import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CodeBlock from '../code';
import styles from './index.less';
import { Sandpack } from '@codesandbox/sandpack-react';
import codesandboxCss from '../../../codesandbox/styles.css?raw';
import codesandboxEntry from '../../../codesandbox/index.tsx?raw';

const Snapshot: React.FC<{ path: string; lang: string; style?: string; hideSource?: boolean }> = ({
  path,
  lang,
  style,
  hideSource,
}) => {
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
    <div className={styles.snapshot}>
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
        {style && (
          <div
            className={[styles.toolbar, visible === 'style' && styles.open].join(' ')}
            onClick={() => handleVisible('style')}
          >
            {visible === 'style' ? 'hide' : 'show'} style
          </div>
        )}
        {!hideSource && (
          <div
            className={[styles.toolbar, visible === 'code' && styles.open].join(' ')}
            onClick={() => handleVisible('code')}
          >
            {visible === 'code' ? 'hide' : 'show'} source
          </div>
        )}
        <div
          className={[styles.toolbar, visible === 'editor' && styles.open].join(' ')}
          onClick={() => handleVisible('editor')}
        >
          {visible === 'editor' ? 'hide' : 'show'} editor
        </div>
      </div>
      {visible && (
        <div className={styles.code}>
          {visible === 'code' && <CodeBlock code={code as string} lang={lang} />}
          {visible === 'style' && <CodeBlock code={styleCode as string} lang="css" />}
          {visible === 'editor' && (
            <Sandpack
              theme={
                (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'auto'
              }
              template="react-ts"
              files={{
                '/App.tsx': code,
                '/styles.css': {
                  code: codesandboxCss,
                  hidden: true,
                },
                '/index.tsx': {
                  code: codesandboxEntry,
                  hidden: true,
                },
              }}
              customSetup={{
                dependencies: {
                  'neko-ui': '^1.0.17',
                },
              }}
              options={{
                showConsoleButton: true,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Snapshot;
