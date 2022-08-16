import React, { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from 'plugin-runtime';
import styles from './index.less';
import { BackTop } from '@pkg/index';
import Sider from '../components/sider';
import Coverage from '@/components/coverage';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Empty from '@/components/empty';

const App: React.FC = () => {
  const box = useRef<HTMLElement>(null);
  const readme = useOutlet();
  const location = useLocation();

  useEffect(() => {
    box.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <Sider />
      <article className={styles.container}>
        <Header />
        <main>
          <article className={[styles.readme, !readme && styles.empty].join(' ')} ref={box}>
            <Coverage />
            {readme || <Empty />}
            <BackTop target={() => box.current || document.body} />
            <Footer />
          </article>
        </main>
      </article>
    </div>
  );
};

export default App;
