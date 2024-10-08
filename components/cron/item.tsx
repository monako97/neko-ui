import type { RadioOption } from 'neko-ui';

import type { ActiveTab, CronType } from '.';

export interface CronItemProps<T extends ActiveTab = 'second'> {
  state: CronType[T];
  onChange?<V extends Exclude<keyof CronType[T], 'value' | 'type'> | 'type'>(
    type: V,
    value: CronType[T][V],
  ): void;
  options: RadioOption[];
}

function Item<T extends ActiveTab>(props: CronItemProps<T>) {
  function handleType(e: CustomEvent<string>) {
    props.onChange?.('type', e.detail as CronType[T]['type']);
  }

  return (
    <n-radio
      layout="vertical"
      value={props.state.type}
      options={props.options}
      onChange={handleType}
    />
  );
}

export default Item;
