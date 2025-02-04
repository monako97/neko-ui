import type { MarkedOptions, Renderer } from 'marked-completed';
import markedRaw from 'marked-completed/marked.min.js?raw';

export interface WorkerMessage extends MarkedOptions {
  text: string;
  id?: string;
  pictureViewer?: boolean;
  lazyPicture?: boolean;
}

let MARKED_URL: string | null, WORKER_URL: string | null;

function createMarked() {
  return URL.createObjectURL(
    new Blob([markedRaw], {
      type: 'application/javascript',
    }),
  );
}
function createURL() {
  function worker() {
    self.importScripts('MARKED_URL');
    let renderer: Renderer;

    function onMessage(t: MessageEvent<WorkerMessage>) {
      let result: string;

      try {
        if (!renderer) {
          renderer = new self.marked.Renderer();
          renderer.katexBlock = function (code: string) {
            return `<n-katex display-mode="true">${code}</n-katex>`;
          };
          renderer.katexInline = function (code: string) {
            return `<n-katex>${code}</n-katex>`;
          };
        }
        renderer.image = function (src: string, title: string, alt: string) {
          return `<n-img lazy="${t.data.lazyPicture}" disabled="${!t.data.pictureViewer}" role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></n-img>`;
        };
        renderer.code = function (sourcecode: string, lang: string) {
          if (lang === 'treeview') {
            return `<n-tree data="${sourcecode}" />`;
          }
          const needEndod = /<[^>]+>/;

          return `<n-code class="n-code" toolbar="${t.data.langToolbar && !!t.data.langToolbar.length}" language="${lang}">${needEndod.test(sourcecode) ? encodeURIComponent(sourcecode) : sourcecode}</n-code>`;
        };
        result = self.marked(
          t.data.text,
          Object.assign(
            {
              renderer: renderer,
              headerPrefix: '# ',
              breaks: true,
              pedantic: false,
              smartLists: true,
              smartypants: true,
              xhtml: true,
            },
            t.data,
          ),
        );
      } catch (error) {
        result = (error as Error).message;
      }
      self.postMessage(result);
    }
    self.addEventListener('message', onMessage, false);
  }

  return URL.createObjectURL(
    new Blob([`(${worker.toString().replace('MARKED_URL', MARKED_URL!)})(self)`], {
      type: 'application/javascript',
    }),
  );
}
let count = 0;

export function create() {
  count++;
  if (!MARKED_URL) {
    MARKED_URL = createMarked();
  }
  if (!WORKER_URL) {
    WORKER_URL = createURL();
  }
  return WORKER_URL;
}

export function dispose() {
  count--;
  const empty = count <= 0;

  if (empty) {
    URL.revokeObjectURL(MARKED_URL!);
    MARKED_URL = null;
    URL.revokeObjectURL(WORKER_URL!);
    WORKER_URL = null;
  }
  return empty;
}
