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

export type FieldNames = { label: string; value: string; options: string };

export const defaultFieldNames = {
  label: 'label',
  value: 'value',
  options: 'options',
};

function getOptions<T extends BaseOption = BaseOption>(
  list?: (T | string)[],
  fieldNames?: Partial<FieldNames>
): BaseOption[] {
  if (!list) return [];
  return list.map((item) => {
    const { options, label, value } = { ...defaultFieldNames, ...fieldNames };

    if (typeof item === 'object') {
      if (Array.isArray(item[options])) {
        return {
          ...item,
          [options]: getOptions(item[options], fieldNames),
        };
      }
      return {
        ...item,
        [label]: typeof item[label] === 'undefined' ? item[value] : item[label],
      };
    }
    return {
      [label]: item,
      [value]: item,
    } as BaseOption;
  });
}

export default getOptions;
