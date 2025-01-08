import type { MarkedOptions, Renderer } from 'marked-completed';

import { code, image, katexBlock, katexInline } from './common';

export interface WorkerMessage extends MarkedOptions {
  text: string;
  id?: string;
  pictureViewer?: boolean;
  lazyPicture?: boolean;
}

let MARKED_URL: string | null, WORKER_URL: string | null;

async function createMarked() {
  const markedRaw = (await import('marked-completed?raw')).default;

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
          renderer.katexBlock("'");
          renderer.katexInline("'");
        }
        renderer.image(...("'" as unknown as [string, string, string]));
        renderer.code(...("'" as unknown as [string, string, false]));
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
    new Blob(
      [
        `(${worker.toString().replace('MARKED_URL', MARKED_URL!).replace(`katexBlock("'")`, `katexBlock=${katexBlock}`).replace(`katexInline("'")`, `katexInline=${katexInline}`).replace(`image(..."'")`, `image=(${image})(t.data.lazyPicture, t.data.pictureViewer)`).replace(`code(..."'")`, `code=(${code})(t.data.langToolbar)`)})(self)`,
      ],
      {
        type: 'application/javascript',
      },
    ),
  );
}
let count = 0;

export async function create() {
  count++;
  if (!MARKED_URL) {
    MARKED_URL = await createMarked();
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
