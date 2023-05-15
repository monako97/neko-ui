import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import getOptions, { defaultFieldNames, type BaseOption, type FieldNames } from '../get-options';

export interface SegmentedOption extends BaseOption {
  icon?: React.ReactNode;
}
export interface SegmentedProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  disabled?: boolean;
  value?: string;
  options: (SegmentedOption | string)[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: string) => void;
  fieldNames: FieldNames;
}

const Segmented: React.FC<SegmentedProps> = ({
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
  const box = useRef<HTMLDivElement>(null);
  const state = useRef(
    sso({
      value,
      options: [] as (SegmentedOption & { el?: HTMLLabelElement })[],
      disabled,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      style: {} as React.CSSProperties,
      onChange(item: SegmentedOption) {
        if (!state.current.disabled && !item.disabled) {
          if (isFunction(onChange)) {
            onChange(item[state.current.fieldNames.value]);
          } else {
            state.current.value = item[state.current.fieldNames.value];
          }
        }
      },
      onKeyUpCapture(key: string, item: SegmentedOption) {
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
    style: offsetStyle,
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
    const el = opts.find((o) => o[state.current.fieldNames.value] === val)?.el;

    if (el) {
      state.current.style = {
        '--w': `${el.offsetWidth}px`,
        '--h': `${el.offsetHeight}px`,
        '--left': `${el.offsetLeft}px`,
      } as React.CSSProperties;
    }
  }, [val, opts]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);
  return (
    <div
      {...props}
      ref={box}
      className={cx(cls.box, className)}
      style={{ ...style, ...offsetStyle }}
    >
      {opts?.map((item, i) => {
        const readOnly = disable || item.disabled;
        const handleChange = () => state.current.onChange(item);

        return (
          <React.Fragment key={`${item[fieldName.value]}-${i}`}>
            <input
              className={cls.segmented}
              type="radio"
              name={name}
              value={item[fieldName.value]}
              disabled={readOnly}
              checked={item[fieldName.value] === val}
              onChange={handleChange}
            />
            <label
              className={cx(cls.label, item.className)}
              tabIndex={readOnly ? -1 : 0}
              onKeyUpCapture={({ key }) => state.current.onKeyUpCapture(key, item)}
              onClickCapture={handleChange}
              aria-disabled={readOnly}
              style={item.style}
              ref={(e) => {
                if (e) {
                  opts[i].el = e;
                }
              }}
            >
              {item.icon ? <span className={cls.icon}>{item.icon}</span> : null}
              {item[fieldName.label]}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Segmented;
