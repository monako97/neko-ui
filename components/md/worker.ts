self.importScripts(new URL('marked-completed/marked.min.js', import.meta.url).toString());

const renderer = new self.marked.Renderer();

renderer.katexBlock = function (code: string) {
  return `<n-katex display-mode="true">${code}</n-katex>`;
};
renderer.katexInline = function (code: string) {
  return `<n-katex>${code}</n-katex>`;
};
function img(src: string, title: string, alt: string) {
  return `<img role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></img>`;
}
function nImg(src: string, title: string, alt: string) {
  return `<n-img role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></n-img>`;
}
self.addEventListener(
  'message',
  function (e) {
    let result;

    try {
      const { text, pictureViewer, ...options } = e.data;
      const langLineNumber = options.langLineNumber;

      renderer.image = pictureViewer ? nImg : img;
      renderer.code = function (code: string, lang: string) {
        if (lang === 'treeview') {
          return `<n-tree data="${code}" />`;
        }
        const toolbar = !!options.langToolbar?.length;

        return `<n-code class="n-code" toolbar="${toolbar}" language="${lang}" ${
          langLineNumber ? 'line-number="true"' : ''
        }>${encodeURIComponent(code)}</n-code>`;
      };
      result = self.marked(text, {
        renderer: renderer,
        langToolbar: false,
        headerPrefix: '# ',
        breaks: true,
        pedantic: false,
        smartLists: true,
        smartypants: true,
        xhtml: true,
        ...options,
      });
    } catch (error) {
      result = error;
    }
    self.postMessage(result);
  },
  false,
);
