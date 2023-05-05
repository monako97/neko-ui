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
  options: (CheckboxOption | string)[];
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
    sso({
      value,
      options: [] as CheckboxOption[],
      disabled,
      all: [] as string[],
      checkedAll: false,
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
    })
  );
  const { value: val, options: opts, disabled: disable, all, checkedAll } = state.current;

  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    const allVal: string[] = [];

    state.current.options = options.map((item) => {
      const _item = typeof item === 'string' ? { label: item, value: item } : item;

      if (!('indeterminate' in _item)) {
        allVal.push(_item.value);
      }

      return _item;
    });
    state.current.all = allVal;
  }, [options]);
  useEffect(() => {
    let checked = true;

    for (let i = 0, len = all.length; i < len; i++) {
      if (!value.includes(all[i])) {
        checked = false;
      }
    }
    state.current.checkedAll = checked;
  }, [all, value]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);
  return (
    <section {...props} className={cx(cls.box, layout && cls[layout], className)} style={style}>
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
    </section>
  );
};

export default Checkbox;
