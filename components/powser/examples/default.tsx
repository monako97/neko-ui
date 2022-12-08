import React, { useState } from 'react';
import { Powser } from 'neko-ui';

const Demo = () => {
  const [val, setVal] = useState(true);

  return (
    <React.Fragment>
      <Powser value={val} onChange={(v) => setVal(v)} />
      {String(val)}
    </React.Fragment>
  );
};

export default Demo;
