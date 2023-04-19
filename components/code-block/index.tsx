import React, { useMemo, useRef } from 'react';
import { setClipboard } from '@moneko/common';
import { cx } from '../emotion';
import highlight from '../highlight';

export interface CodeBlockProps {
  className?: string;
  code?: string;
  lang: string;
  lineNumber?: boolean;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  code,
  lang,
  lineNumber = true,
  children,
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const _html = useMemo(() => (code ? highlight(code, lang) : ''), [code, lang]);
  const realLang = useMemo(() => lang?.split(' ')[0], [lang]);

  return (
    <pre className={cx(`language-${lang}`, lineNumber && 'line-numbers', className)} ref={codeRef}>
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
