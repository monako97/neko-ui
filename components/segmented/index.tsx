import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import type { RadioOption } from '../radio';

export interface SegmentedOption extends RadioOption {
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
}

const Segmented: React.FC<SegmentedProps> = ({
  className,
  name,
  style,
  disabled,
  options,
  value,
  onChange,
  ...props
}) => {
  const box = useRef<HTMLDivElement>(null);
  const state = useRef(
    sso({
      value,
      options: [] as (SegmentedOption & { el?: HTMLLabelElement })[],
      disabled,
      style: {} as React.CSSProperties,
      onChange(item: SegmentedOption) {
        if (!state.current.disabled && !item.disabled) {
          if (isFunction(onChange)) {
            onChange(item.value);
          } else {
            state.current.value = item.value;
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
  const { value: val, options: opts, disabled: disable, style: offsetStyle } = state.current;

  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current.options = options.map((item) => {
      if (typeof item === 'string') {
        return {
          label: item,
          value: item,
        };
      }

      return item;
    });
  }, [options]);
  useEffect(() => {
    const el = opts.find((o) => o.value === val)?.el;

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
          <React.Fragment key={`${item.value}-${i}`}>
            <input
              className={cls.segmented}
              type="radio"
              name={name}
              value={item.value}
              disabled={readOnly}
              checked={item.value === val}
              onChange={handleChange}
            />
            <label
              className={cx(cls.label, item.className)}
              tabIndex={readOnly ? -1 : 0}
              onKeyUpCapture={({ key }) => state.current.onKeyUpCapture(key, item)}
              onClickCapture={handleChange}
              aria-disabled={readOnly}
              data-disabled={readOnly}
              style={item.style}
              ref={(e) => {
                if (e) {
                  opts[i].el = e;
                }
              }}
            >
              {item.icon ? <span className={cls.icon}>{item.icon}</span> : null}
              {item.label}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Segmented;
