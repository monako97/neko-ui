import '../index';

/**
 * @jest-environment jsdom
 */
describe('test switch', () => {
  it('normal', () => {
    const app = '<n-switch></n-switch>';

    document.body.innerHTML = app;
    expect(document.body.querySelector('n-switch')?.shadowRoot).toBe(true);
  });
  // it('onChange', () => {
  //   const change = jest.fn();

  //   const { getByTestId } = render(<Switch data-testid="onChange" onChange={change} />);

  //   expect(getByTestId('onChange')).toBeInTheDocument();
  //   fireEvent.focus(getByTestId('onChange'));
  //   fireEvent.keyUp(getByTestId('onChange'), { key: 'Enter' });
  //   expect(change).toBeCalled();
  // });
  // it('disabled', () => {
  //   const change = jest.fn();
  //   const { getByTestId } = render(
  //     <Switch data-testid="disabled" onLabel="开" offLabel="关" disabled onChange={change} />
  //   );

  //   expect(getByTestId('disabled')).toBeInTheDocument();
  //   expect(change).not.toBeCalled();
  // });
  // it('loading', () => {
  //   const change = jest.fn();
  //   const { getByTestId } = render(<Switch data-testid="loading" loading onChange={change} />);

  //   expect(getByTestId('loading')).toBeInTheDocument();
  //   expect(change).not.toBeCalled();
  // });
});
