import { Markdown, MarkdownProps } from 'neko-ui';
import React from 'react';

const MD = (props: MarkdownProps) => {
  return (
    <Markdown
      {...props}
      getAnchorContainer={() => document.querySelector('main article') || document.body}
    />
  );
};

export default MD;
