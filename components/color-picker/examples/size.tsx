import { ColorPicker } from 'neko-ui';
import React, { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');

  return (
    <div>
      <span style={{ margin: 16 }}>小</span>
      <ColorPicker value={val} onChange={setVal} size="small" />
      <span style={{ margin: 16 }}>默认</span>
      <ColorPicker value={val} onChange={setVal} size="normal" />
      <span style={{ margin: 16 }}>大</span>
      <ColorPicker value={val} onChange={setVal} size="large" />
    </div>
  );
};

export default Demo;
