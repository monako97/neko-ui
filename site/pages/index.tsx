import React, { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop, getPrefixCls } from 'neko-ui';
import Sider from '../components/sider';
import Coverage from '@/components/coverage';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Empty from '@/components/empty';
import './index.global.less';
import { classNames } from '@moneko/common';

const App: React.FC = () => {
  const box = useRef<HTMLElement>(null);
  const readme = useOutlet();
  const location = useLocation();

  useEffect(() => {
    box.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={getPrefixCls('site-layout')}>
      <Sider />
      <article className={getPrefixCls('site-container')}>
        <Header />
        <main>
          <article
            className={classNames([
              getPrefixCls('site-readme'),
              !readme && getPrefixCls('site-empty'),
            ])}
            ref={box}
          >
            <Coverage />
            {readme || <Empty />}
            <Footer />
          </article>
        </main>
      </article>
      <BackTop target={() => box.current || document.body} />
    </div>
  );
};

export default App;
