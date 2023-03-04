import React, {
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEventHandler,
  type FocusEventHandler,
  useCallback,
  useState,
} from 'react';
import { css } from '@emotion/css';
import { classNames } from '@moneko/common';
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
  border-radius: var(--border-radius, 8px);
  padding: 4px 10px;
  width: 100%;
  font-size: var(--font-size, 14px);
  color: var(--text-color, rgb(0 0 0 / 65%));
  background-color: var(--component-background, rgb(255 255 255 / 80%));
  transition: all 0.3s;
  line-height: 1.5715;
  background-image: none;
  box-sizing: border-box;
  accent-color: var(--primary-color, #5794ff);

  &:hover {
    border-color: var(--primary-color-hover, #80b3ff);
    border-right-width: 1px;
  }

  input {
    background: none;
  }
`;
const focusCss = css`
  border-color: var(--primary-color-hover, #80b3ff);
  border-right-width: 1px;
  outline: 0;
  box-shadow: 0 0 0 2px rgb(45 115 255 / 20%);
`;
const disabledCss = css`
  border-color: var(--border-color, #d9d9d9);
  background: var(--disabled-bg, #f5f5f5);
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
    padding: 2px;
    font-size: var(--font-size-sm, 12px);
    line-height: 20px;

    input {
      padding: 1px 0;
    }
  `,
  large: css`
    padding: 6px 16px;
    font-size: var(--font-size-lg, 16px);
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
  parser?: false | ((value?: InputProps['value']) => InputProps['value']);
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
