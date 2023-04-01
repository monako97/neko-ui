import { createElement, Fragment } from 'react';
import { render } from '@testing-library/react';
import { colorScheme } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test colorScheme', () => {
  it('dark', () => {
    render(createElement(Fragment));
    const { scheme } = colorScheme;

    expect(scheme).toBe('dark');
    colorScheme.scheme = 'light';
  });
});
