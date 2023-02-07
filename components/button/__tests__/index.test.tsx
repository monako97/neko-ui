import React from 'react';
import Button from '../index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test Button', () => {
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });
  it('normal', () => {
    render(
      <Button data-testid="btn" infinite>
        cascacsa
      </Button>
    );

    expect(screen.getByTestId('btn')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('btn'));
  });
  it('args', () => {
    render(
      <Button type="primary" link circle ghost float dashed fill infinite data-testid="btn">
        type ghost circle dashed float fill infinite
      </Button>
    );
  });
  it('event', async () => {
    const click = jest.fn();

    render(
      <Button onClick={click} data-testid="btn">
        cascacsa
      </Button>
    );

    fireEvent.click(screen.getByTestId('btn'));
    fireEvent.animationEnd(screen.getByTestId('btn'));

    jest.advanceTimersByTime(1000);
    await waitFor(() => screen.getByTestId('btn'));
    expect(click).toHaveBeenCalled();
  });
  it('disabled', async () => {
    const click = jest.fn();

    render(
      <Button onClick={click} disabled data-testid="btn">
        cascacsa
      </Button>
    );

    fireEvent.click(screen.getByTestId('btn'));

    await waitFor(() => screen.getByTestId('btn'));
    expect(click).not.toHaveBeenCalled();
  });
});
