import React, { useCallback, useState } from 'react';
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
  disabled,
  formatter,
  parser,
  onChange,
  onFocus,
  onBlur,
  autoComplete = 'off',
  ...prpos
}) => {
  const [focus, setFocus] = useState<boolean>(false);
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
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocus(true);
      onFocus?.(e);
    },
    [onFocus]
  );
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  return (
    <span
      className={cx(
        cls.wrapper,
        cls[size || 'normal'],
        disabled && cls.disabled,
        focus && cls.focus,
        className
      )}
    >
      {prefix ? <span className={cls.prefix}>{prefix}</span> : null}
      <input
        value={getValue(value)}
        className={cls.input}
        autoComplete={autoComplete}
        type="text"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...prpos}
      />
      {suffix ? <span className={cls.suffix}>{suffix}</span> : null}
    </span>
  );
};

export default Input;
