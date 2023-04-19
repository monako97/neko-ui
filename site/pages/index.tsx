import React, { useEffect, useRef, memo } from 'react';
import { injectGlobal } from '@emotion/css';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop } from 'neko-ui';
import Bg from '@/components/bg';
import Coverage from '@/components/coverage';
import Empty from '@/components/empty';
import Footer from '@/components/footer';
import Sider from '@/components/sider';

const material = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
].toString();

injectGlobal`
  #root {
    flex-wrap: wrap;
  }

  .site-doc-main {
    margin-block-start: 1rem;
    inline-size: calc(100% - 18rem);
  }

  .site-sider,
  .site-empty {
    box-shadow: 0 0.125rem 0.75rem 0 rgb(0 0 0 / 5%);
  }

  .site-doc-main-box {
    box-sizing: border-box;

    .n-md-toc {
      inset-block-start: 1rem;
    }
  }

  body {
    overflow-x: hidden;
  }

  body::before {
    position: fixed;
    inset-block-start: 0;
    z-index: 1;
    display: block;
    inline-size: 100vi;
    block-size: 6.25rem;
    background: linear-gradient(124deg, ${material});
    background-size: 800% 800%;
    opacity: 0.2;
    content: '';
    transform: translateY(-6.25rem);
    animation: colorful-stripe 15s ease infinite;
  }
`;

const App: React.FC = () => {
  const box = useRef<HTMLDivElement>(null);
  const readme = useOutlet();
  const location = useLocation();
  const num = useRef(0);

  useEffect(() => {
    num.current++;
    box.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Bg />
      <Sider />
      <main className="site-doc-main">
        <Coverage />
        {readme ? <div className="site-doc-main-box">{readme}</div> : <Empty />}
        <Footer />
      </main>
      <BackTop style={{ position: 'fixed' }} />
    </>
  );
};

export default memo(App, () => true);
