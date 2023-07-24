import { For } from 'solid-js';
import { fireEvent, render, waitFor } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('BackTop', () => {
  it('basic', () => {
    render(() => <n-back-top mount={document.body} target={document.body} />);

    fireEvent.scroll(window);
  });

  it('target', async () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    const data = new Array(40).fill(0);
    const testid = 'box';
    const backTopTestId = 'back-top';

    const { getByTestId } = render(() => {
      let box: HTMLDivElement | undefined;

      return (
        <div
          data-testid={testid}
          ref={box}
          style={{ height: '100px', overflow: 'auto', position: 'relative' }}
        >
          <div>
            <For each={data}>
              {(_, i) => (
                <p>
                  data
                  <br />
                  {i()}
                </p>
              )}
            </For>
          </div>
          <n-back-top data-testid={backTopTestId} visibility-height={200} target={() => box!} />
        </div>
      );
    });

    getByTestId(testid).scrollTo = jest.fn();
    getByTestId(testid).scrollTop = 30;

    await waitFor(() => {
      fireEvent.scroll(screen.getByTestId(testid));
    });

    // fireEvent.click(screen.getByShadowTestId(backTopTestId));
    // fireEvent.scroll(screen.getByTestId(testid));
    // fireEvent.animationEnd(screen.getByShadowTestId(backTopTestId));
  });
});
