import { fireEvent, render } from '@solidjs/testing-library';

describe('Md', () => {
  it('basic', () => {
    const { container, getByTestId } = render(() => (
      <>
        <n-md>
          {`#### 第一种方式

!> 直接在写在标签内`}
        </n-md>
        <n-md>
          <h1>h1</h1>
          <h2>h2</h2>
        </n-md>
        <n-md
          data-testid="md"
          text={`[TOC]
## 第二种方式
\n\n\n\n\n\n\n\n\n
\n\n\n\n\n\n\n\n\n
\n\n\n\n\n\n\n\n\n
\n\n\n\n\n\n\n\n\n
#### 第二种方式
\n\n\n\n\n\n\n\n\n
\n\n\n\n\n\n\n\n\n
\n\n\n\n\n\n\n\n\n
!> 写在 text 属性上

![图片](c7.jpg)

$inline katex$

$$
block katex
$$

\`\`\`js
var a = 1;
\`\`\`
`}
        />
      </>
    ));

    expect(container).toBeInTheDocument();

    fireEvent.scroll(window);
    getByTestId('md')
      .shadowRoot!.querySelectorAll('a')
      .forEach((e) => {
        fireEvent.click(e);
      });
  });
});
