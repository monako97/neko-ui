import { render } from '@solidjs/testing-library';

test('spin', () => {
  const { container } = render(() => (
    <n-spin spin>
      <span>aaaa</span>
      <span>ss</span>
    </n-spin>
  ));

  expect(container).toBeInTheDocument();
});
test('not spin', () => {
  const { container } = render(() => (
    <n-spin>
      <span>aaaa</span>
    </n-spin>
  ));

  expect(container).toBeInTheDocument();
});
