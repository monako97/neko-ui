import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';
import { selectCss, selectPortalCss } from './style';

function Year(props: Required<Omit<CronItemProps<'year'>, 'options'>>) {
  const fullYear = new Date().getFullYear();
  const years: number[] = [];

  for (let i = 0, len = 2099 - fullYear; i <= len; i++) {
    years.push(fullYear + i);
  }

  const options = [
    { value: '*', label: '每年' },
    { value: '?', label: '不指定' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={years}
          disabled={props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => (_ === 'start' ? v >= fullYear : v >= fullYear + 1)}
          label={['周期从', '到', '年']}
        />
      ),
    },
    {
      value: 'beginInterval',
      label: (
        <>
          从
          <n-select
            value={props.state.begin}
            onChange={(e) => {
              const [value] = e.detail;
              const v = Number(value);

              if (v >= fullYear) {
                props.onChange('begin', v);
              }
            }}
            options={years}
            disabled={props.state.type !== 'beginInterval'}
            css={selectCss}
            popup-css={selectPortalCss}
            dropdown-match-select-width={false}
            arrow={true}
          />
          年开始触发，每隔
          <n-input-number
            value={props.state.beginEvery}
            css={`
              .fieldset {
                width: 70px;
                min-width: unset;
              }
            `}
            onChange={(e) => {
              const v = Number(e.detail);

              if (v) {
                props.onChange('beginEvery', v);
              }
            }}
            disabled={props.state.type !== 'beginInterval'}
            min={0}
          />
          年触发1次
        </>
      ),
    },
    {
      value: 'some',
      label: (
        <Some
          label="具体年（至少选择一项）"
          value={props.state.some}
          options={years}
          type={props.state.type}
          onChange={props.onChange}
        />
      ),
    },
  ];

  return <Item options={options} onType={props.onType} state={props.state} />;
}

export default Year;
