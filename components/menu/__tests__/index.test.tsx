import { fireEvent, render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Menu', () => {
  it('basic', () => {
    render(() => (
      <n-menu
        value="C"
        items={['A', 'B', { value: 'C', disabled: true }, 'D']}
        open-keys={['一级菜单']}
      />
    ));

    fireEvent.click(screen.getByShadowText('B'));
    fireEvent.click(screen.getByShadowText('C'));
  });
  it('toggle', () => {
    render(() => (
      <n-menu
        default-value={false as unknown as string}
        toggle={true}
        items={['A', 'B', 'C', 'D']}
      />
    ));

    fireEvent.click(screen.getByShadowText('B'));
    fireEvent.click(screen.getByShadowText('B'));
  });
  it('field-names', () => {
    render(() => (
      <n-menu
        items={[
          {
            label: '一级菜单',
            icon: '❤️',
            children: [
              {
                label: '动物',
                options: [
                  { label: '狮子2', value: '狮子', icon: '🦁', suffix: 'option' },
                  { label: '大青蛙', value: '大青蛙', icon: '🐸', suffix: 'option' },
                ],
              },
              {
                label: '动物2',
                options: [
                  { label: '狮子', value: '狮子2', icon: '🦁', suffix: 'option' },
                  { label: '大青蛙2', value: '大青蛙2', icon: '🐸', suffix: 'option' },
                ],
              },
            ],
          },
          {
            label: '二级菜单',
            icon: '👂',
            suffix: 'two',
            children: [
              {
                label: '动物3',
                options: [
                  { label: '狮子', value: '狮子3', suffix: 'option' },
                  { label: '大青蛙', value: '大青蛙3' },
                ],
              },
              {
                label: '动物4',
                options: [
                  { label: '狮子', value: '狮子4' },
                  { label: '大青蛙', value: '大青蛙4', suffix: 'option' },
                ],
              },
            ],
          },
        ]}
        multiple={true}
      />
    ));

    fireEvent.click(screen.getByShadowText('一级菜单'));
    fireEvent.click(screen.getByShadowText('大青蛙2'));
    fireEvent.click(screen.getByShadowText('狮子2'));
    fireEvent.click(screen.getByShadowText('大青蛙2'));
    fireEvent.click(screen.getByShadowText('一级菜单'));
    fireEvent.animationEnd(
      screen
        .getByShadowText('一级菜单')
        .parentElement!.parentElement!.querySelector('.sub-menu-children')!,
    );
  });
});
