import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';
import type { BaseOption } from 'neko-ui';

function Hour(props: Required<Omit<CronItemProps<'hour'>, 'options'>>) {
  const hours: BaseOption[] = [];
  const beginEvery: string[] = [];

  for (let x = 0; x < 24; x++) {
    hours.push({
      label: x < 10 ? `0${x}` : `${x}`,
      value: x,
    });
    beginEvery.push(`${x + 1}`);
  }

  const options = [
    { value: '*', label: '每小时' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={hours}
          disabled={props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= 0 && v < 23 : v > 0 && v <= 23)}
          label={['周期从', '到', '时']}
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
          beginOption={hours}
          beginEveryOption={beginEvery}
          disabled={props.state.type !== 'beginInterval'}
          validate={(_, v) => (_ === 'begin' ? v >= 0 && v <= 23 : v >= 1 && v <= 24)}
          label={['从', '时开始, 每', '小时执行一次']}
        />
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体小时数（至少选择一项）"
          value={props.state.some}
          options={hours}
          type={props.state.type}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return <Item options={options} onType={props.onType} state={props.state} />;
}

export default Hour;
