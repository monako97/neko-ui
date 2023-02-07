import { Code } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <Code
      code={`@@ -4,6 +4,5 @@
-    let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
+    const foo = bar.baz([1, 2, 3]) + 1;
     console.log(\`foo: \${foo}\`);
`}
      lang="diff-javascript match-braces no-brace-select"
    />
  );
};

export const title = '括号对禁用选中效果';
export default Demo;
