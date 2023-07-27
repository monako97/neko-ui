import type { CronType } from '.';
import type { RadioOption } from 'neko-ui';

export type CronItemProps<T extends CronType['activeKey'] = 'second'> = {
  state: CronType[T];
  onType(val: CronType[T]['type']): void;
  onChange?<V extends Exclude<keyof CronType[T], 'value' | 'type'>>(
    type: V,
    value: CronType[T][V],
  ): void;
  options: RadioOption[];
};

function Item<T extends CronType['activeKey']>(props: CronItemProps<T>) {
  function handleType(e: CustomEvent<string>) {
    props.onType(e.detail as CronType[T]['type']);
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
