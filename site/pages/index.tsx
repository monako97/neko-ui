import React, { type FC, useEffect, useRef, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
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
];
const waveBg = css`
  #root {
    flex-wrap: wrap;
  }

  .site-doc-main {
    margin-top: 1rem;
    width: calc(100% - 18rem);
  }

  .site-sider,
  .site-empty {
    box-shadow: 0 0.125rem 0.75rem 0 rgb(0 0 0 / 5%);
  }

  .site-doc-main-box {
    box-sizing: border-box;
  }

  body::before {
    position: fixed;
    top: 0;
    z-index: 1;
    display: block;
    width: 100vw;
    height: 100px;
    background: linear-gradient(124deg, ${material.toString()});
    background-size: 1000% 1000%;
    opacity: 0.15;
    content: '';
    transform: translateY(-99.99px);
    animation: rainbow 15s ease infinite;
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 80%;
    }

    50% {
      background-position: 100% 20%;
    }

    100% {
      background-position: 0% 80%;
    }
  }
`;

injectGlobal([waveBg]);

const App: FC = () => {
  const box = useRef<HTMLDivElement>(null);
  const readme = useOutlet();
  const location = useLocation();
  const num = useRef(0);
  // const current: PkgType = useMemo(
  //   () =>
  //     (myPkgs.find((item) => item.key === location.pathname.substring(1)) as unknown as PkgType) ||
  //     projectInfo,
  //   [location.pathname]
  // );

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
      <BackTop />
    </>
  );
};

export default memo(App, () => true);
