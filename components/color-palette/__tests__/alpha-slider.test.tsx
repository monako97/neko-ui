import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AlphaSlider from '../alpha-slider';

/**
 * @jest-environment jsdom
 */
describe('test AlphaSlider', () => {
  it('basic', async () => {
    const testId = 'alpha-slider-basic';

    render(<AlphaSlider data-testid={testId} value={0.1} className="basic" />);
    fireEvent(
      screen.getByTestId(testId),
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 0,
      })
    );
    fireEvent.mouseMove(document.body, {
      movementX: 1,
      movementY: 1,
    });
    waitFor(() => document.body);
    fireEvent.mouseUp(document.body);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
  it('func', async () => {
    const testId = 'alpha-slider';
    const handleChange = jest.fn();

    render(<AlphaSlider data-testid={testId} onChange={handleChange} />);
    fireEvent(
      screen.getByTestId(testId),
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 1,
      })
    );
    fireEvent(
      document.body,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: -200,
      })
    );
    waitFor(() => document.body);
    fireEvent(
      screen.getByTestId(testId),
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 170,
      })
    );
    fireEvent(
      document.body,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: 100,
      })
    );
    waitFor(() => document.body);
    fireEvent.mouseUp(document.body);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
