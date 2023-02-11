import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Tooltip', () => {
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  it('测试 Tooltip 默认', () => {
    const { container } = render(
      <Tooltip
        data-testid="tooltip-test-id"
        title="Tooltip default"
        className="tooltip-cls"
        getPopupContainer={() => document.body}
        popupStyle={{ padding: 8 }}
        color="red"
      >
        Tooltip
      </Tooltip>
    );

    expect(container).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('tooltip-test-id'));
    });
    fireEvent.animationEnd(screen.getByTestId('tooltip-test-id'));
  });

  it('Tooltip hover', async () => {
    render(
      <Tooltip
        data-testid="tooltip-test-id"
        className="tooltip-cls"
        title="Tooltip hover"
        trigger="hover"
      >
        Tooltip
      </Tooltip>
    );

    await act(async () => {
      fireEvent.mouseOver(screen.getByTestId('tooltip-test-id'));
    });
    await act(async () => {
      fireEvent.mouseOut(screen.getByTestId('tooltip-test-id'));
    });
    fireEvent.animationEnd(screen.getByTestId('tooltip-test-id'));
  });
  it('Tooltip contextMenu', async () => {
    render(
      <Tooltip
        data-testid="tooltip-test-id"
        popupClassName="tooltip-overlay"
        title="Tooltip contextMenu"
        trigger={['contextMenu', 'click']}
      >
        Tooltip
      </Tooltip>
    );

    await act(async () => {
      fireEvent.contextMenu(screen.getByTestId('tooltip-test-id'));
    });
    await act(async () => {
      fireEvent.click(document.body);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.animationEnd(document.querySelector('.tooltip-overlay')!);
  });
});
