import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Avatar', () => {
  it('normal', () => {
    render(() => (
      <n-button data-testid="btn" icon={() => <span>icon</span>}>
        button
      </n-button>
    ));

    expect(screen.getByTestId('btn')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('btn'));
  });
  it('args', () => {
    render(() => (
      <n-button
        type="primary"
        link={true}
        circle={true}
        ghost={true}
        flat={true}
        dashed={true}
        block={true}
        fill={true}
        danger={true}
        icon={<span>icon</span>}
        data-testid="btn"
      >
        button
      </n-button>
    ));
  });
  it('event', async () => {
    const click = jest.fn();

    render(() => (
      <n-button onClick={click} data-testid="btn">
        button
      </n-button>
    ));
    const btn = screen.getByTestId('btn').shadowRoot?.querySelector<Element>('button');

    expect(btn).toBeInTheDocument();
    fireEvent.click(btn!);
    fireEvent.animationEnd(btn!);

    expect(click).toHaveBeenCalled();
  });
  it('disabled', async () => {
    const click = jest.fn();

    render(() => (
      <n-button onClick={click} disabled={true} data-testid="btn">
        button
      </n-button>
    ));

    const btn = screen.getByTestId('btn').shadowRoot?.querySelector<Element>('button');

    expect(btn).toBeInTheDocument();
    fireEvent.click(btn!);
    expect(click).not.toHaveBeenCalled();
  });
});
