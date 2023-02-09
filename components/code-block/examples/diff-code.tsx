import { CodeBlock } from 'neko-ui';

const Demo = () => {
  return (
    <>
      <CodeBlock
        code={`@@ -4,6 +4,5 @@
-    let foo = bar.baz([1, 2, 3]);
-    foo = foo + 1;
+    const foo = bar.baz([1, 2, 3]) + 1;
     console.log(\`foo: \${foo}\`);
`}
        lang="diff-javascript"
      />
      <CodeBlock
        code={`@@ -111,6 +114,9 @@
  nasty_btree_map.insert(i, MyLeafNode(i));
}

- let mut zst_btree_map: BTreeMap<(), ()> = BTreeMap::new();
- zst_btree_map.insert((), ());
- // VecDeque
  let mut vec_deque = VecDeque::new();
  vec_deque.push_back(5);
  `}
        lang="diff-rust"
      />
    </>
  );
};

export const title = 'Diff Code';
export default Demo;
