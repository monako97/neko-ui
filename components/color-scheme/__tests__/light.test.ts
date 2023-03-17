import '../../../test/matchMedia-light';
import { createElement, Fragment } from 'react';
import { render } from '@testing-library/react';
import { colorScheme } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test colorScheme', () => {
  it('light', () => {
    render(createElement(Fragment));
    const { schema } = colorScheme;

    expect(schema).toBe('light');
  });
});
