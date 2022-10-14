import React from 'react';
import getPrefixCls from '../get-prefix-cls';
import { classNames } from '@moneko/common';
import './index.global.less';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  suffix,
  prefix,
  value,
  ...prpos
}) => {
  return (
    <span
      className={classNames([
        getPrefixCls('input-wrapper'),
        getPrefixCls(`input-${type}`),
        className,
      ])}
    >
      {prefix && <span className={getPrefixCls('input-prefix')}>{prefix}</span>}
      <input value={value} className={getPrefixCls('input')} type={type} {...prpos} />
      {suffix && <span className={getPrefixCls('input-suffix')}>{suffix}</span>}
    </span>
  );
};

export default Input;
