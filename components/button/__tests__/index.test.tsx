import React from 'react';
import Button from '../index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getPrefixCls } from '../../utils';

/**
 * @jest-environment jsdom
 */
describe('test Button', () => {
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });
  it('normal', () => {
    const { container } = render(<Button>cascacsa</Button>);

    expect(container).toBeInTheDocument();
  });
  it('args', () => {
    render(
      <Button type="primary" circle ghost float dashed fill infinite data-testid="btn">
        type ghost circle dashed float fill infinite
      </Button>
    );

    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('ghost')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('circle')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('float')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('dashed')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('fill')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('infinite')));
    expect(screen.getByTestId('btn').classList.contains(getPrefixCls('primary')));
  });
  it('event', async () => {
    const click = jest.fn();
    const { container } = render(
      <Button className="btn" onClick={click} data-testid="btn">
        cascacsa
      </Button>
    );

    expect(container.querySelector('.btn')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('btn'));
    fireEvent.animationEnd(screen.getByTestId('btn'));

    jest.advanceTimersByTime(1000);
    await waitFor(() => screen.getByTestId('btn'));
    expect(click).toHaveBeenCalled();
  });
});
