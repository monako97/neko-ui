import { type ComponentSize, Input } from 'neko-ui';
import React from 'react';

const Demo = () => {
  const sizes: ComponentSize[] = ['normal', 'small', 'large'];

  return (
    <div style={{ width: 375 }}>
      {sizes.map((item) => {
        return (
          <div key={item} style={{ marginBottom: 8 }}>
            <label htmlFor={item}>{item}: </label>
            <Input id={item} size={item} placeholder={'请输入'} prefix={'😊'} suffix={'🔚'} />
          </div>
        );
      })}
    </div>
  );
};

export const title = '不同尺寸';
export default Demo;
