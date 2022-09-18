import React, { useRef } from 'react';
import { BackTop } from 'neko-ui';

const data = new Array(20).fill(0);

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      (ref.current as HTMLDivElement).scrollTop = i * 4;
    }
  }, []);
  return (
    <div ref={ref} style={{ height: 200, overflow: 'auto', position: 'relative' }}>
      <div>
        {data.map((_, i) => {
          return <p key={i}>data-{i}</p>;
        })}
      </div>
      <BackTop visibilityHeight={200} target={() => ref.current || document.body} />
    </div>
  );
};

export default Demo;
