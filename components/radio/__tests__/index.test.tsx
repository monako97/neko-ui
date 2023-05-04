import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Radio } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('normal', () => {
    const { getByTestId, getByLabelText } = render(
      <Radio
        data-testid="normal"
        value="1"
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
      <Radio
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
      <Radio
        data-testid="disabled"
        value="1"
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
});
