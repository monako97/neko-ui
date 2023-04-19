import React, { useCallback, useState } from 'react';
import { cx, css } from '../emotion';
import { type ComponentSize } from '../index';

const inputCss = css`
  overflow: hidden;
  border: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
  outline: none;
  flex: 1;
`;
const wrapperCss = css`
  display: flex;
  border: var(--border-base);
  border-radius: var(--border-radius);
  padding: 4px 10px;
  inline-size: 100%;
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--component-background);
  transition: all 0.3s;
  line-height: 1.5715;
  background-image: none;
  box-sizing: border-box;
  accent-color: var(--primary-color, #5794ff);

  &:hover {
    border-color: var(--primary-hover, #80b3ff);
    border-inline-end-width: 1px;
  }

  input {
    background: none;
  }
`;
const focusCss = css`
  border-color: var(--primary-hover, #80b3ff);
  border-inline-end-width: 1px;
  outline: 0;
  box-shadow: 0 0 0 2px rgb(45 115 255 / 20%);
`;
const disabledCss = css`
  border-color: var(--border-color);
  background: var(--disabled-bg, #f5f5f5);
  cursor: not-allowed;
`;
const prefixCss = css`
  margin-inline-end: 4px;
`;
const suffixCss = css`
  margin-inline-start: 4px;
`;
const sizeCss = {
  small: css`
    padding: 2px;
    font-size: var(--font-size-sm);
    line-height: 20px;

    input {
      padding: 1px 0;
    }
  `,
  large: css`
    padding: 6px 16px;
    font-size: var(--font-size-lg);
  `,
  normal: null,
};

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
        wrapperCss,
        size && sizeCss[size],
        disabled && disabledCss,
        focus && focusCss,
        className
      )}
    >
      {prefix ? <span className={prefixCss}>{prefix}</span> : null}
      <input
        value={getValue(value)}
        className={inputCss}
        autoComplete={autoComplete}
        type="text"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...prpos}
      />
      {suffix ? <span className={suffixCss}>{suffix}</span> : null}
    </span>
  );
};

export default Input;
