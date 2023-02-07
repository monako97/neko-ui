import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
