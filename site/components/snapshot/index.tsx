/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useState } from 'react';
import CodeBlock from '@/components/code';
import styles from './index.less';

const Snapshot: React.FC<{ path: string; lang: string; style?: string; hideSource?: boolean }> = ({
  path,
  lang,
  style,
  hideSource,
}) => {
  const [code, setCode] = useState<string | null>();
  const [styleCode, setStyleCode] = useState<string | null>();
  const isHtml = lang === 'html';
  const view = require('@pkg/' + path);

  const handleShowSource = useCallback(() => {
    if (code) {
      setCode(null);
    } else {
      setStyleCode(null);
      setCode(require('@pkg/' + path + '?raw'));
    }
  }, [code, path]);
  const handleShowStyle = useCallback(() => {
    if (styleCode) {
      setStyleCode(null);
    } else {
      setCode(null);
      setStyleCode(require('@pkg/' + style + '?raw'));
    }
  }, [style, styleCode]);

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
            className={[styles.toolbar, styleCode && styles.open].join(' ')}
            onClick={handleShowStyle}
          >
            {styleCode ? 'hide' : 'show'} style
          </div>
        )}
        {!hideSource && (
          <div
            className={[styles.toolbar, code && styles.open].join(' ')}
            onClick={handleShowSource}
          >
            {code ? 'hide' : 'show'} source
          </div>
        )}
      </div>
      {(code || styleCode) && (
        <div className={styles.code}>
          {code && <CodeBlock code={code as string} lang={lang} />}
          {styleCode && <CodeBlock code={styleCode as string} lang="css" />}
        </div>
      )}
    </div>
  );
};

export default Snapshot;
