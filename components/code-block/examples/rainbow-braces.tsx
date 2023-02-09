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
      lang="diff-javascript match-braces rainbow-braces"
    />
  );
};

export const title = '括号对带有彩虹括号';
export default Demo;
