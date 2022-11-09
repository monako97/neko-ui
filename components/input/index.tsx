import React, { useCallback, useMemo, useState } from 'react';
import getPrefixCls from '../get-prefix-cls';
import { classNames } from '@moneko/common';
import type { ComponentSize } from '../index';
import './index.global.less';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size' | 'onChange'> {
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  size?: ComponentSize;
  value?: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value?: InputProps['value']) => void;
  /** 指定输入框展示值的格式 */
  // eslint-disable-next-line no-unused-vars
  formatter?: (value?: InputProps['value']) => InputProps['value'];
  // eslint-disable-next-line no-unused-vars
  parser?: (value?: InputProps['value']) => InputProps['value'];
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
    (val?: InputProps['value']) => {
      return formatter ? formatter(val) : val;
    },
    [formatter]
  );
  const parserValue = useCallback(
    (val?: InputProps['value']) => {
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

  const cls = useMemo(
    () =>
      classNames(
        getPrefixCls('input-wrapper'),
        getPrefixCls(`input-${type}`),
        size && getPrefixCls(`input-${size}`),
        disabled && getPrefixCls(`input-disabled`),
        focus && getPrefixCls(`input-focus`),
        className
      ),
    [className, disabled, focus, size, type]
  );

  return (
    <span className={cls}>
      {prefix && <span className={getPrefixCls('input-prefix')}>{prefix}</span>}
      <input
        value={getValue(value)}
        className={getPrefixCls('input')}
        autoComplete={autoComplete}
        type="text"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...prpos}
      />
      {suffix && <span className={getPrefixCls('input-suffix')}>{suffix}</span>}
    </span>
  );
};

export default Input;
