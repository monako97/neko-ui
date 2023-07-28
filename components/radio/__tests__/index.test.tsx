import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Radio', () => {
  it('string options', () => {
    const { getByTestId } = render(() => (
      <n-radio
        data-testid="string"
        default-value="option-1"
        options={['option-1', 'option-2', 'option-3']}
      />
    ));

    expect(getByTestId('string')).toBeInTheDocument();
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
  it('normal', () => {
    const { getByTestId } = render(() => (
      <n-radio
        data-testid="normal"
        value="1"
        layout="vertical"
        options={[
          { value: '1', label: 'option-1', disabled: true },
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
        ]}
      />
    ));

    expect(getByTestId('normal')).toBeInTheDocument();
    fireEvent.focus(getByTestId('normal'));
    fireEvent.blur(getByTestId('normal'));
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
  it('onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-radio
        data-testid="onChange"
        options={[
          { value: '2', label: 'option-2' },
          { value: '3', label: 'option-3' },
        ]}
        onChange={change}
      />
    ));

    expect(getByTestId('onChange')).toBeInTheDocument();
    fireEvent.focus(getByTestId('onChange'));
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-2'));
    fireEvent.keyUp(screen.getByShadowText('option-3'), { key: 'Enter' });
  });
  it('disabled', () => {
    const { getByTestId } = render(() => (
      <n-radio
        data-testid="disabled"
        value="1"
        disabled
        options={[
          { value: '1', label: 'option-1' },
          { value: '2', label: 'option-2' },
        ]}
      />
    ));

    expect(getByTestId('disabled')).toBeInTheDocument();
    fireEvent.focus(getByTestId('disabled'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
});
