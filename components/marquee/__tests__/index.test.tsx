import React from 'react';
import Marquee from '../index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 Marquee', () => {
  const { container } = render(<Marquee>cascacsa</Marquee>);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 Marquee 事件', async () => {
  const start = jest.fn();
  const stop = jest.fn();
  const { container } = render(
    <Marquee className="marquee" onStart={start} onStop={stop} data-testid="marquee">
      cascacsa
    </Marquee>
  );

  Object.defineProperty(screen.getByTestId('marquee'), 'stop', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(screen.getByTestId('marquee'), 'start', {
    writable: true,
    value: jest.fn(),
  });

  expect(container.querySelector('.marquee')).toBeInTheDocument();
  fireEvent.mouseOver(screen.getByTestId('marquee'));
  fireEvent.mouseOut(screen.getByTestId('marquee'));

  await waitFor(() => screen.getByTestId('marquee'));
  expect(stop).toHaveBeenCalled();
  expect(start).toHaveBeenCalled();
});
