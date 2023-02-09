import { useRef } from 'react';
import { BackTop } from 'neko-ui';

const data = new Array(20).fill(0);

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ height: 200, overflow: 'auto', position: 'relative' }}>
      <div>
        {data.map((_, i) => (
          <p key={i}>data {i}</p>
        ))}
      </div>
      <BackTop
        visibilityHeight={200}
        target={() => ref.current || document.body}
        getPopupContainer={(node) => node}
      />
    </div>
  );
};

export default Demo;
