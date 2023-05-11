import React, { useEffect, useRef } from 'react';
import { isFunction } from '@moneko/common';
import sso from 'shared-store-object';
import { cls } from './style';
import { cx } from '../emotion';
import getOptions, { type FieldNames, type BaseOption, defaultFieldNames } from '../get-options';
import Popover, { type PopoverProps } from '../popover';

export interface DropdownOption extends BaseOption {
  options?: DropdownOption[];
}

export interface BaseDropdownProps extends PopoverProps {
  options: (DropdownOption | string)[];
  selectable?: boolean;
  fieldNames?: Partial<FieldNames>;
  toggle?: boolean;
}
export interface DropdownProps extends BaseDropdownProps {
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string | number, item: DropdownOption): void;
  value?: string | number;
  multiple?: false;
}
export interface DropdownMultipleProps extends BaseDropdownProps {
  multiple: true;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: (string | number)[], item: DropdownOption): void;
  value?: (string | number)[];
}

const Dropdown: React.FC<DropdownProps | DropdownMultipleProps> = ({
  options,
  children,
  open = null,
  selectable,
  multiple,
  toggle,
  value,
  onChange,
  onOpenChange,
  disabled,
  fieldNames,
  className,
  popupClassName,
  ...props
}) => {
  const state = useRef(
    sso({
      open,
      options: [] as DropdownOption[],
      disabled,
      selectable,
      multiple,
      toggle,
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      value: [] as (string | number)[],
      preventDefault(e: MouseEvent | React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
      },
      change(item: DropdownOption) {
        if (!item.disabled && !state.current.disabled) {
          let _value = [...state.current.value];
          const key = item[state.current.fieldNames.value];

          if (state.current.multiple) {
            const idx = _value.indexOf(key);

            if (idx === -1) {
              _value.push(key);
            } else {
              _value.splice(idx, 1);
            }
          } else if (state.current.toggle && _value[0] === key) {
            _value = [];
          } else {
            _value = [key];
          }
          if (isFunction(onChange)) {
            onChange(multiple ? _value : _value[0], item);
          } else {
            state.current.value = _value;
          }
          if (!multiple) {
            state.current.openChange(false);
          }
        }
      },
      openChange(next: boolean | null) {
        if (isFunction(onOpenChange)) {
          onOpenChange(next);
        } else {
          state.current.open = next;
        }
      },
      renderMenu(
        list: DropdownOption[],
        option: {
          activeKey?: (string | number)[];
          fieldNames: FieldNames;
          disabled?: boolean;
          selectable?: boolean;
        }
      ) {
        const { options: optionsKey, label, value: valueKey } = option.fieldNames;

        return list.map((item, i) => {
          if (Array.isArray(item[optionsKey])) {
            return (
              <React.Fragment key={`${item[valueKey]}-${i}`}>
                <div className={cx(cls.group, item.className)} style={item.style}>
                  {item.icon && <span className={cls.icon}>{item.icon}</span>}
                  {item[label]}
                </div>
                {state.current.renderMenu(item[optionsKey], option)}
              </React.Fragment>
            );
          }
          return (
            <div
              key={`${item[valueKey]}-${i}`}
              className={cx(
                cls.item,
                item.className,
                item.danger && cls.danger,
                option.selectable && option.activeKey?.includes(item[valueKey]) && cls.active
              )}
              aria-disabled={option.disabled || item.disabled}
              onMouseDown={state.current.preventDefault}
              onClick={(e) => {
                state.current.preventDefault(e);
                state.current.change(item);
              }}
              style={item.style}
            >
              {item.icon && <span className={cls.icon}>{item.icon}</span>}
              {item[label]}
            </div>
          );
        });
      },
    })
  );
  const {
    open: show,
    options: list,
    disabled: disable,
    value: activeKey,
    selectable: isSelectable,
    fieldNames: fieldName,
  } = state.current;

  useEffect(() => {
    state.current.toggle = toggle;
  }, [toggle]);
  useEffect(() => {
    state.current.open = open;
  }, [open]);
  useEffect(() => {
    state.current.selectable = selectable;
  }, [selectable]);
  useEffect(() => {
    state.current.value = value ? (Array.isArray(value) ? value : [value]) : [];
  }, [value]);
  useEffect(() => {
    state.current.disabled = disabled;
  }, [disabled]);
  useEffect(() => {
    state.current('fieldNames', (prev) => ({
      ...prev,
      ...fieldNames,
    }));
  }, [fieldNames]);
  useEffect(() => {
    state.current.options = getOptions(options, state.current.fieldNames);
  }, [options]);

  useEffect(() => {
    const _state = state.current;

    return () => {
      _state();
    };
  }, []);

  return (
    <Popover
      {...props}
      className={cx(cls.dropdown, className)}
      popupClassName={cx(cls.portal, selectable && cls.selectable, popupClassName)}
      open={show}
      onOpenChange={state.current.openChange}
      disabled={disabled}
      content={state.current.renderMenu(list, {
        disabled: disable,
        fieldNames: fieldName,
        selectable: isSelectable,
        activeKey,
      })}
    >
      {children}
    </Popover>
  );
};

export default Dropdown;
