import { Markdown, MarkdownProps } from 'neko-ui';
import React, { memo } from 'react';

const MD = (props: MarkdownProps) => {
  return (
    <Markdown
      text={props.text}
      getAnchorContainer={() => document.querySelector('header + main') || document.body}
    />
  );
};

export default memo(MD, () => true);
