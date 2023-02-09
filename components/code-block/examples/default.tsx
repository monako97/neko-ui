import { CodeBlock } from 'neko-ui';

const Demo = () => {
  return (
    <CodeBlock
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
