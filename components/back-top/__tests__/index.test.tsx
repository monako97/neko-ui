import React from 'react';
import BackTop, { type BackTopProps } from '../index';
import { render, screen, fireEvent, act } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('test BackTop', () => {
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  const testPopupContainer = (hasGetPopupContainer: boolean) => {
    const data = new Array(20).fill(0);
    const props: BackTopProps = {};
    const testid = 'box' + hasGetPopupContainer;
    const backTopTestId = 'back-top-' + hasGetPopupContainer;

    if (hasGetPopupContainer) props.getPopupContainer = (node) => node;

    render(
      <div
        data-testid={testid}
        id="box"
        style={{ height: 100, overflow: 'auto', position: 'relative' }}
      >
        <div>
          {data.map((_, i) => {
            return <p key={i}>data-{i}</p>;
          })}
        </div>
        <BackTop
          data-testid={backTopTestId}
          visibilityHeight={200}
          target={() => document.querySelector('#box') || document.body}
          {...props}
        />
      </div>
    );
    screen.getByTestId(testid).scrollTo = jest.fn();

    act(() => {
      screen.getByTestId(testid).scrollTop = 1000;
      fireEvent.scroll(screen.getByTestId(testid));
    });
    act(() => {
      fireEvent.click(screen.getByTestId(backTopTestId));
      screen.getByTestId(testid).scrollTop = 0;
      fireEvent.scroll(screen.getByTestId(testid));
    });
    fireEvent.animationEnd(screen.getByTestId(backTopTestId));
  };

  it('测试 BackTop 默认', () => {
    const { container } = render(<BackTop />);

    expect(container).toBeInTheDocument();
    fireEvent.scroll(window);
  });

  it('test getPopupContainer', () => {
    testPopupContainer(false);
  });
  it('test getPopupContainer', () => {
    testPopupContainer(true);
  });
});
