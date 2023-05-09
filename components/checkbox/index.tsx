import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import getOptions, { type FieldNames, type BaseOption, defaultFieldNames } from '../get-options';

export interface CheckboxOption extends BaseOption {
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
  fieldNames?: Partial<FieldNames>;
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
  fieldNames,
  ...props
}) => {
  const state = useRef(
    sso({
      value,
      options: [] as CheckboxOption[],
      disabled,
      all: [] as string[],
      checkedAll: false,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      onChange(item: CheckboxOption) {
        if (!state.current.disabled && !item.disabled) {
          const isIndeterminate = 'indeterminate' in item;
          let newVal = isIndeterminate ? [] : [...state.current.value];
          const val = item[state.current.fieldNames.value];

          if (isIndeterminate) {
            if (!state.current.checkedAll) {
              newVal = state.current.all;
            }
          } else {
            const idx = newVal.indexOf(val);

            if (idx !== -1) {
              newVal.splice(idx, 1);
            } else {
              newVal.push(val);
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
  const {
    value: val,
    options: opts,
    disabled: disable,
    all,
    checkedAll,
    fieldNames: fieldName,
  } = state.current;

  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current('fieldNames', (prev) => ({ ...prev, ...fieldNames }));
  }, [fieldNames]);
  useEffect(() => {
    state.current.options = getOptions(options, state.current.fieldNames);
  }, [options]);
  useEffect(() => {
    const allVal: string[] = [];

    opts.forEach((item) => {
      if (
        !('indeterminate' in item) &&
        typeof item[state.current.fieldNames.value] !== 'undefined'
      ) {
        allVal.push(item[state.current.fieldNames.value]);
      }
    });
    state.current.all = allVal;
  }, [opts]);
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
        const realVal = item[fieldName.value];
        const realLabel = item[fieldName.label];
        const checked = isIndeterminate ? checkedAll : val.includes(realVal);

        return (
          <label
            key={`${realVal}-${i}`}
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
              value={realVal}
              disabled={readOnly}
              checked={checked}
              onChange={handleChange}
            />
            {realLabel}
          </label>
        );
      })}
    </section>
  );
};

export default Checkbox;
