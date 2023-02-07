import Markdown from '../index';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

const code_str = `\n
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
\`\`\`diff-javascript
+ 1
- 2
\`\`\`
\`\`\`
+ 1
- 2
\`\`\`\n`;

/**
 * @jest-environment jsdom
 */
describe('test Markdown', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  it('basic', () => {
    render(<Markdown getAnchorContainer={() => document.body} text={`# h1\n> b`} />);

    jest.advanceTimersByTime(300);
    expect(screen.getByText('b')).toBeInTheDocument();
    fireEvent.scroll(document.body);
  });

  it('TOC', () => {
    render(
      <Markdown
        text={`[TOC]\n
# h1text \n
<div style="height: 500px"></div>\n
## h2text \n
<div style="height: 500px"></div>\n
### h3text \n
<div style="height: 500px"></div>\n`}
      />
    );

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return this.parentNode.parentNode;
      },
    });
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('h3text');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('h2text');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('h1text');
    fireEvent.click(
      screen.getByRole('link', {
        name: 'h1text',
      })
    );
    fireEvent.click(
      screen.getByRole('link', {
        name: 'h3text',
      })
    );
    Object.defineProperty(window, 'scrollTop', {
      get() {
        return 1000;
      },
    });
    Object.defineProperty(window, 'offsetHeight', {
      get() {
        return 500;
      },
    });
    fireEvent.scroll(window);
  });

  it('no context', () => {
    render(<Markdown data-testid="md" />);

    act(() => {
      expect(screen.getByTestId('md')).toBeInTheDocument();
    });
  });
  it('tex', () => {
    render(
      <Markdown
        data-testid="md-tex"
        text={`
内联公式$\\xcancel{ABC}$
$$
\\begin{equation}
  x = a_0 + \\cfrac{1}{a_1 
          + \\cfrac{1}{a_2 
          + \\cfrac{1}{a_3 + \\cfrac{1}{a_4} } } }
\\end{equation}
$$`}
        tex
      />
    );
  });

  it('gfm', () => {
    const imgSrc = '/assets/images/ypi.png';

    render(
      <Markdown
        data-testid="md-gmf"
        style={{}}
        tools={[]}
        text={`
[TOC] \n
# table \n
## table-h2 \n

| 属性               | 说明             | 类型                | 默认值         | 版本 |
| ------------------ | ---------------- | ------------------- | -------------- | ---- |
| className          | 自定义类名       | string              | -              | -    |


![${imgSrc}](${imgSrc})

![q](${imgSrc})

    `}
      />
    );

    fireEvent.click(screen.getByAltText(imgSrc));
    fireEvent.click(
      document.documentElement.querySelector('.PhotoView-Slider__toolbarIcon') as HTMLElement
    );
    expect(screen.getByText('自定义类名')).toBeInTheDocument();
    expect(screen.getByAltText(imgSrc)).toBeInTheDocument();
  });
  it('pre > code', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return this.parentNode;
      },
    });
    const { container } = render(
      <Markdown
        className="md"
        pictureViewer={false}
        langLineNumber
        data-testid="md-precode"
        text={`
<svg data-testid="svg">svg</svg> \n
${code_str}
    `}
      />
    );

    fireEvent.click(screen.getByTestId('svg'));
    screen.getAllByRole('button').forEach((e) => {
      fireEvent.click(e);
    });
    jest.advanceTimersByTime(1000);
    act(() => {
      container.querySelectorAll('pre code').forEach((e) => {
        (e as HTMLElement).scrollTop = 1;
        Object.defineProperty(e, 'scrollHeight', {
          value: 100,
        });
        fireEvent.wheel(e);
      });
    });
  });
  it('pre > code wheel 2', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return this.parentNode?.parentNode;
      },
    });
    const { container } = render(
      <Markdown
        text={`## a\n
        ${code_str}
        `}
      />
    );

    screen.getAllByRole('button').forEach((e) => {
      fireEvent.click(e);
    });
    container.querySelectorAll('pre code').forEach((e) => {
      fireEvent.wheel(e);
    });
  });
});
