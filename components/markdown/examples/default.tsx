import { Markdown } from 'neko-ui';
import React from 'react';

const text = `### h1 \n 
> csacas

\`\`\`markdown
# title
## title
### title
#### title

> 的
\`\`\`
`;

const Demo = () => {
  return <Markdown pictureViewer={false} langLineNumber={false} tools={[]} text={text} />;
};

export const title = '案例';
export default Demo;
