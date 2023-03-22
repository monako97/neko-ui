import React, { type FC, useEffect, useRef, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop } from 'neko-ui';
import Bg from '@/components/bg';
import Coverage from '@/components/coverage';
import Empty from '@/components/empty';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Sider from '@/components/sider';

const waveBg = css`
  #root {
    flex-wrap: wrap;
  }

  .site-doc-main {
    margin-top: 1rem;
    width: calc(100% - 18rem);
  }

  .site-doc-main-box {
    box-sizing: border-box;

    .n-md-toc {
      top: 5.375rem;
    }

    .n-md-body,
    .n-md-toc {
      box-shadow: 0 0.125rem 0.5rem 0 rgb(0 0 0 / 10%);

      .n-md-body {
        box-shadow: none;
      }
    }
  }
`;

injectGlobal([waveBg]);

const App: FC = () => {
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
      <Header />
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
