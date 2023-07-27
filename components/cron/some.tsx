import type { JSXElement } from 'solid-js';
import { selectPortalCss } from './style';
import type { CronData } from '.';
import type { BaseOption } from 'neko-ui';

type SomeProps = {
  value: CronData['some'];
  label: JSXElement;
  options: (string | number | BaseOption)[];
  type: CronData['type'];
  onChange(type: 'some', value: number[]): void;
};

function Some(props: SomeProps) {
  function onChange(e: CustomEvent<[val: (number | string)[], item: BaseOption]>) {
    const [value] = e.detail;

    if (value.length < 1) {
      return;
    }
    props.onChange('some', value as number[]);
  }
  return (
    <>
      {props.label}
      <n-select
        multiple={true}
        style={{ flex: 1 }}
        value={props.value}
        onChange={onChange}
        options={props.options}
        disabled={props.type !== 'some'}
        popup-css={selectPortalCss}
        dropdown-match-select-width={false}
        arrow={true}
      />
    </>
  );
}

export default Some;
