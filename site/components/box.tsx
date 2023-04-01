import React, { type FC, type ReactNode } from 'react';
import { Markdown } from 'neko-ui';

interface BoxProps {
  children?: ReactNode;
  text?: string;
  tex?: boolean;
}
const Box: FC<BoxProps> = ({ children, text, tex }) => {
  const body = text ? <Markdown text={text} tex={tex} /> : null;

  return children ? (
    <article className="n-md-body">
      {children}
      {body}
    </article>
  ) : (
    body
  );
};

export default Box;
