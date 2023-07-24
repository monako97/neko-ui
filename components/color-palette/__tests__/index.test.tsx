import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('ColorPalette', () => {
  it('ColorPalette', () => {
    const { getByTestId } = render(() => <n-color-palette data-testid="palette" />);

    const colorCanvasEl = getByTestId('palette')?.shadowRoot?.querySelector(
      '.picker',
    ) as HTMLCanvasElement;

    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 170,
      }),
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: 100,
      }),
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 12,
      }),
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: -100,
      }),
    );
    fireEvent.mouseUp(colorCanvasEl);
    fireEvent.click(getByTestId('palette')?.shadowRoot?.querySelector('.preview') as HTMLElement);
  });
  it('input change', () => {
    const testId = 'palette';

    const { getByTestId } = render(() => <n-color-palette data-testid={'palette'} />);
    const hexEl = getByTestId(testId).shadowRoot?.querySelectorAll<HTMLInputElement>('.input')[0];

    expect(hexEl).toBeInTheDocument();
    fireEvent.input(hexEl as HTMLInputElement, {
      target: {
        value: 101,
      },
    });

    getByTestId<HTMLInputElement>(testId).value = 'rgba(255,255,255,1)';

    const [r, g, b, a] = getByTestId(testId).shadowRoot!.querySelectorAll(
      'n-input-number',
    ) as unknown as HTMLInputElement[];

    expect(r).toBeInTheDocument();
    expect(g).toBeInTheDocument();
    expect(b).toBeInTheDocument();
    expect(a).toBeInTheDocument();

    fireEvent.change(r, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(r, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(g, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(b, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(a, {
      target: {
        value: -0.1,
      },
    });
    fireEvent.input(a, {
      target: {
        value: '1a22',
      },
    });

    const hue = getByTestId(testId).shadowRoot!.querySelector<HTMLInputElement>('.hue');

    fireEvent.input(hue as HTMLInputElement, {
      target: {
        value: 0.51,
      },
    });
    const opacity = getByTestId(testId).shadowRoot!.querySelector<HTMLInputElement>('.opacity');

    fireEvent.input(opacity as HTMLInputElement, {
      target: {
        value: 0.51,
      },
    });
    fireEvent(
      a,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 1,
      }),
    );
    fireEvent(
      a,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: -100,
      }),
    );
    fireEvent.input(a, {
      target: {
        value: 'NAN',
      },
    });
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
