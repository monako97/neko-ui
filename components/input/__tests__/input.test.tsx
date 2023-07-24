import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';
/**
 * @jest-environment jsdom
 */
describe('test Input', () => {
  it('normal', () => {
    const { getByTestId } = render(() => <n-input data-testid="btn" />);

    expect(getByTestId('btn')).toBeInTheDocument();
    fireEvent.focus(getByTestId('btn'));
    fireEvent.blur(getByTestId('btn'));
  });
  it('size', () => {
    render(() => <n-input data-testid="size" size="small" />);
  });
  it('prefix', () => {
    render(() => <n-input prefix-icon={<span data-testid="prefix-tag">prefix</span>} disabled />);

    expect(screen.getByShadowTestId('prefix-tag')).toBeInTheDocument();
  });
  it('suffix', async () => {
    const handleChange = jest.fn();

    render(() => (
      <n-input
        data-testid="input-suffix"
        type="number"
        onChange={handleChange}
        suffix-icon={<span data-testid="suffix-tag">suffix</span>}
      />
    ));

    fireEvent.input(screen.getByTestId('input-suffix'), {
      target: {
        value: '1-',
      },
    });
    fireEvent.input(screen.getByTestId('input-suffix'), {
      target: {
        value: 'a-',
      },
    });
    expect(screen.getByShadowTestId('suffix-tag')).toBeInTheDocument();
  });
  it('label', () => {
    const handleChange = jest.fn();

    render(() => <n-input data-testid="label" label="label" onChange={handleChange} />);

    fireEvent.blur(screen.getByTestId('label').shadowRoot!.querySelector('input')!);
    fireEvent.keyDown(screen.getByTestId('label').shadowRoot!.querySelector('input')!);
    fireEvent.keyUp(screen.getByTestId('label').shadowRoot!.querySelector('input')!);
    fireEvent.mouseDown(screen.getByTestId('label').shadowRoot!.querySelector('input')!);
    fireEvent.change(screen.getByTestId('label').shadowRoot!.querySelector('input')!, {
      target: {
        value: 1,
      },
    });
    expect(screen.getByTestId('label').shadowRoot?.querySelector('.label')!.textContent).toBe(
      'label',
    );
  });
  it('formatter & parser', () => {
    const handleChange = jest.fn();

    render(() => (
      <n-input
        data-testid="input-formatter"
        formatter={(v) => `${((v as number) || 0) * 100}%`}
        parser={(v) => parseFloat(v?.toString().replace(/%$/, '') || '0') / 100}
        onChange={handleChange}
      />
    ));

    fireEvent.input(screen.getByTestId('input-formatter'), {
      target: {
        value: 1,
      },
    });
    expect(screen.getByTestId('input-formatter')).toBeInTheDocument();
  });
});
