import { fireEvent, render } from '@solidjs/testing-library';

describe('InputNumber', () => {
  it('formatter & parser & mouseMove', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(() => (
      <n-input-number
        data-testid="input-formatter"
        formatter={(v) => `${((v as number) || 0) * 100}%`}
        parser={(v) => parseFloat(v?.toString().replace(/%$/, '') || '0') / 100}
        onChange={handleChange}
      />
    ));

    const inp = getByTestId('input-formatter').shadowRoot!.querySelector('input')!;

    fireEvent.change(inp, {
      target: {
        value: 1,
      },
    });
    fireEvent.keyDown(inp, {
      key: 'ArrowUp',
    });
    fireEvent.keyDown(inp, {
      key: 'ArrowDown',
    });
    fireEvent.keyDown(inp, {
      key: 'Enter',
    });
    fireEvent.mouseDown(inp);
    fireEvent.mouseMove(document.body, {
      movementX: 1,
      movementY: 1,
    });
    fireEvent.mouseUp(document.body);
    fireEvent.change(inp, {
      target: {
        value: '1-1',
      },
    });
    expect(inp).toBeInTheDocument();
  });
  it('max & min', async () => {
    const { getByTestId } = render(() => (
      <n-input-number data-testid="input-min-max" min={1} max={100} />
    ));

    const inp = getByTestId('input-min-max').shadowRoot!.querySelector('input')!;

    fireEvent.change(inp, {
      target: {
        value: 0,
      },
    });
    fireEvent.change(inp, {
      target: {
        value: 101,
      },
    });
    fireEvent.change(inp, {
      target: {
        value: 'a-2',
      },
    });
    fireEvent.mouseDown(inp);
    fireEvent.mouseMove(document.body, {
      movementX: 1,
      movementY: 1,
    });
    fireEvent.mouseUp(document.body);
    expect(inp).toBeInTheDocument();
  });
});
