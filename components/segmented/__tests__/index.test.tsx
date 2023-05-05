import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Segmented } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('string options', () => {
    const { getByTestId, getByText } = render(
      <Segmented
        data-testid="string options"
        value="1"
        options={['option-1', 'option-2', 'option-3']}
      />
    );

    expect(getByTestId('string options')).toBeInTheDocument();
    fireEvent.click(getByText('option-3'));
    fireEvent.click(getByText('option-1'));
  });
  it('normal', () => {
    const { getByTestId, getByText } = render(
      <Segmented
        data-testid="normal"
        value="1"
        options={[
          { value: '1', label: 'option-1', disabled: true },
          { value: '2', label: 'option-2', icon: 'ss' },
          { value: '3', label: 'option-3' },
        ]}
      />
    );

    expect(getByTestId('normal')).toBeInTheDocument();
    fireEvent.focus(getByTestId('normal'));
    fireEvent.blur(getByTestId('normal'));
    fireEvent.click(getByText('option-3'));
    fireEvent.click(getByText('option-1'));
  });
  it('onChange', () => {
    const change = jest.fn();
    const { getByTestId, getByText } = render(
      <Segmented
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
    fireEvent.click(getByText('option-3'));
    fireEvent.click(getByText('option-2'));
    fireEvent.keyUp(getByText('option-3'), { key: 'Enter' });
  });
  it('disabled', () => {
    const { getByTestId, getByText } = render(
      <Segmented
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
    fireEvent.click(getByText('option-1'));
  });
});
