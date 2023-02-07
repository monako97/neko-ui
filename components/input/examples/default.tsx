import { Input } from 'neko-ui';
import React from 'react';

const Demo = () => {
  return (
    <div style={{ width: 375 }}>
      {['text', 'number', 'url', 'email', 'password', 'user', 'tel', 'date', 'time', 'range'].map(
        (item) => {
          return (
            <div key={item} style={{ marginBottom: 8 }}>
              <label htmlFor={item}>{item}: </label>
              <Input
                id={item}
                type={item}
                defaultValue={item}
                placeholder={'请输入'}
                prefix={'😊'}
                suffix={'🔚'}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export const title = '简单使用';
export default Demo;
