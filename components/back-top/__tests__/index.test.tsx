import { For } from 'solid-js';
import { fireEvent, render } from '@solidjs/testing-library';
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

    render(() => {
      return (
        <>
          <div data-testid="box">
            <For each={data}>
              {(_, i) => (
                <div style={{ height: '100px' }}>
                  data
                  <br />
                  {i()}
                </div>
              )}
            </For>
          </div>
          <n-back-top data-testid="back-top" visibility-height={200} target={() => document.body} />
        </>
      );
    });

    document.body.style.height = '100px';
    document.body.style.overflow = 'auto';

    fireEvent.scroll(document.body);
    fireEvent.click(screen.getByTestId('back-top'));
    // fireEvent.animationEnd(screen.getByTestId('back-top').shadowRoot?.querySelector('.back-top'));
  });
});
