export type BaseOption = {
  icon?: React.ReactNode;
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  danger?: boolean;
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
  list: (T | string)[],
  fieldNames?: Partial<FieldNames>
): BaseOption[] {
  return list.map((item) => {
    const { options, label, value } = { ...defaultFieldNames, ...fieldNames };

    if (typeof item === 'string') {
      return {
        [label]: item,
        [value]: item,
      } as BaseOption;
    }
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
  });
}

export default getOptions;
