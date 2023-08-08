import { For, createMemo } from 'solid-js';
import { cx } from '@moneko/css';
import dayjs from './dayjs';

type DatePanelProps = {
  current: dayjs.Dayjs;
  onChange(next: dayjs.Dayjs): void;
};
function DatePanel(props: DatePanelProps) {
  function getDays(_dayjs: dayjs.Dayjs): number[] {
    return Array.from({ length: _dayjs.daysInMonth() }, (_, i) => i + 1);
  }
  const prevDays = createMemo(() => {
    const len = props.current.startOf('month').day();

    if (!len) return [];
    const _: number[] = [];
    const lastDayOfMonth = props.current.subtract(1, 'month').endOf('month');

    for (let i = len - 1; i >= 0; i--) {
      _.push(lastDayOfMonth.subtract(i, 'day').get('date'));
    }

    return _;
  });
  const nextDays = createMemo(() =>
    Array.from({ length: 6 - props.current.endOf('month').day() }, (_, i) => i + 1),
  );

  const allDays = createMemo(() => [...prevDays(), ...getDays(props.current), ...nextDays()]);

  function isPrev(idx: number) {
    return idx < prevDays().length;
  }
  function isNext(idx: number) {
    return idx >= allDays().length - nextDays().length;
  }
  return (
    <For each={allDays()}>
      {(d, i) => {
        const cls = createMemo(() => {
          const idx = i();

          if (isPrev(idx)) return 'date-day date-opacity';
          if (isNext(idx)) return 'date-day date-opacity';
          return 'date-day';
        });
        const isActive = createMemo(() => {
          const idx = i();

          return !isPrev(idx) && !isNext(idx) && props.current.get('date') === d;
        });

        function setDate(date: number) {
          const idx = i();
          const previousMonth = props.current.subtract(1, 'month');
          const nextMonth = props.current.subtract(-1, 'month');

          const next = (isPrev(idx) ? previousMonth : isNext(idx) ? nextMonth : props.current).set(
            'date',
            date,
          );

          if (!props.current.isSame(next)) {
            props.onChange(next);
          }
        }

        return (
          <n-button
            type="primary"
            circle={true}
            flat={true}
            class={cx(cls(), isActive() && 'date-active')}
            tag={isActive() ? 'strong' : 'button'}
            onClick={setDate.bind(null, d)}
          >
            {d}
          </n-button>
        );
      }}
    </For>
  );
}

export default DatePanel;
