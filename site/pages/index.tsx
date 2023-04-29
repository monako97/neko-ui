import React, { useEffect, useRef, memo } from 'react';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop, injectGlobal } from 'neko-ui';
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
    margin-block-start: 16px;
    inline-size: calc(100% - 288px);
  }

  .site-sider,
  .site-empty {
    box-shadow: 0 2px 14px 0 var(--primary-shadow);
  }

  .site-doc-main-box {
    box-sizing: border-box;

    .n-md-toc {
      inset-block-start: 16px;
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
    block-size: 100px;
    background: linear-gradient(124deg, ${material});
    background-size: 800% 800%;
    opacity: 0.2;
    content: '';
    transform: translateY(-100px);
    animation: colorful-stripe 15s ease infinite;
  }
  @media screen and (max-width: 1100px) {
    .n-md-box {
      max-width: auto;
    }
    .site-doc-main {
      inline-size: calc(100% - 116px);
    }
    .site-doc-main-box .n-md-toc {
      position: fixed;
      right: 16px;
      transform: translateX(100%);
      transition: transform var(--transition-duration) var(--transition-timing-function) 0.3s;
      &:hover {
        transform: translateX(0);
      }
    }
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
