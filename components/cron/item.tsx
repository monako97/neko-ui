import { createMemo } from 'solid-js';
import type { RadioOption } from 'neko-ui';

import type { ActiveTab, CronType } from '.';

export interface CronItemProps<T extends ActiveTab = 'second'> {
  state: CronType[T];
  onChange?<V extends Exclude<keyof CronType[T], 'value' | 'type'> | 'type'>(
    type: V,
    value: CronType[T][V],
  ): void;
  options: RadioOption[];
  disabled?: boolean;
}

function Item<T extends ActiveTab>(props: CronItemProps<T>) {
  function handleType(e: CustomEvent<string>) {
    props.onChange?.('type', e.detail as CronType[T]['type']);
  }

  const options = createMemo(() => {
    if (props.disabled) {
      return props.options.map((o) => ({
        ...o,
        disabled: o.value !== props.state.type,
      }));
    }
    return props.options;
  });

  return (
    <n-radio layout="vertical" value={props.state.type} options={options()} onChange={handleType} />
  );
}

export default Item;
