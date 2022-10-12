import React from 'react';
import BackTop from '../index';
import { render, screen, fireEvent, act } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test BackTop', () => {
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  it('测试 BackTop 默认', () => {
    const { container } = render(<BackTop />);

    expect(container).toBeInTheDocument();
    fireEvent.scroll(window);
  });

  it('测试 BackTop', async () => {
    const data = new Array(20).fill(0);

    render(
      <div
        data-testid="box"
        id="box"
        style={{ height: 100, overflow: 'auto', position: 'relative' }}
      >
        <div>
          {data.map((_, i) => {
            return <p key={i}>data-{i}</p>;
          })}
        </div>
        <BackTop
          data-testid="back-top"
          visibilityHeight={200}
          target={() => document.querySelector('#box') || document.body}
        />
      </div>
    );

    screen.getByTestId('box').scrollTo = jest.fn();
    act(() => {
      screen.getByTestId('box').scrollTop = 1000;
      fireEvent.scroll(screen.getByTestId('box'));
    });
    fireEvent.click(screen.getByTestId('back-top'));
    act(() => {
      screen.getByTestId('box').scrollTop = 0;
      fireEvent.scroll(screen.getByTestId('box'));
    });
    fireEvent.animationEnd(screen.getByTestId('back-top'));
  });
});
