import { setClipboard, classNames } from '@moneko/common';
import React, { FC, useMemo, useRef } from 'react';
import { highlight } from '../utils/highlight';
import '../utils/prism.css';

export interface CodeProps {
  className?: string;
  code: string;
  lang: string;
  lineNumber?: boolean;
}

const Code: FC<CodeProps> = ({ className, code, lang, lineNumber = true }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const html = useMemo(() => highlight(code, lang), [code, lang]);
  const realLang = useMemo(() => lang.split(' ')[0], [lang]);

  return (
    <>
      <pre
        className={classNames(`language-${lang}`, lineNumber && 'line-numbers', className)}
        ref={codeRef}
      >
        <div className="toolbar" data-lang={realLang}>
          <button
            className="toolbar-copy"
            onClick={() => {
              setClipboard(code, codeRef.current as HTMLPreElement);
            }}
          />
        </div>
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </pre>
    </>
  );
};

export default Code;
