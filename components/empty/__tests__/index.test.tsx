import { render } from '@solidjs/testing-library';

test('empty', () => {
  const { container } = render(() => (
    <n-empty
      class="empty"
      css={`
        color: red;
      `}
      label="无数据"
    />
  ));

  expect(container).toBeInTheDocument();
});
