import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';

type Option = {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export interface RadioProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  disabled?: boolean;
  value?: string | number;
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: string | number) => void;
  layout?: 'vertical' | 'horizontal';
}

const Radio: React.FC<RadioProps> = ({
  layout = 'horizontal',
  className,
  name,
  style,
  disabled,
  options,
  value,
  onChange,
  ...props
}) => {
  const state = useRef(
    sso({
      value,
      options,
      disabled,
      onChange(item: Omit<Option, 'label'>) {
        if (!state.current.disabled && !item.disabled) {
          if (isFunction(onChange)) {
            onChange(item.value);
          } else {
            state.current.value = item.value;
          }
        }
      },
      onKeyUpCapture(key: string, item: Omit<Option, 'label'>) {
        if (key === 'Enter') {
          state.current.onChange(item);
        }
      },
    })
  );
  const { value: val, options: opts, disabled: disable } = state.current;

  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current.options = options;
  }, [options]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);
  return (
    <div {...props} className={cx(cls.box, layout && cls[layout], className)} style={style}>
      {opts?.map(({ label, ...item }, i) => {
        const readOnly = disable || item.disabled;
        const handleChange = () => state.current.onChange(item);

        return (
          <label
            key={`${item.value}-${i}`}
            className={cx(cls.label, item.className)}
            tabIndex={readOnly ? -1 : 0}
            onKeyUpCapture={({ key }) => state.current.onKeyUpCapture(key, item)}
            onClickCapture={handleChange}
            aria-disabled={readOnly}
            data-disabled={readOnly}
            style={item.style}
          >
            <input
              className={cls.radio}
              type="radio"
              name={name}
              value={item.value}
              disabled={readOnly}
              checked={item.value === val}
              onChange={handleChange}
            />
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default Radio;
