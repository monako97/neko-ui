import type { BaseOption } from 'neko-ui';

import BeginInterval from './begin-interval';
import Item, { type CronItemProps } from './item';
import Period from './period';
import Some from './some';
import { selectCss, selectPortalCss } from './style';

function Day(props: Required<Omit<CronItemProps<'day'>, 'options' | 'disabled'>> & { disabled?: boolean },
) {
  const days: BaseOption[] = [];
  const daysBeginEvery: number[] = [];

  for (let x = 1; x < 32; x++) {
    days.push({
      label: x < 10 ? `0${x}` : `${x}`,
      value: x,
    });
    daysBeginEvery.push(x);
  }

  const options = [
    { value: '*', label: '每日' },
    { value: '?', label: '不指定' },
    {
      value: 'period',
      label: (
        <Period
          start={props.state.start}
          end={props.state.end}
          options={days}
          disabled={props.disabled || props.state.type !== 'period'}
          onChange={props.onChange}
          validate={(_, v) => v >= 1 && v < 31}
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
          beginOption={days}
          beginEveryOption={daysBeginEvery}
          disabled={props.disabled || props.state.type !== 'beginInterval'}
          validate={(_, v) => v >= 1 && v <= 31}
          label={['从', '日开始, 每', '天执行一次']}
        />
      ),
    },
    {
      value: 'closeWorkDay',
      label: (
        <>
          每月离
          <n-select
            value={props.state.closeWorkDay}
            onChange={(e) => {
              const [value] = e.detail;
              const v = Number(value);

              if (v >= 1 && v <= 31) {
                props.onChange('closeWorkDay', v);
              }
            }}
            options={days}
            disabled={props.disabled || props.state.type !== 'closeWorkDay'}
            css={selectCss}
            popup-css={selectPortalCss}
            dropdown-match-select-width={false}
            arrow={true}
          />
          日最近的那个工作日
        </>
      ),
    },
    { value: 'last', label: '本月最后1天' },
    {
      value: 'some',
      label: (
        <Some
          label="具体天数（至少选择一项）"
          value={props.state.some}
          options={days}
          type={props.state.type}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      ),
    },
  ];

  return (
    <Item
      state={props.state}
      options={options}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
}

export default Day;
