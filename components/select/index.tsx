import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import Dropdown, { type DropdownProps, type DropdownOption } from '../dropdown';
import { cx } from '../emotion';
import getOptions, { defaultFieldNames } from '../get-options';
import Input from '../input';

export interface SelectOption extends DropdownOption {
  children?: SelectOption[];
}

export interface SelectProps extends DropdownProps {
  defaultValue?: string | number;
  label?: string;
}

const Select: React.ForwardRefRenderFunction<HTMLInputElement, SelectProps> = ({
  className,
  open,
  options,
  label,
  value = '',
  disabled,
  onChange,
  onOpenChange,
  fieldNames,
  popupStyle,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const state = useRef(
    sso({
      value,
      options: [] as SelectOption[],
      kv: {} as Record<string, SelectOption>,
      disabled,
      open,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      popupStyle,
      closeTimer: null as NodeJS.Timeout | null,
      openChange(next: boolean | null) {
        if (isFunction(onOpenChange)) {
          onOpenChange(next);
        } else {
          state.current.open = next;
        }
      },
      onChange(val: string | number, item: DropdownOption) {
        if (!state.current.disabled) {
          if (isFunction(onChange)) {
            onChange(val, item);
          } else {
            state.current.value = val || '';
          }
        }
      },
      focus(e: React.FocusEvent) {
        e.preventDefault();
        e.stopPropagation();
        state.current.openChange(true);
      },
      blur(e: React.FocusEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (state.current.closeTimer) {
          clearTimeout(state.current.closeTimer);
        }
        state.current.closeTimer = setTimeout(() => {
          if (state.current.closeTimer) {
            clearTimeout(state.current.closeTimer);
            state.current.closeTimer = null;
          }
          state.current.openChange(false);
        }, 150);
      },
    })
  );
  const {
    open: show,
    value: val,
    disabled: disable,
    kv,
    popupStyle: style,
    fieldNames: fieldName,
  } = state.current;

  useEffect(() => {
    state.current.popupStyle = {
      ...popupStyle,
      minWidth: ref.current?.parentElement?.offsetWidth,
    };
  }, [popupStyle]);
  useEffect(() => {
    state.current('fieldNames', (prev) => ({ ...prev, ...fieldNames }));
  }, [fieldNames]);
  useEffect(() => {
    state.current.options = getOptions(options, state.current.fieldNames);
    state.current.kv = Object.fromEntries(
      state.current.options.map((item) => [item[state.current.fieldNames.value], item])
    );
  }, [options]);
  useEffect(() => {
    state.current.open = open;
  }, [open]);
  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value;
  }, [value]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      if (_state.closeTimer) {
        clearTimeout(_state.closeTimer);
      }
      _state();
    };
  }, []);

  return (
    <Dropdown
      {...props}
      fieldNames={fieldName}
      className={cx(cls.select, className)}
      options={options}
      trigger="none"
      selectable
      open={show}
      onOpenChange={state.current.openChange}
      disabled={disable}
      popupStyle={style}
      value={val}
      onChange={state.current.onChange}
    >
      <Input
        ref={ref}
        label={label}
        disabled={disable}
        value={(kv[val]?.[fieldName.label] as string) || val}
        onFocus={state.current.focus}
        onBlur={state.current.blur}
      />
    </Dropdown>
  );
};

export default Select;