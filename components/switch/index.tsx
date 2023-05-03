import React, { useEffect, useRef } from 'react';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';

export interface SwitchProps {
  className?: string;
  value?: boolean;
  disabled?: boolean;
  onLabel?: string;
  offLabel?: string;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: boolean): void;
}
const Switch: React.FC<SwitchProps> = ({
  className,
  value = false,
  loading,
  onChange,
  disabled,
  onLabel,
  offLabel,
}) => {
  const state = useRef(
    sso({
      value,
      disabled,
      loading,
      change() {
        if (!state.current.disabled && !state.current.loading) {
          state.current('value', (prev) => {
            onChange?.(!prev);
            return !prev;
          });
        }
      },
      onKeyUpCapture({ key }: { key: string }) {
        if (key === 'Enter') {
          state.current.change();
        }
      },
    })
  );
  const { value: val, loading: load, disabled: disable } = state.current;

  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    state.current.loading = loading;
  }, [loading]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);

  return (
    <span
      className={cx(cls.switch, className, val && cls.checked, load && cls.loading)}
      data-on={onLabel}
      data-off={offLabel}
      data-disabled={disable}
      onClickCapture={state.current.change}
      onKeyUpCapture={state.current.onKeyUpCapture}
      tabIndex={disable || load ? -1 : 0}
    />
  );
};

export default Switch;
