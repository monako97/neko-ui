import { classNames } from '@moneko/common';
import React, { useCallback, useEffect, useState } from 'react';
import { ComponentSize, getPrefixCls } from '..';
import './index.global.less';

export interface PowserProps {
  className?: string;
  size?: ComponentSize;
  value?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (v: boolean) => void;
}

const Powser: React.FC<PowserProps> = ({ className, size = 'normal', value = false, onChange }) => {
  const [checked, setChecked] = useState(value);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  useEffect(() => {
    onChange?.(checked);
  }, [checked, onChange]);
  return (
    <label className={classNames(getPrefixCls('power'), getPrefixCls('power-' + size), className)}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <div
        onAnimationEnd={() => {
          console.log('onAnimationEnd');
        }}
      >
        <svg viewBox="0 0 44 44">
          <path
            d="M22,6 C31,6 38,13 38,22 C38,31 31,38 22,38 C13,38 6,31 6,22 C6,13 13,6 22,6 L22,28"
            id="path"
          />
        </svg>
      </div>
    </label>
  );
};

export default Powser;
