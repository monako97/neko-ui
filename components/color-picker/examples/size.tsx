import { ColorPicker } from 'neko-ui';
import React, { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');
  //   const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <p>小</p>
      <ColorPicker value={val} onChange={setVal} size="small" />
      <p>默认</p>
      <ColorPicker value={val} onChange={setVal} size="normal" />
      <p>大</p>
      <ColorPicker value={val} onChange={setVal} size="large" />
    </div>
  );
};

export default Demo;
