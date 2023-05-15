import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import Dropdown, { type DropdownProps, type DropdownOption } from '../dropdown';
import { cx } from '../emotion';
import getOptions, { defaultFieldNames } from '../get-options';

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
  placement = 'left',
  multiple,
  value,
  toggle,
  disabled,
  onChange,
  onOpenChange,
  fieldNames,
  popupStyle,
  popupClassName,
  placeholder,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const state = useRef(
    sso({
      value: [] as (string | number)[],
      options: [] as SelectOption[],
      kv: {} as Record<string, SelectOption>,
      disabled,
      open,
      multiple,
      toggle,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      popupStyle,
      current: null,
      deleteValue(e: React.MouseEvent, v: string | number) {
        e.stopPropagation();
        e.preventDefault();

        state.current('value', (prev) => {
          return prev.filter((old) => old !== v);
        });
      },
      click(e: React.MouseEvent) {
        if (e.target === document.activeElement) {
          state.current.openChange(!state.current.open);
        }
      },
      keyDown({ key }: { key: string }) {
        switch (key) {
          case 'ArrowDown':
            // console.log(key);
            // Object.keys(state.current.kv).indexOf(state.current.value)
            break;
          case 'ArrowUp':
            break;
          case 'Backspace':
            state.current('value', (prev) => {
              const v = [...prev];

              v.splice(-1, 1);
              return v;
            });
            break;
          case 'Enter':
            state.current.openChange(!state.current.open);
            break;
          case 'Escape':
            state.current.openChange(false);
            break;
          default:
            break;
        }
      },
      openChange(next: boolean | null) {
        if (!state.current.disabled) {
          if (isFunction(onOpenChange)) {
            onOpenChange(next);
          } else {
            state.current.open = next;
          }
        }
      },
      onChange(val: string | number, item: DropdownOption) {
        if (!state.current.disabled && !item.disabled) {
          if (isFunction(onChange)) {
            onChange(val, item);
          } else {
            state.current.value = Array.isArray(val) ? val : [val];
          }
        }
      },
      focus(e: React.FocusEvent | React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        state.current.openChange(true);
      },
      blur(e: React.FocusEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (state.current.open) {
          state.current.openChange(false);
        }
      },
      getKv(arr: SelectOption[]) {
        const optKv: Record<string, SelectOption> = {};

        for (let i = 0, len = arr.length; i < len; i++) {
          const item = arr[i];
          const _options = item[state.current.fieldNames.options];

          optKv[item[state.current.fieldNames.value]] = item;
          if (Array.isArray(_options)) {
            Object.assign(optKv, state.current.getKv(_options));
          }
        }
        return optKv;
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
    multiple: isMultiple,
    options: selectOptions,
  } = state.current;

  useEffect(() => {
    state.current.popupStyle = {
      ...popupStyle,
      minWidth: (isMultiple ? ref.current : ref.current?.parentElement)?.offsetWidth,
    };
  }, [popupStyle, isMultiple, val]);
  useEffect(() => {
    state.current('fieldNames', (prev) => ({ ...prev, ...fieldNames }));
  }, [fieldNames]);
  useEffect(() => {
    state.current.options = getOptions(options, state.current.fieldNames);
    state.current.kv = state.current.getKv(state.current.options);
  }, [options]);
  useEffect(() => {
    state.current.multiple = multiple;
  }, [multiple]);
  useEffect(() => {
    state.current.open = open;
  }, [open]);
  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current.value = value ? (Array.isArray(value) ? value : [value]) : [];
  }, [value]);
  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);

  return (
    <Dropdown
      {...props}
      fieldNames={fieldName}
      className={cx(cls.select, className)}
      popupClassName={cx(cls.portal, popupClassName)}
      options={selectOptions}
      placement={placement}
      trigger="none"
      selectable
      open={show}
      onOpenChange={state.current.openChange}
      disabled={disable}
      popupStyle={style}
      multiple={multiple}
      toggle={toggle}
      value={val as unknown as DropdownProps['value']}
      onChange={state.current.onChange}
    >
      <div
        ref={ref}
        className={cls.tags}
        tabIndex={disable ? -1 : 0}
        onMouseDownCapture={state.current.click}
        onKeyDownCapture={state.current.keyDown}
        onFocusCapture={state.current.focus}
        onBlur={state.current.blur}
        aria-disabled={disable}
        aria-label={label}
        aria-placeholder={placeholder}
      >
        {isMultiple ? (
          val.map((v, i) => (
            <span key={i} className={cls.tag}>
              {kv[v]?.[fieldName.label] || v}
              {!disable && (
                <span className={cls.del} onClick={(e) => state.current.deleteValue(e, v)} />
              )}
            </span>
          ))
        ) : (
          <span className={cx(cls.value, show && cls.opacity)}>
            {kv[val[0]]?.[fieldName.label] || val[0]}
          </span>
        )}
      </div>
    </Dropdown>
  );
};

export default Select;
