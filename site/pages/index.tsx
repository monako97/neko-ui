import React, { type FC, useEffect, useRef, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop } from 'neko-ui';
import Coverage from '@/components/coverage';
import Empty from '@/components/empty';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Sider from '@/components/sider';

const waveBg = css`
  #doc-body {
    z-index: 10;
    display: flex;
    overflow-y: auto;
    padding-top: 5.375rem;
    padding-right: 1rem;
    height: 100%;
    max-height: 100vh;
    flex: 1;
  }

  .site-doc-main {
    padding-bottom: 6rem;
    width: calc(100% - 17rem);
  }

  .site-doc-main-box {
    box-sizing: border-box;
    min-height: calc(100vh - 13.25rem);
  }

  .site-wave-bg {
    position: absolute;
    top: 80%;
    left: -200%;
    border-radius: 47%;
    width: 500vw;
    height: 500vw;
    background: var(--primary-color, #5794ff);
    opacity: 0.3;
    transform-origin: center;
    animation: site-wave-effect 30s infinite linear;
    pointer-events: none;
  }

  .site-wave-bg::after,
  .site-wave-bg::before {
    position: absolute;
    display: block;
    border-radius: 46.5%;
    width: 100%;
    height: 100%;
    background: var(--primary-color, #5794ff);
    opacity: 0.5;
    content: '';
    animation: site-wave-effect 35s infinite linear;
  }

  .site-wave-bg::before {
    border-radius: 46%;
    background: var(--primary-color, #5794ff);
    opacity: 0.1;
    animation: site-wave-effect 40s infinite linear;
  }

  @keyframes site-wave-effect {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

injectGlobal([waveBg]);

const App: FC = () => {
  const box = useRef<HTMLDivElement>(null);
  const readme = useOutlet();
  const location = useLocation();
  const num = useRef<number>(0);

  useEffect(() => {
    num.current++;
    box.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <i className="site-wave-bg n-flex" />
      <Header />
      <div ref={box} id="doc-body">
        <Sider />
        <main className="site-doc-main">
          <Coverage />
          {readme ? <div className="site-doc-main-box">{readme}</div> : <Empty />}
          <Footer />
        </main>
      </div>
      <BackTop target={() => box.current || document.body} />
    </>
  );
};

export default memo(App, () => true);
