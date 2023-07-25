import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('ColorPalette', () => {
  function portal(container: HTMLElement, selector: string) {
    return (
      container.parentElement!.lastElementChild!.shadowRoot!.querySelector(
        'n-menu',
      )! as unknown as HTMLElement
    ).shadowRoot!.querySelector(selector)!;
  }
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

    const { container, getByTestId } = render(() => <n-color-palette data-testid={'palette'} />);
    const hexEl = getByTestId(testId)
      .shadowRoot?.querySelectorAll<HTMLInputElement>('.input')[0]!
      .shadowRoot!.querySelector('input') as HTMLInputElement;

    expect(hexEl).toBeInTheDocument();
    fireEvent.change(hexEl, {
      target: {
        value: '101',
      },
    });
    fireEvent.keyUp(hexEl, { key: 'Enter' });
    fireEvent.blur(hexEl);

    getByTestId<HTMLInputElement>(testId).value = 'rgba(255,255,255,1)';

    getByTestId(testId)
      .shadowRoot!.querySelectorAll('n-input-number')
      .forEach((e, i) => {
        fireEvent.input((e as HTMLElement).shadowRoot!.querySelector('input')!, {
          target: {
            value: i === 3 ? -0.1 : 101,
          },
        });
        fireEvent.change((e as HTMLElement).shadowRoot!.querySelector('input')!, {
          target: {
            value: i === 3 ? -0.1 : 101,
          },
        });
      }) as unknown as HTMLInputElement[];

    const a = (
      getByTestId(testId).shadowRoot!.querySelectorAll('n-input-number')[3]! as HTMLElement
    ).shadowRoot!.querySelector('input')!;

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
    fireEvent.mouseDown(getByTestId(testId).shadowRoot!.querySelector('.picker')!);
    fireEvent.mouseMove(document.body, {
      movementX: -100,
    });
    fireEvent.mouseUp(document.body);
    fireEvent.mouseDown(
      (
        getByTestId(testId).shadowRoot!.querySelector('n-dropdown')! as unknown as HTMLElement
      ).shadowRoot!.querySelector('.switch')!,
    );
    fireEvent.click(portal(container, '.item'));
    fireEvent.input(a, {
      target: {
        value: 'NAN',
      },
    });
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
