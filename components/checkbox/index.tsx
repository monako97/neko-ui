import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import type { RadioOption } from '../radio';

export interface CheckboxOption extends RadioOption {
  label: React.ReactNode;
}
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  disabled?: boolean;
  value?: (string | number)[];
  options: RadioOption[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: (string | number)[]) => void;
  layout?: 'vertical' | 'horizontal';
}
const Checkbox: React.FC<CheckboxProps> = ({
  layout = 'horizontal',
  className,
  name,
  style,
  disabled,
  options,
  value = [],
  onChange,
  ...props
}) => {
  const state = useRef(
    sso({
      value,
      options,
      disabled,
      onChange(item: Omit<RadioOption, 'label'>) {
        if (!state.current.disabled && !item.disabled) {
          const newVal = [...state.current.value];
          const idx = newVal.indexOf(item.value);

          if (idx !== -1) {
            newVal.splice(idx, 1);
          } else {
            newVal.push(item.value);
          }

          if (isFunction(onChange)) {
            onChange(newVal);
          } else {
            state.current.value = newVal;
          }
        }
      },
      onKeyUpCapture(key: string, item: Omit<RadioOption, 'label'>) {
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
              className={cls.checkbox}
              type="checkbox"
              name={name}
              value={item.value}
              disabled={readOnly}
              checked={val.includes(item.value)}
              onChange={handleChange}
            />
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default Checkbox;
