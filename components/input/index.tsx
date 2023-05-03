import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cls } from './style';
import { cx } from '../emotion';
import { type ComponentSize } from '../index';

export interface InputProps<T = string | number | undefined>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'size' | 'onChange' | 'value'
  > {
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  size?: ComponentSize;
  label?: React.ReactNode;
  status?: 'error' | 'warning' | 'success';
  value?: T;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value?: T) => void;
  /** 指定输入框展示值的格式 */
  // eslint-disable-next-line no-unused-vars
  formatter?: ((value?: T) => T) | null;
  // eslint-disable-next-line no-unused-vars
  parser?: null | ((value?: T) => T);
}

const Input: React.FC<InputProps> = ({
  className,
  suffix,
  prefix,
  value,
  size,
  type = 'text',
  status,
  disabled,
  formatter,
  parser,
  onChange,
  label,
  placeholder = ' ',
  ...prpos
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [x, setX] = useState(`${ref.current?.offsetLeft}px`);
  const getValue = useCallback(
    (val: InputProps['value']) => {
      return formatter ? formatter?.(val) : val;
    },
    [formatter]
  );
  const parserValue = useCallback(
    (val: InputProps['value']) => {
      if (parser) {
        return parser(val);
      } else if (type === 'number' && typeof val === 'string') {
        const num = val.replace(/[^\d]/g, '');

        // eslint-disable-next-line no-undefined
        return num.length ? parseFloat(num) : undefined;
      }
      return val;
    },
    [parser, type]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange?.(parserValue(e.target.value));
    },
    [onChange, parserValue]
  );

  useEffect(() => {
    setX(`${ref.current?.offsetLeft}px`);
  }, []);

  return (
    <fieldset
      className={cx(cls.fieldset, size && cls[size], status && cls[status], className)}
      disabled={disabled}
    >
      {prefix ? <span className={cls.prefix}>{prefix}</span> : null}
      <input
        ref={ref}
        type={type}
        value={getValue(value)}
        className={cls.input}
        onChange={handleChange}
        placeholder={placeholder}
        {...prpos}
      />
      {label && (
        <label className={cls.label} style={{ '--x': x } as React.CSSProperties}>
          {label}
        </label>
      )}
      {suffix ? <span className={cls.suffix}>{suffix}</span> : null}
    </fieldset>
  );
};

export default Input;
