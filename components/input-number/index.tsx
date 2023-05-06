import React, { useEffect, useRef } from 'react';
import { passiveSupported } from '@moneko/common';
import sso from 'shared-store-object';
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
  const state = useRef(
    sso({
      move: false,
      value,
      precision,
      step,
      min,
      max,
      mouseUp() {
        state.current.move = false;
      },
      mouseMove({ movementX, movementY }: { movementX: number; movementY: number }) {
        const _val = state.current.value;
        const val = typeof _val === 'number' && !isNaN(_val) ? _val : 0;

        state.current.change(
          Number(
            Number(val + (movementX - movementY) * state.current.step).toFixed(
              state.current.precision
            )
          )
        );
      },
      mouseDown(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        state.current.move = true;
        onMouseDown?.(e);
      },
      keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowUp') {
          state.current.mouseMove({ movementX: 0, movementY: -1 });
        } else if (e.key === 'ArrowDown') {
          state.current.mouseMove({ movementX: 0, movementY: 1 });
        }
        onKeyDown?.(e);
      },
      change(val?: string | number) {
        let _val = typeof val === 'string' ? parseFloat(val) : val;

        if (isNaN(_val as number)) {
          _val = '' as unknown as number;
        }
        if (typeof _val !== 'undefined') {
          if (_val < state.current.min) _val = state.current.min;
          if (_val > state.current.max) _val = state.current.max;
        }
        if (state.current.value !== _val) {
          state.current.value = _val;
          onChange?.(_val);
        }
      },
    })
  );
  const { move } = state.current;

  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current.precision = precision;
  }, [precision]);
  useEffect(() => {
    state.current.step = step;
  }, [step]);
  useEffect(() => {
    state.current.min = min;
  }, [min]);
  useEffect(() => {
    state.current.max = max;
  }, [max]);
  useEffect(() => {
    const _state = state.current;

    if (move) {
      document.body.addEventListener('mousemove', _state.mouseMove, passiveSupported);
    }
    return () => {
      document.body.removeEventListener('mousemove', _state.mouseMove, passiveSupported);
    };
  }, [move]);
  useEffect(() => {
    const _state = state.current;

    document.body.addEventListener('mouseup', _state.mouseUp, passiveSupported);
    return () => {
      document.body.removeEventListener('mouseup', _state.mouseUp, passiveSupported);
      _state();
    };
  }, []);

  return (
    <Input
      {...prpos}
      className={cx(cls.number, className)}
      value={value}
      max={max}
      min={min}
      onChange={state.current.change}
      onMouseDown={state.current.mouseDown}
      onKeyDown={state.current.keyDown}
      parser={parser}
      formatter={formatter}
    />
  );
};

export default InputNumber;
