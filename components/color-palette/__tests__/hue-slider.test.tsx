import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import HueSlider from '../hue-slider';

/**
 * @jest-environment jsdom
 */
describe('test HueSlider', () => {
  it('basic', async () => {
    const testId = 'hue-slider-basic';

    render(<HueSlider data-testid={testId} className="basic" />);
    await act(async () => {
      fireEvent(
        screen.getByTestId(testId),
        new FakeMouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          offsetX: 12,
        })
      );

      fireEvent(
        document.body,
        new FakeMouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          movementX: 1,
        })
      );
    });
    waitFor(() => document.body);
    fireEvent.mouseUp(document.body);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
  it('func', async () => {
    const testId = 'hue-slider';
    const handleChange = jest.fn();

    render(<HueSlider data-testid={testId} onChange={handleChange} />);
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
        movementX: -1,
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
