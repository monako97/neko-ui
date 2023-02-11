import React, { FC, memo, ReactNode } from 'react';
import { Markdown } from 'neko-ui';

interface BoxProps {
  children?: ReactNode;
  text?: string;
  tex?: boolean;
}
const Box: FC<BoxProps> = ({ children, text, tex }) => {
  const body = text ? (
    <Markdown
      text={text}
      tex={tex}
      getAnchorContainer={() => document.querySelector('header + #doc-body') || document.body}
    />
  ) : null;

  return children ? (
    <div className="n-md-body">
      {children}
      {body}
    </div>
  ) : (
    body
  );
};

export default memo(Box, () => true);
