import { CodeBlock } from 'neko-ui';

const Demo = () => {
  return (
    <CodeBlock
      code={`@@ -4,6 +4,5 @@

- let foo = bar.baz([1, 2, 3]);
- foo = foo + 1;

* const foo = bar.baz([1, 2, 3]) + 1;
  console.log(\`foo: \${foo}\`);
`}
      lang="diff-javascript match-braces"
    />
  );
};

export const title = '突出显示括号对';
export default Demo;
