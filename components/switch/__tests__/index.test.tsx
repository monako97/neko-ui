import { fireEvent, render } from '@solidjs/testing-library';

describe('Switch', () => {
  it('normal', () => {
    const { container } = render(() => <n-switch />);

    expect(container).toBeInTheDocument();
  });
  it('onChange', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => <n-switch data-testid="onChange" onChange={change} />);

    const el = getByTestId('onChange').shadowRoot!.querySelector('.switch')!;

    expect(el).toBeInTheDocument();
    fireEvent.focus(el);
    fireEvent.keyUp(el, { key: 'Enter' });
    expect(change).toBeCalled();
  });
  it('disabled', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-switch
        data-testid="disabled"
        checked-text="开"
        un-checked-text="关"
        disabled={true}
        onChange={change}
      />
    ));

    expect(getByTestId('disabled')).toBeInTheDocument();
    fireEvent.click(getByTestId('disabled'));
    expect(change).not.toBeCalled();
  });
  it('loading', () => {
    const change = jest.fn();
    const { getByTestId } = render(() => (
      <n-switch data-testid="loading" loading={true} onChange={change} />
    ));

    expect(getByTestId('loading')).toBeInTheDocument();
    fireEvent.click(getByTestId('loading'));
    expect(change).not.toBeCalled();
  });
});
