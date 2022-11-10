import React from 'react';
import InputNumber from '../index';
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test InputNumber', () => {
  it('formatter & parser & mouseMove', () => {
    const handleChange = jest.fn();

    render(
      <InputNumber
        data-testid="input-formatter"
        formatter={(v) => `${((v as number) || 0) * 100}%`}
        parser={(v) => parseFloat(v?.toString().replace(/%$/, '') || '0') / 100}
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByTestId('input-formatter'), {
      target: {
        value: 1,
      },
    });
    fireEvent.keyDown(screen.getByTestId('input-formatter'), {
      key: 'ArrowUp',
    });
    fireEvent.keyDown(screen.getByTestId('input-formatter'), {
      key: 'ArrowDown',
    });
    fireEvent.mouseDown(screen.getByTestId('input-formatter'));
    fireEvent.mouseMove(document.body, {
      movementX: 1,
      movementY: 1,
    });
    fireEvent.mouseUp(document.body);
    fireEvent.change(screen.getByTestId('input-formatter'), {
      target: {
        value: '1-1',
      },
    });
    expect(screen.getByTestId('input-formatter')).toBeInTheDocument();
  });
  it('max & min', async () => {
    const testId = 'input-min-max';

    render(<InputNumber data-testid={testId} min={1} max={100} />);

    fireEvent.change(screen.getByTestId(testId), {
      target: {
        value: 0,
      },
    });
    fireEvent.change(screen.getByTestId(testId), {
      target: {
        value: 101,
      },
    });
    fireEvent.change(screen.getByTestId(testId), {
      target: {
        value: 'a-2',
      },
    });
    fireEvent.mouseDown(screen.getByTestId(testId));
    fireEvent.mouseMove(document.body, {
      movementX: 1,
      movementY: 1,
    });
    fireEvent.mouseUp(document.body);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
