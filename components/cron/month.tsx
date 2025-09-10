import { months as month } from '../date-picker/month';

import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';

const months = month.map((m, i) => ({ label: m, value: i }));

function Month(
  props: Required<Omit<CronItemProps<'month'>, 'options' | 'disabled'>> & { disabled?: boolean },
) {
  const beginEvery: number[] = [];

  for (let x = 1; x < 13; x++) {
    beginEvery.push(x);
  }

  const options = [
    { value: '*', label: '每月' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={months}
          disabled={props.disabled || props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= 1 && v < 12 : v > 1 && v <= 12)}
          label={['周期从', '到', '月']}
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
          beginOption={months}
          beginEveryOption={beginEvery}
          disabled={props.disabled || props.state.type !== 'beginInterval'}
          validate={(_, v) => v >= 1 && v <= 12}
          label={['从', '开始, 每', '个月执行一次']}
        />
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体月数（至少选择一项）"
          value={props.state.some}
          options={months}
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

export default Month;
