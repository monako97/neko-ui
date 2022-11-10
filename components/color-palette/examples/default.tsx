import { ColorPalette } from 'neko-ui';
import React, { useState } from 'react';

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

export default Demo;
