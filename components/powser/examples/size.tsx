import React from 'react';
import { ComponentSize, Powser } from 'neko-ui';

const size: ComponentSize[] = ['large', 'normal', 'small'];

const Demo = () => {
  return (
    <div>
      {size.map((s) => (
        <Powser key={s} size={s} />
      ))}
    </div>
  );
};

export default Demo;
