import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Popover', () => {
  function portal(container: HTMLElement, selector: string) {
    return container.parentElement!.lastElementChild!.shadowRoot!.querySelector(selector)!;
  }
  it('默认', async () => {
    const { container } = render(() => (
      <n-popover
        data-testid="tooltip"
        content="Tooltip content"
        class="tooltip-cls"
        popup-css={{ padding: 8 }}
        dropdown-match-select-width={true}
        onOpenChange={jest.fn()}
      >
        Tooltip
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    fireEvent.wheel(document.body);
    fireEvent.mouseLeave(el);
    fireEvent.animationEnd(portal(container, '.portal'));
  });

  it('hover', async () => {
    const { container } = render(() => (
      <n-popover data-testid="tooltip" content="Tooltip hover" trigger="hover">
        Tooltip
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    fireEvent.animationEnd(portal(container, '.portal'));
  });
  it('contextMenu', async () => {
    const { container } = render(() => (
      <n-popover
        data-testid="tooltip"
        popup-class="tooltip-overlay"
        trigger="contextMenu"
        content="Tooltip contextMenu"
        onOpenChange={jest.fn()}
        placement="bottomLeft"
      >
        Tooltip
      </n-popover>
    ));

    const el = screen.getByTestId('tooltip').shadowRoot!.querySelector('.popover')!;

    fireEvent.contextMenu(el);
    fireEvent.click(document.body);
    fireEvent.animationEnd(portal(container, '.portal'));
  });
});
