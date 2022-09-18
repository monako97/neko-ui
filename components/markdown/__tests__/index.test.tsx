import React from 'react';
import Markdown from '../index';
import { act, render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 Markdown 默认', () => {
  render(<Markdown text={`# h1\n> b`} />);
  expect(screen.getByText('b')).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 Markdown gfm', () => {
  const altText = '/assets/images/ypi.png';

  render(
    <Markdown
      className="md"
      style={{}}
      tools={[]}
      text={`[TOC]\n# table\n## table-h2\n

| 属性               | 说明             | 类型                | 默认值         | 版本 |
| ------------------ | ---------------- | ------------------- | -------------- | ---- |
| className          | 自定义类名       | string              | -              | -    |


![/assets/images/ypi.png](${altText})

    `}
    />
  );

  act(() => {
    screen.getByAltText(altText).click();
  });
  expect(screen.getByText('自定义类名')).toBeInTheDocument();
  expect(screen.getByAltText(altText)).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 Markdown code', () => {
  const { container } = render(
    <Markdown
      className="md"
      langLineNumber={false}
      getAnchorContainer={() => document.body}
      pictureViewer={false}
      text={`
      \`\`\`javascript
      var a = 0;
      \`\`\`\n
      \`\`\`typescript
      const a = 0;
      \`\`\`\n
      \`\`\`css
      a {
        color: red;
      }
      \`\`\`\n
      \`\`\`diff
      + 1
      - 2
      \`\`\`\n
    `}
    />
  );

  act(() => {
    screen.getByRole('button').click();
  });
  expect(container.querySelector('code')).toBeInTheDocument();
});
