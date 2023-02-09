import { ColorPalette } from 'neko-ui';
import { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');

  return (
    <ColorPalette
      value={val}
      onChange={setVal}
      style={{ margin: '0 auto 16px', display: 'block' }}
    />
  );
};

export const title = '代码演示';
export default Demo;
