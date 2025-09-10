import { minutes } from '../date-picker/time';

import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';

function Minute(
  props: Required<Omit<CronItemProps<'minute'>, 'options' | 'disabled'>> & { disabled?: boolean },
) {
  const beginEvery: string[] = [];

  for (let x = 0; x < 60; x++) {
    beginEvery.push(`${x + 1}`);
  }

  const options = [
    { value: '*', label: '每分钟' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={minutes}
          disabled={props.disabled || props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= 0 && v < 59 : v > 0 && v <= 59)}
          label={['周期从', '到', '分钟']}
        />
      ),
    },
    {
      value: 'beginInterval',
      label: (
        <BeginInterval
          begin={props.state.begin}
          beginEvery={props.state.beginEvery}
          onChange={props.onChange}
          beginOption={minutes}
          beginEveryOption={beginEvery}
          disabled={props.disabled || props.state.type !== 'beginInterval'}
          validate={(_, v) => (_ === 'begin' ? v >= 0 && v <= 59 : v >= 1 && v <= 60)}
          label={['从', '分开始, 每', '分钟执行一次']}
        />
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体分钟数（至少选择一项）"
          value={props.state.some}
          options={minutes}
          type={props.state.type}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      ),
    },
  ];

  return (
    <Item
      options={options}
      onChange={props.onChange}
      state={props.state}
      disabled={props.disabled}
    />
  );
}

export default Minute;
