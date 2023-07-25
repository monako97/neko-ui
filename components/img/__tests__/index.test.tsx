import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Img', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }

  it('basic', async () => {
    const { container } = render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        open={true}
      />
    ));

    expect(container).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.wheel(document.documentElement);
    fireEvent.click(portal(container, '.close'));
    fireEvent.animationEnd(portal(container, '.portal'));
  });
  it('mask-closable', async () => {
    const { container } = render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        mask-closable={true}
        onOpenChange={jest.fn()}
      />
    ));

    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.click(portal(container, '.portal'));
    fireEvent.animationEnd(portal(container, '.portal'));
  });
  it('esc', async () => {
    render(() => (
      <n-img
        data-testid="img"
        src="https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg"
        alt="img"
        esc-closable={true}
      />
    ));

    fireEvent.click(screen.getByTestId('img').shadowRoot!.querySelector('.img')!);
    fireEvent.keyDown(screen.getByTestId('img'), {
      key: 'Escape',
    });
  });
});
