import { isUndefined } from '@moneko/common';

import { type BaseOption, type BasicConfig, FieldName } from '../basic-config';

function getOptions<T extends BaseOption = BaseOption>(
  list?: (T | string | number)[],
  fieldNames?: BasicConfig['fieldName'],
): (T & Record<string, unknown>)[] {
  if (!list) return [];
  return list.map((item, i) => {
    const { options, children, label, value } = Object.assign({}, FieldName, fieldNames);

    if (typeof item === 'object') {
      const _label = (isUndefined(item[label]) ? item[value] : item[label]) ?? i;
      const _value = (isUndefined(item[value]) ? _label : item[value]) ?? i;
      const _item = {
        ...item,
        [label]: _label,
        [value]: _value,
      };

      if (Array.isArray(item[children])) {
        Object.assign(_item, {
          [children]: getOptions(item[children], fieldNames),
        });
      }
      if (Array.isArray(item[options])) {
        Object.assign(_item, {
          [options]: getOptions(item[options], fieldNames),
        });
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
