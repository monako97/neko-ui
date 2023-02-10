import React from 'react';
import { ColorPalette } from 'neko-ui';
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test ColorPalette', () => {
  it('ColorPalette', () => {
    const testId = 'color-palette';

    render(<ColorPalette data-testid={testId} />);

    const colorCanvasEl = screen
      .getByTestId(testId)
      .querySelector('article canvas') as HTMLCanvasElement;

    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 170,
      })
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: 100,
      })
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 12,
      })
    );
    fireEvent(
      colorCanvasEl,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: -100,
      })
    );
    fireEvent.mouseUp(colorCanvasEl);
  });
  it('input change', () => {
    const testId = 'color-palette-input';

    render(<ColorPalette data-testid={testId} />);

    fireEvent.change(screen.getByTestId(testId), {
      value: 'rgba(255,255,255,1)',
    });
    const hexEl = screen.getByTestId(testId).querySelector('input[name=hex]') as HTMLElement;

    expect(hexEl).toBeInTheDocument();
    const rEl = screen.getByTestId(testId).querySelector('input[name=r]') as HTMLElement;

    expect(rEl).toBeInTheDocument();
    const gEl = screen.getByTestId(testId).querySelector('input[name=g]') as HTMLElement;

    expect(gEl).toBeInTheDocument();
    const bEl = screen.getByTestId(testId).querySelector('input[name=b]') as HTMLElement;

    expect(bEl).toBeInTheDocument();
    const aEl = screen.getByTestId(testId).querySelector('input[name=a]') as HTMLElement;

    expect(aEl).toBeInTheDocument();

    fireEvent.input(hexEl, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(rEl, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(gEl, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(bEl, {
      target: {
        value: 101,
      },
    });
    fireEvent.input(aEl, {
      target: {
        value: -0.1,
      },
    });
    fireEvent.input(aEl, {
      target: {
        value: '1a22',
      },
    });
    fireEvent(
      aEl,
      new FakeMouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        offsetX: 1,
      })
    );
    fireEvent(
      aEl,
      new FakeMouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        movementX: -100,
      })
    );
    fireEvent.input(aEl, {
      target: {
        value: 'NAN',
      },
    });
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
