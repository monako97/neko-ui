import { fireEvent, render, waitFor } from '@solidjs/testing-library';
import type { CarouselElement } from 'neko-ui';
import { screen } from 'shadow-dom-testing-library';

describe('BackTop', () => {
  it('basic', () => {
    render(() => (
      <n-carousel offset={2}>
        <div>3 / 1</div>
        <div>3 / 2</div>
        <div>3 / 3</div>
      </n-carousel>
    ));
  });
  it('dots', () => {
    const change = jest.fn();
    const list = Array(22)
      .fill(0)
      .map((_, i) => <div>22 / {i + 1}</div>);

    render(() => (
      <n-carousel data-testid="carousel" onChange={change} dots={true}>
        {list}
      </n-carousel>
    ));

    const dots = screen.getByTestId('carousel').shadowRoot!.querySelectorAll('.dot');
    const item = screen.getByTestId('carousel').shadowRoot!.querySelectorAll('.item')[1];

    fireEvent.click(dots[1]);
    fireEvent.animationEnd(item);
    fireEvent.click(dots[2]);
    fireEvent.animationEnd(item);
    fireEvent.click(dots[0]);
    fireEvent.animationEnd(item);
    fireEvent.click(screen.getByTestId('carousel').shadowRoot!.querySelector('.prev')!);
    fireEvent.animationEnd(item);
    fireEvent.click(screen.getByTestId('carousel').shadowRoot!.querySelector('.next')!);
    fireEvent.animationEnd(item);
    fireEvent.click(dots[2]);
    expect(change).toHaveBeenCalled();
  });
  it('header', () => {
    render(() => (
      <n-carousel header={(num) => <>header {num}</>}>
        <div>3 / 1</div>
        <div>3 / 2</div>
        <div>3 / 3</div>
      </n-carousel>
    ));
  });
  it('autoplay', async () => {
    jest.useFakeTimers();
    render(() => (
      <n-carousel data-testid="carousel" dots={true} autoplay={1}>
        <div>3 / 1</div>
        <div>3 / 2</div>
        <div>3 / 3</div>
      </n-carousel>
    ));

    await waitFor(() => {
      jest.advanceTimersByTime(300);
    });

    screen.getByTestId<CarouselElement & HTMLElement>('carousel').autoplay = 0;

    await waitFor(() => {
      jest.advanceTimersByTime(300);
    });
    jest.clearAllTimers();
  });
});
