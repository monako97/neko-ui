import React, { useCallback, useEffect, useRef, useState } from 'react';
import { passiveSupported, throttle } from '@moneko/common';
import { cls } from './style';
import { cx } from '../emotion';
import { Input, type InputProps } from '../index';

export interface InputNumberProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value?: number) => void;
  /** 每次改变步数，可以为小数 */
  step?: number;
  /** 数值精度 */
  precision?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  formatter,
  parser,
  onChange,
  onMouseDown,
  onKeyDown,
  precision = 2,
  className,
  ...prpos
}) => {
  const valRef = useRef<number | undefined>(value);
  const [move, setMove] = useState<boolean>(false);
  const handleChange = useCallback(
    (val?: string | number) => {
      let _val = typeof val === 'string' ? parseFloat(val) : val;

      if (typeof _val !== 'undefined') {
        if (_val < min) _val = min;
        if (_val > max) _val = max;
      }
      if (valRef.current !== _val) {
        Object.assign(valRef, {
          current: _val,
        });
        onChange?.(_val);
      }
    },
    [max, min, onChange]
  );
  const handleMouseDown: React.MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setMove(true);
      onMouseDown?.(e);
    },
    [onMouseDown]
  );
  const handleMouseMove = throttle(
    useCallback(
      ({ movementX, movementY }: { movementX: number; movementY: number }) => {
        const allStep = (movementX - movementY) * step;
        const val =
          typeof valRef.current === 'number' && !isNaN(valRef.current) ? valRef.current : 0;

        handleChange(Number(Number(val + allStep).toFixed(precision)));
      },
      [step, handleChange, precision]
    ),
    4
  );
  const handleMouseUp = useCallback(() => {
    setMove(false);
  }, []);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'ArrowUp') {
        handleMouseMove({ movementX: 0, movementY: 1 });
      } else if (e.key === 'ArrowDown') {
        handleMouseMove({ movementX: 0, movementY: -1 });
      }
      onKeyDown?.(e);
    },
    [handleMouseMove, onKeyDown]
  );

  useEffect(() => {
    Object.assign(valRef, {
      current: value,
    });
  }, [value]);
  useEffect(() => {
    if (move) {
      document.body.addEventListener('mouseup', handleMouseUp, passiveSupported);
      document.body.addEventListener('mousemove', handleMouseMove, passiveSupported);
    }
    return () => {
      document.body.removeEventListener('mouseup', handleMouseUp, passiveSupported);
      document.body.removeEventListener('mousemove', handleMouseMove, passiveSupported);
    };
  }, [handleMouseMove, handleMouseUp, move]);

  return (
    <Input
      {...prpos}
      className={cx(cls.number, className)}
      value={value}
      max={max}
      min={min}
      onChange={(v) => handleChange(v)}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      parser={parser}
      formatter={formatter}
    />
  );
};

export default InputNumber;
