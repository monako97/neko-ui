import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('string options', () => {
    const { getByTestId, getByText } = render(
      <Checkbox
        data-testid="string options"
        value={['option-1']}
        options={['option-1', 'option-2', 'option-3']}
      />
    );

    expect(getByTestId('string options')).toBeInTheDocument();
    fireEvent.click(getByText('option-3'));
    fireEvent.click(getByText('option-1'));
  });
  it('normal', () => {
    const { getByTestId, getByLabelText } = render(
      <Checkbox
        data-testid="normal"
        value={['1']}
        layout="vertical"
        options={[
          { value: '1', label: 'option-1', disabled: true },
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
        ]}
      />
    );

    expect(getByTestId('normal')).toBeInTheDocument();
    fireEvent.focus(getByTestId('normal'));
    fireEvent.blur(getByTestId('normal'));
    fireEvent.click(getByLabelText('option-3'));
    fireEvent.click(getByLabelText('option-1'));
  });
  it('onChange', () => {
    const change = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <Checkbox
        data-testid="onChange"
        options={[
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
        ]}
        onChange={change}
      />
    );

    expect(getByTestId('onChange')).toBeInTheDocument();
    fireEvent.focus(getByTestId('onChange'));
    fireEvent.click(getByLabelText('option-3'));
    fireEvent.click(getByLabelText('option-2'));
    fireEvent.keyUp(getByLabelText('option-3'), { key: 'Enter' });
  });
  it('disabled', () => {
    const { getByTestId, getByLabelText } = render(
      <Checkbox
        data-testid="disabled"
        value={['1']}
        disabled
        options={[
          { value: '1', label: 'option-1' },
          { value: '2', label: 'option-2' },
        ]}
      />
    );

    expect(getByTestId('disabled')).toBeInTheDocument();
    fireEvent.focus(getByTestId('disabled'));
    fireEvent.click(getByLabelText('option-1'));
  });
  it('indeterminate', () => {
    function IndeterminateDemo() {
      const [value, setValue] = React.useState(['3']);
      const options = React.useMemo(
        () => [
          { value: '1', label: 'option-1' },
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
          { value: '4', label: 'option-4' },
        ],
        []
      );
      const indeterminate = React.useMemo(() => {
        let _indeterminate = false;

        options.forEach((opt) => {
          if (value.length && !value.includes(opt.value)) {
            _indeterminate = true;
          }
        });
        return _indeterminate;
      }, [options, value]);

      return (
        <Checkbox
          data-testid="indeterminate"
          value={value}
          onChange={setValue}
          options={[{ value: 'all', label: '全选', indeterminate: indeterminate }, ...options]}
        />
      );
    }
    const { getByTestId, getByLabelText } = render(<IndeterminateDemo />);

    expect(getByTestId('indeterminate')).toBeInTheDocument();
    fireEvent.focus(getByTestId('indeterminate'));
    fireEvent.click(getByLabelText('全选'));
    fireEvent.click(getByLabelText('全选'));
  });
});
