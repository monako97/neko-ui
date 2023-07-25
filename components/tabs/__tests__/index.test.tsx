import { fireEvent, render } from '@solidjs/testing-library';

describe('Tabs', () => {
  it('basic', () => {
    const { container, getByTestId } = render(() => (
      <n-tabs
        data-testid="tab"
        items={new Array(10).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            content: `Content of Tab Pane ${i + 1}`,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
    const tabs = getByTestId('tab').shadowRoot!.querySelector('.tabs')!;

    fireEvent.animationEnd(getByTestId('tab').shadowRoot!.querySelector('.content')!);
    fireEvent.wheel(tabs, {
      deltaX: 3,
      deltaY: 3,
    });
    fireEvent.wheel(tabs, {
      deltaX: -3,
      deltaY: -3,
    });
    tabs.querySelectorAll('n-button').forEach((e) => {
      fireEvent.click(e as unknown as HTMLElement);
      fireEvent.keyUp(e as unknown as HTMLElement, {
        key: 'Enter',
      });
    });
  });
  it('card', () => {
    const { container } = render(() => (
      <n-tabs
        type="card"
        items={new Array(2).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            content: `Content of Tab Pane ${i + 1}`,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
  });
  it('add remove', () => {
    const { getByTestId } = render(() => (
      <n-tabs
        data-testid="tab"
        type="card"
        add={true}
        items={new Array(3).fill(0).map((_, i) => {
          return {
            value: i,
            label: `Tab ${i}`,
            content: `Content of Tab Pane ${i}`,
            closable: true,
          };
        })}
        onEdit={jest.fn()}
      />
    ));

    fireEvent.click(getByTestId('tab').shadowRoot!.querySelector('.add')!);
    getByTestId('tab')
      .shadowRoot!.querySelectorAll('.tabs n-button')
      .forEach((e) => {
        const remove = e.shadowRoot!.querySelector('.remove');

        if (remove) {
          fireEvent.click(remove);
        }
      });
  });
  it('card', () => {
    const { container } = render(() => (
      <n-tabs
        centered={true}
        disabled={true}
        extra={{
          left: () => <n-button size="small">Left</n-button>,
          right: () => <n-button size="small">Right</n-button>,
        }}
        items={new Array(3).fill(0).map((_, i) => {
          return {
            value: i + 1,
            label: `Tab ${i + 1}`,
            disabled: i === 2,
            content: () => <div>{i + 1}</div>,
          };
        })}
      />
    ));

    expect(container).toBeInTheDocument();
  });
});
