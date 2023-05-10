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

export interface DropdownProps extends PopoverProps {
  options: (DropdownOption | string)[];
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string | number, item: DropdownOption): void;
  value?: string | number;
  selectable?: boolean;
  fieldNames?: Partial<FieldNames>;
}
const Dropdown: React.FC<DropdownProps> = ({
  options,
  children,
  open = null,
  selectable,
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
      fieldNames: {
        ...defaultFieldNames,
        ...fieldNames,
      },
      value,
      change(item: DropdownOption) {
        if (!item.disabled && !state.current.disabled) {
          if (isFunction(onChange)) {
            onChange(item[state.current.fieldNames.value], item);
          } else {
            state.current.value = item[state.current.fieldNames.value];
          }
          state.current.openChange(false);
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
          activeKey?: string | number;
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
                option.selectable && option.activeKey === item[valueKey] && cls.active
              )}
              aria-disabled={option.disabled || item.disabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
    state.current.open = open;
  }, [open]);
  useEffect(() => {
    state.current.selectable = selectable;
  }, [selectable]);
  useEffect(() => {
    state.current.value = value;
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
      popupClassName={cx(cls.portal, popupClassName)}
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
