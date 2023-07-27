import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';
import type { BaseOption } from 'neko-ui';

function Second(props: Required<Omit<CronItemProps<'month'>, 'options'>>) {
  const seconds: BaseOption[] = [];
  const beginEvery: string[] = [];

  for (let x = 0; x < 60; x++) {
    seconds.push({
      label: x < 10 ? `0${x}` : x,
      value: x,
    });
    beginEvery.push(`${x + 1}`);
  }

  const options = [
    { value: '*', label: '每秒' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={seconds}
          disabled={props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= 0 && v < 59 : v > 0 && v <= 59)}
          label={['周期从', '到', '秒']}
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
          beginOption={seconds}
          beginEveryOption={beginEvery}
          disabled={props.state.type !== 'beginInterval'}
          validate={(_, v) => (_ === 'begin' ? v >= 0 && v <= 59 : v >= 0 && v <= 60)}
          label={['从', '秒开始, 每', '秒执行一次']}
        />
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体秒数（至少选择一项）"
          value={props.state.some}
          options={seconds}
          type={props.state.type}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return <Item options={options} onType={props.onType} state={props.state} />;
}

export default Second;
