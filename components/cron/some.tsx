import type { BaseOption } from 'neko-ui';

import type { JSXElement } from '../basic-config';

import type { CronData } from '.';
import { selectPortalCss } from './style';

interface SomeProps {
  value: CronData['some'];
  label: JSXElement;
  options: (string | number | BaseOption)[];
  type: CronData['type'];
  onChange(type: 'some', value: number[]): void;
  disabled?: boolean;
}

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
        disabled={props.disabled || props.type !== 'some'}
        popup-css={selectPortalCss}
        dropdown-match-select-width={false}
        arrow={true}
      />
    </>
  );
}

export default Some;
