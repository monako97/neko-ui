import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ColorPicker } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test ColorPicker', () => {
  it('normal', async () => {
    const testId = 'ColorPicker-test-id';

    render(<ColorPicker data-testid={testId} popupClassName="ColorPicker-overlay" size="small" />);

    await act(async () => {
      fireEvent.click(screen.getByTestId(testId));
    });
    await act(async () => {
      fireEvent.click(document.body);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.animationEnd(document.querySelector('.ColorPicker-overlay')!);
  });
  it('size', () => {
    const testId = 'ColorPicker-size-test-id';

    render(<ColorPicker data-testid={testId} size="small" />);

    // expect(screen.getByTestId(testId).className.includes('-color-small')).toBe(true);
  });
});