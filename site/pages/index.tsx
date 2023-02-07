import React, { type FC, useEffect, useRef, memo } from 'react';
import { useLocation, useOutlet } from '@moneko/core';
import { BackTop } from 'neko-ui';
import Sider from '../components/sider';
import Coverage from '@/components/coverage';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Empty from '@/components/empty';

const App: FC = () => {
  const box = useRef<HTMLElement>(null);
  const readme = useOutlet();
  const location = useLocation();
  const num = useRef<number>(0);

  useEffect(() => {
    num.current++;
    box.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="n-flex n-max-h-[100vh] n-h-full">
      <Sider />
      <Header />
      <main
        ref={box}
        className={
          'n-z-10 n-flex-1 n-overflow-y-auto n-min-h-[calc(100vh-200px)] n-pr-4 n-pl-2 n-py-24'
        }
      >
        <Coverage />
        {readme ? <div>{readme}</div> : <Empty />}
      </main>
      <Footer />
      <BackTop target={() => box.current || document.body} />
    </div>
  );
};

export default memo(App, () => true);
