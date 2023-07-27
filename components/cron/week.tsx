import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';
import { selectCss, selectPortalCss } from './style';

function Week(props: Required<Omit<CronItemProps<'week'>, 'options'>>) {
  const weeks = [
    {
      label: '星期日',
      value: 1,
    },
    {
      label: '星期一',
      value: 2,
    },
    {
      label: '星期二',
      value: 3,
    },
    {
      label: '星期三',
      value: 4,
    },
    {
      label: '星期四',
      value: 5,
    },
    {
      label: '星期五',
      value: 6,
    },
    {
      label: '星期六',
      value: 7,
    },
  ];
  const beginEvery = [
    { value: 1, label: '1周' },
    { value: 2, label: '2周' },
    { value: 3, label: '3周' },
    { value: 4, label: '4周' },
  ];

  const options = [
    { value: '*', label: '每周' },
    { value: '?', label: '不指定' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={weeks}
          disabled={props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= 1 && v < 7 : v > 1 && v <= 7)}
          label={['周期从', '到', '日']}
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
          beginOption={beginEvery}
          beginEveryOption={weeks}
          disabled={props.state.type !== 'beginInterval'}
          validate={(_, v) => (_ === 'begin' ? v >= 1 && v <= 4 : true)}
          label={['第', '的', null]}
        />
      ),
    },
    {
      value: 'last',
      label: (
        <>
          本月最后一个
          <n-select
            value={props.state.last}
            onChange={(e) => {
              props.onChange('last', Number(e.detail[0]));
            }}
            options={weeks}
            disabled={props.state.type !== 'last'}
            css={selectCss}
            popup-css={selectPortalCss}
            dropdown-match-select-width={false}
            arrow={true}
          />
        </>
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体星期数（至少选择一项）"
          value={props.state.some}
          options={weeks}
          type={props.state.type}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return <Item options={options} onType={props.onType} state={props.state} />;
}

export default Week;
