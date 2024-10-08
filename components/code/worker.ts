self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-clike.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-css.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-diff.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-docker.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-git.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-jsx.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-latex.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-less.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markdown.js');
self.importScripts(
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup-templating.js',
);
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-regex.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-rust.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-sql.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-swift.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-toml.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-tsx.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-wasm.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-yaml.js');
self.importScripts('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.js');
// plugins
self.importScripts(
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/diff-highlight/prism-diff-highlight.js',
);
self.importScripts(
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/highlight-keywords/prism-highlight-keywords.js',
);
self.importScripts(
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.js',
);

function onMessage(e: MessageEvent<string>) {
  let result;

  try {
    const { code, language = 'markup' } = JSON.parse(e.data) as {
      code: string;
      language: string;
    };

    if (/^diff-([\w-]+)/i.test(language) && !self.Prism.languages[language]) {
      self.Prism.languages[language] = self.Prism.languages.diff;
    }

    result = self.Prism.highlight(`${code}\n`, self.Prism.languages[language], language);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    result = '';
  }
  self.postMessage(result); // 向主线程发送消息
}

self.addEventListener('message', onMessage, false);
