import React from 'react';
// import A from '@pkg/avatar/README.mdx?raw';
// import * as runtime from 'react/jsx-runtime';
// import { compile, run } from '@mdx-js/mdx';
// import MDX from '@mdx-js/runtime';

const mdx = `
  # Hello, world!
  <Demo />
  <div>Here is the scope variable: {some}</div>
  `;

interface WebViewProps {
  code?: string;
}
// console.log(A, compile, run);
function WebView(props: WebViewProps) {
  //   const [mdxModule, setMdxModule] = useState<{ default: any }>();
  //   const Content = mdxModule ? mdxModule.default : Fragment;

  //   useEffect(() => {
  //     (async () => {
  //       setMdxModule(await compile(code, runtime));
  //     })();
  //     console.log(setMdxModule, runtime, compile, sync);
  //   }, [code]);

  return (
    <div {...props}>
      ac
      {/* <A /> */}
      {/* <Content /> */}
      {mdx}
    </div>
  );
}

// export async function getStaticProps() {
//   const code = String(await compile('# hi', { outputFormat: 'function-body' /* …otherOptions */ }));

//   return { props: { code } };
// }

export default WebView;
