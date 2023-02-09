import { setClipboard, classNames } from '@moneko/common';
import React, { FC, ReactNode, useMemo, useRef } from 'react';
import { highlight } from '../utils/highlight';
import '../utils/prism.css';

export interface CodeBlockProps {
  className?: string;
  code?: string;
  lang: string;
  lineNumber?: boolean;
  children?: ReactNode;
}

const CodeBlock: FC<CodeBlockProps> = ({ className, code, lang, lineNumber = true, children }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const _html = useMemo(() => code && highlight(code, lang), [code, lang]);
  const realLang = useMemo(() => lang?.split(' ')[0], [lang]);

  return (
    <pre
      className={classNames(`language-${lang}`, lineNumber && 'line-numbers', className)}
      ref={codeRef}
    >
      <div className="toolbar" data-lang={realLang}>
        <button
          className="toolbar-copy"
          onClick={() => {
            setClipboard(
              codeRef.current?.querySelector('code')?.textContent || '',
              codeRef.current as HTMLPreElement
            );
          }}
        />
      </div>
      {children || (
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{
            __html: _html,
          }}
        />
      )}
    </pre>
  );
};

export default CodeBlock;
