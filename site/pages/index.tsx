import React, { type FC, useEffect, useRef, memo } from 'react';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop } from 'neko-ui';
import Sider from '../components/sider';
import Coverage from '@/components/coverage';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Empty from '@/components/empty';
import { css, keyframes } from '@emotion/css';

const waveEffect = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const waveCss = css`
  background: var(--primary-color);
  width: 500vw;
  height: 500vw;
  border-radius: 47%;
  opacity: 0.4;
  position: absolute;
  top: 80%;
  left: -200%;
  transform-origin: center;
  animation: ${waveEffect} 30s infinite linear;
  pointer-events: none;
  &::after,
  &::before {
    content: '';
    position: absolute;
    background: var(--primary-color);
    opacity: 0.6;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 46.5%;
    animation: ${waveEffect} 35s infinite linear;
  }
  &::before {
    opacity: 0.1;
    background: var(--primary-color);
    border-radius: 46%;
    animation: ${waveEffect} 40s infinite linear;
  }
`;

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
      <i className={waveCss} />
      <Header />
      <div
        ref={box}
        id="doc-body"
        className="n-flex n-max-h-[100vh] n-h-full n-overflow-y-auto n-pr-4 n-flex-1 n-pt-24 n-z-10"
      >
        <Sider />
        <main className="n-w-[calc(100%-17rem)] n-pb-24">
          <Coverage />
          {readme ? (
            <div className="n-box-border n-min-h-[calc(100vh-13.25rem)]">{readme}</div>
          ) : (
            <Empty />
          )}
          <Footer />
        </main>
      </div>
      <BackTop target={() => box.current || document.body} />
    </>
  );
};

export default memo(App, () => true);
