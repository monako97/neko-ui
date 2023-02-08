import React, { FC, memo, ReactNode } from 'react';
import { Markdown } from 'neko-ui';

const Box: FC<{ children?: ReactNode; text?: string; tex?: boolean }> = ({
  children,
  text,
  tex,
}) => {
  return (
    <>
      {text ? (
        <Markdown
          text={text}
          tex={tex}
          getAnchorContainer={() => document.querySelector('header + #doc-body') || document.body}
        />
      ) : null}
      {children ? <div className="n-md-body">{children}</div> : null}
    </>
  );
};

export default memo(Box, () => true);
