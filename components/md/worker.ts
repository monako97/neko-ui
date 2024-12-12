import type { MarkedOptions } from 'marked-completed';

self.importScripts('https://cdn.jsdelivr.net/npm/marked-completed/marked.min.js');

function onMessage(e: MessageEvent<string>) {
  let result;

  try {
    const { text, pictureViewer, lazyPicture, langToolbar, ...options } = JSON.parse(e.data) as {
      text: string;
      pictureViewer?: boolean;
      lazyPicture?: boolean;
      langToolbar?: string[];
    } & MarkedOptions;
    const renderer = new self.marked.Renderer();

    renderer.katexBlock = function (code: string) {
      return `<n-katex display-mode="true">${code}</n-katex>`;
    };
    renderer.katexInline = function (code: string) {
      return `<n-katex>${code}</n-katex>`;
    };
    renderer.image = (src: string, title: string, alt: string) => {
      return `<n-img lazy="${lazyPicture}" disabled="${!pictureViewer}" role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></n-img>`;
    };
    const toolbar = !!langToolbar?.length;

    renderer.code = function (code: string, lang: string) {
      if (lang === 'treeview') {
        return `<n-tree data="${code}" />`;
      }

      return `<n-code class="n-code" toolbar="${toolbar}" language="${lang}">${encodeURIComponent(code)}</n-code>`;
    };

    result = self.marked(text, {
      renderer: renderer,
      langToolbar: langToolbar,
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
}

self.addEventListener('message', onMessage, false);
