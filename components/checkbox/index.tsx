import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import type { RadioOption } from '../radio';

export interface CheckboxOption extends RadioOption {
  indeterminate?: boolean;
}
export interface CheckboxProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  disabled?: boolean;
  value?: string[];
  options: CheckboxOption[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: string[]) => void;
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
    sso(
      {
        value,
        options,
        disabled,
        onChange(item: CheckboxOption) {
          if (!state.current.disabled && !item.disabled) {
            const isIndeterminate = 'indeterminate' in item;
            let newVal = isIndeterminate ? [] : [...state.current.value];

            if (isIndeterminate) {
              if (!state.current.checkedAll) {
                newVal = state.current.all;
              }
            } else {
              const idx = newVal.indexOf(item.value);

              if (idx !== -1) {
                newVal.splice(idx, 1);
              } else {
                newVal.push(item.value);
              }
            }
            if (isFunction(onChange)) {
              onChange(newVal);
            } else {
              state.current.value = newVal;
            }
          }
        },
        onKeyUpCapture(key: string, item: CheckboxOption) {
          if (key === 'Enter') {
            state.current.onChange(item);
          }
        },
      },
      {
        checkedAll(): boolean {
          let checkedAll = true;

          for (let i = 0, len = state.current.all.length; i < len; i++) {
            if (!state.current.value.includes(state.current.all[i])) {
              checkedAll = false;
            }
          }
          return checkedAll;
        },
        all() {
          const allVal: string[] = [];

          for (let i = 0, len = state.current.options.length; i < len; i++) {
            if (!('indeterminate' in state.current.options[i])) {
              allVal.push(state.current.options[i].value);
            }
          }
          return allVal;
        },
      }
    )
  );
  const { value: val, options: opts, disabled: disable, checkedAll } = state.current;

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
      {opts?.map((item, i) => {
        const readOnly = disable || item.disabled;
        const handleChange = () => state.current.onChange(item);
        const isIndeterminate = 'indeterminate' in item;
        const checked = isIndeterminate ? checkedAll : val.includes(item.value);

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
              ref={(el) => {
                if (el && isIndeterminate) {
                  el.indeterminate = item.indeterminate as boolean;
                }
              }}
              className={cls.checkbox}
              type="checkbox"
              name={name}
              value={item.value}
              disabled={readOnly}
              checked={checked}
              onChange={handleChange}
            />
            {item.label}
          </label>
        );
      })}
    </div>
  );
};

export default Checkbox;
