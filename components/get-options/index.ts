import { type JSXElement } from 'solid-js';
import { ComponentStatus } from '..';

export type BaseOption = {
  icon?: JSXElement;
  value?: string;
  label?: JSXElement;
  disabled?: boolean;
  class?: string;
  style?: unknown;
  danger?: boolean;
  status?: ComponentStatus;
  options?: BaseOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type FieldNames = {
  label: string;
  value: string;
  options: string;
  children: string;
  icon: string;
  suffix: string;
};

export const defaultFieldNames = {
  label: 'label',
  value: 'value',
  options: 'options',
  children: 'children',
  icon: 'icon',
  suffix: 'suffix',
};

function getOptions<T extends BaseOption = BaseOption>(
  list?: (T | string)[],
  fieldNames?: Partial<FieldNames>,
): T[] {
  if (!list) return [];
  return list.map((item, i) => {
    const { options, label, value } = { ...defaultFieldNames, ...fieldNames };

    if (typeof item === 'object') {
      const _label = (typeof item[label] === 'undefined' ? item[value] : item[label]) || i;
      const _value = (typeof item[value] === 'undefined' ? _label : item[value]) || i;
      const _item = {
        ...item,
        [label]: _label,
        [value]: _value,
      };

      if (Array.isArray(item[options])) {
        return {
          ..._item,
          [options]: getOptions(item[options], fieldNames),
        };
      }
      return _item;
    }
    return {
      [label]: item,
      [value]: item,
    } as T;
  });
}

export default getOptions;
