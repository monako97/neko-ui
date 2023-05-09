import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import getOptions, { defaultFieldNames, type BaseOption, type FieldNames } from '../get-options';

export interface RadioOption extends BaseOption {
  value?: string;
}

export interface RadioProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  disabled?: boolean;
  value?: string;
  options: (RadioOption | string)[];
  fieldNames?: Partial<FieldNames>;
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: string, item: RadioOption) => void;
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
  fieldNames,
  ...props
}) => {
  const state = useRef(
    sso({
      value,
      options: [] as RadioOption[],
      disabled,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      onChange(item: RadioOption) {
        if (!state.current.disabled && !item.disabled) {
          if (isFunction(onChange)) {
            onChange(item.value, item);
          } else {
            state.current.value = item[state.current.fieldNames.value];
          }
        }
      },
      onKeyUpCapture(key: string, item: RadioOption) {
        if (key === 'Enter') {
          state.current.onChange(item);
        }
      },
    })
  );
  const { value: val, options: opts, disabled: disable, fieldNames: fieldName } = state.current;

  useEffect(() => {
    state.current('fieldNames', (prev) => ({ ...prev, ...fieldNames }));
  }, [fieldNames]);
  useEffect(() => {
    state.current.options = getOptions(options, state.current.fieldNames);
  }, [options]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
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

        return (
          <label
            key={`${item[fieldName.value]}-${i}`}
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
              value={item[fieldName.value]}
              disabled={readOnly}
              checked={item[fieldName.value] === val}
              onChange={handleChange}
            />
            {item[fieldName.label]}
          </label>
        );
      })}
    </section>
  );
};

export default Radio;
