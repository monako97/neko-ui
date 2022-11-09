import { ColorPicker } from 'neko-ui';
import React, { useState } from 'react';

const Demo = () => {
  const [val, setVal] = useState<string>('rgba(255,0,0,0.5)');

  return (
    <div>
      <ColorPicker value={val} onChange={setVal} />
    </div>
  );
};

export default Demo;
