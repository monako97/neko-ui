import { Code } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <Code
      code={`# title
## title
### title
#### title

> 的`}
      lang="markdown"
    />
  );
};

export const title = '案例';
export default Demo;
