import express, { type Response } from 'express';
import { renderToStream } from 'solid-js/web';

const app = express();

app.get('*', (res: Response) => {
  return renderToStream(() => <h1>Hello World</h1>).pipe(res);
  // return res;
});
const port = 3003;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
