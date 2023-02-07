import React from 'react';
import { Button, ButtonType } from 'neko-ui';

const Demo = () => {
  const types: ButtonType[] = ['default', 'primary', 'success', 'warning', 'error'];

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {types.map((item) => {
        return (
          <Button key={item} circle type={item as ButtonType}>
            🤔
          </Button>
        );
      })}
    </div>
  );
};

export const title = '⭕️圆形按钮';
export default Demo;
