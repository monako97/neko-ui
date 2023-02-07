import React, {
  type FC,
  useCallback,
  useState,
  InputHTMLAttributes,
  ReactNode,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import { css } from '@emotion/css';
import type { ComponentSize } from '../index';
import { classNames } from '@moneko/common';

const inputCss = css`
  border: none;
  outline: none;
  flex: 1;
  color: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const wrapperCss = css`
  color: var(--text-color, rgba(0, 0, 0, 0.85));
  font-size: 14px;
  line-height: 1.5715;
  background-color: var(--component-background, white);
  background-image: none;
  border: 1px solid var(--border-color-base, #d9d9d9);
  border-radius: 4px;
  transition: all 0.3s;
  box-sizing: border-box;
  width: 100%;
  padding: 4px 10px;
  display: flex;
  accent-color: var(--primary-color, #5794ff);

  &:hover {
    border-color: var(--primary-color-hover, #5794ff);
    border-right-width: 1px;
  }

  input {
    background: none;
  }
`;
const focusCss = css`
  border-color: var(--primary-color-hover, #5794ff);
  box-shadow: 0 0 0 2px rgba(45, 115, 255, 0.2);
  border-right-width: 1px;
  outline: 0;
`;
const disabledCss = css`
  background: var(--disabled-bg, #f5f5f5);
  border-color: var(--border-color-base, #d9d9d9);
  cursor: not-allowed;
`;
const prefixCss = css`
  margin-right: 4px;
`;
const suffixCss = css`
  margin-left: 4px;
`;
const sizeCss = {
  small: css`
    font-size: 12px;
    line-height: 20px;
    padding: 2px;

    input {
      padding: 1px 0;
    }
  `,
  large: css`
    font-size: 16px;
    padding: 6px 16px;
  `,
  normal: null,
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size' | 'onChange'> {
  className?: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
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

const Input: FC<InputProps> = ({
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange?.(parserValue(e.target.value));
    },
    [onChange, parserValue]
  );
  const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocus(true);
      onFocus?.(e);
    },
    [onFocus]
  );
  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  return (
    <span
      className={classNames(
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
