import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Checkbox', () => {
  it('string options', () => {
    render(() => (
      <n-checkbox
        data-testid="string options"
        value={['option-1']}
        options={['option-1', 'option-2', 'option-3']}
      />
    ));

    expect(screen.getByTestId('string options')).toBeInTheDocument();
    fireEvent.click(screen.getByShadowText('option-3'));
    fireEvent.click(screen.getByShadowText('option-1'));
  });
  it('normal', () => {
    const { getByTestId } = render(() => (
      <n-checkbox
        data-testid="normal"
        value={['1']}
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
      <n-checkbox
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
      <n-checkbox
        data-testid="disabled"
        value={['1']}
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
  it('check all', () => {
    const { getByTestId } = render(() => (
      <n-checkbox
        data-testid="indeterminate"
        check-all={true}
        options={[
          { value: 1, label: '选项-1' },
          { value: 2, label: '选项-2' },
          { value: 3, label: '选项-3' },
          { value: 4, label: '选项-4' },
        ]}
        onChange={(e: { target: Any; detail: (string | number)[] }) => {
          if (e.target) {
            e.target.value = e.detail;
          }
        }}
      />
    ));

    expect(getByTestId('indeterminate')).toBeInTheDocument();
    fireEvent.focus(getByTestId('indeterminate'));
    fireEvent.click(screen.getByShadowText('全选'));
    fireEvent.click(screen.getByShadowText('全选'));
  });
});
