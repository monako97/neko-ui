import React, { useMemo, useState } from 'react';
import getPrefixCls from '../get-prefix-cls';
import { classNames } from '@moneko/common';
import './index.global.less';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  size?: 'small' | 'large';
}

const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  suffix,
  prefix,
  value,
  size,
  disabled,
  ...prpos
}) => {
  const [focus, setFocus] = useState<boolean>(false);

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
        value={value}
        className={getPrefixCls('input')}
        type={type}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...prpos}
      />
      {suffix && <span className={getPrefixCls('input-suffix')}>{suffix}</span>}
    </span>
  );
};

export default Input;
