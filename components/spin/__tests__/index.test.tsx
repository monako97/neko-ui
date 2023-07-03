/**
 * @jest-environment jsdom
 */
test('测试 Loading', () => {
  const { container } = render(
    <n-spin spin>
      <span>aaaa</span>
      <span>ss</span>
    </n-spin>
  );

  expect(container).toBeInTheDocument();
});
