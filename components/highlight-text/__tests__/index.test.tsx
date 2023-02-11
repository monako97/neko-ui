import React from 'react';
import { render } from '@testing-library/react';
import { HighlightText, strToHighlight, RegExp_HighLight } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
test('测试 HighlightText 默认', () => {
  const { container } = render(
    <HighlightText
      text="s"
      highlight="s"
      className="csca"
      style={{
        color: 'red',
      }}
      hitClassName="hit"
      hitStyle={{
        color: 'blue',
      }}
    />
  );

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 HighlightText 未匹配', () => {
  const { container } = render(<HighlightText text="sasc" highlight={'d'} />);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 HighlightText 无匹配内容', () => {
  const { container } = render(<HighlightText text="sasc" />);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 HighlightText 多条件', () => {
  const { container } = render(<HighlightText text="sasc" highlight={['a', 'c']} extra="csa" />);

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 HighlightText 多条件', () => {
  const { container } = render(
    <HighlightText
      text="sasc"
      highlight={[
        'a',
        {
          highlight: 'c',
          flag: 'i',
        },
      ]}
    />
  );

  expect(container).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 RegExp_HighLight', () => {
  const list = RegExp_HighLight.exec('a%c:sas:c%');

  expect('sas').toEqual((list as RegExpExecArray)[1]);
});

/**
 * @jest-environment jsdom
 */
test('测试 strToHighlight', () => {
  const list = strToHighlight('a%c:sas:c%');

  expect([{ text: 'a' }, { hit: true, text: 'sas' }]).toEqual(list);
});
