import { For, createMemo } from 'solid-js';
import { cx } from '@moneko/css';
import dayjs from './dayjs';

type MonthPanelProps = { current: dayjs.Dayjs; onChange(next: dayjs.Dayjs): void };

export const months = dayjs.monthsShort();

function MonthPanel(props: MonthPanelProps) {
  return (
    <For each={months}>
      {(m, i) => {
        const isActive = createMemo(() => {
          return props.current.get('month') === i();
        });

        function onChange() {
          props.onChange(props.current.set('month', i()));
        }

        return (
          <n-button
            type="primary"
            flat={true}
            class={cx('date-picker-month', isActive() && 'date-active')}
            tag={isActive() ? 'strong' : 'button'}
            onClick={onChange}
          >
            {m}
          </n-button>
        );
      }}
    </For>
  );
}

export default MonthPanel;
