import { createMemo, For } from 'solid-js';

import dayjs from './dayjs';

interface YearPanelProps {
  current: dayjs.Dayjs;
  start: number;
  onChange(next: dayjs.Dayjs): void;
}
function YearPanel(props: YearPanelProps) {
  const years = createMemo(() => {
    const start = props.start;

    return [start - 1, ...Array.from({ length: 10 }, (__, i) => start + i), start + 10];
  });

  return (
    <For each={years()}>
      {(y, i) => {
        function onChange() {
          props.onChange(props.current.set('years', y));
        }
        return (
          <n-button
            type="primary"
            flat={true}
            class="date-picker-month"
            classList={{
              'date-opacity': i() === 0 || i() === years().length - 1,
              'date-active': props.current.get('years') === y,
            }}
            tag={props.current.get('years') === y ? 'strong' : 'button'}
            onClick={onChange}
          >
            {y}
          </n-button>
        );
      }}
    </For>
  );
}

export default YearPanel;
