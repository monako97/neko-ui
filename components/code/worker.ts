self.importScripts(new URL('prismjs', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-bash.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-clike.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-css.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-diff.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-docker.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-git.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-javascript.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-jsx.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-latex.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-less.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-markdown.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-markup-templating.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-markup.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-regex.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-rust.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-sql.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-swift.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-toml.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-tsx.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-typescript.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-wasm.js', import.meta.url).href);
self.importScripts(new URL('prismjs/components/prism-yaml.js', import.meta.url).href);
// plugins
self.importScripts(
  new URL('prismjs/plugins/diff-highlight/prism-diff-highlight.js', import.meta.url).href,
);
self.importScripts(
  new URL('prismjs/plugins/highlight-keywords/prism-highlight-keywords.js', import.meta.url).href,
);
self.importScripts(
  new URL('prismjs/plugins/line-numbers/prism-line-numbers.js', import.meta.url).href,
);
const diffLang = /^diff-([\w-]+)/i;

function onMessage(e: MessageEvent<string>) {
  let result;

  try {
    const { code, language = 'markup' } = JSON.parse(e.data) as {
      code: string;
      language: string;
    };

    if (diffLang.test(language) && !self.Prism.languages[language]) {
      self.Prism.languages[language] = self.Prism.languages.diff;
    }

    result = self.Prism.highlight(`${code}\n`, self.Prism.languages[language], language);
  } catch (error) {
    result = '';
  }
  self.postMessage(result); // 向主线程发送消息
}

self.addEventListener('message', onMessage, false);
