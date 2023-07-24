import { render } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Avatar', () => {
  const avatarSrc = 'https://123.123.png/';
  const avatarAlt = '头像';

  Object.defineProperty(document.body, 'insertBefore', {
    writable: true,
    value: jest.fn(),
  });
  it('basic', () => {
    render(() => <n-avatar />);
  });

  it('src', () => {
    const { findByTestId, findByAltText } = render(() => (
      <n-avatar data-testid="avatar" class="avatar-custom-cls" src={avatarSrc} alt={avatarAlt} />
    ));

    findByTestId('avatar').then((e) => {
      expect(e).toBeInTheDocument();
    });
    findByAltText<HTMLImageElement>(avatarAlt).then((e) => {
      expect(e.src).toBe(avatarSrc);
      expect(e.alt).toBe(avatarAlt);
    });
  });
  it('Avatar size number', () => {
    const { findByTestId } = render(() => (
      <n-avatar data-testid="avatar-size" size={16} src={avatarSrc} alt={avatarAlt} />
    ));

    findByTestId('avatar-size').then((e) => {
      expect(
        e.shadowRoot
          ?.querySelector('style')
          ?.innerHTML.endsWith('.avatar{inline-size:1rem;block-size:1rem;}'),
      ).toBe(true);
    });
  });
  it('Avatar size type', () => {
    const { findByTestId } = render(() => (
      <n-avatar data-testid="avatar-size-type" size="large" src={avatarSrc} alt={avatarAlt} />
    ));

    findByTestId('avatar-size-type').then((e) => {
      expect(
        e.shadowRoot
          ?.querySelector('style')
          ?.innerHTML.endsWith('.avatar{inline-size:2.5rem;block-size:2.5rem;}'),
      ).toBe(true);
    });
  });
  it('Avatar color', () => {
    const { findByTestId } = render(() => (
      <n-avatar data-testid="avatar-color" color="red" src={avatarSrc} alt={avatarAlt} />
    ));

    findByTestId('avatar-color').then((e) => {
      expect(
        e.shadowRoot
          ?.querySelector('style')
          ?.innerHTML.endsWith('.avatar{--avatar-color:red;inline-size:2rem;block-size:2rem;}'),
      ).toBe(true);
    });
  });
  it('scale username', () => {
    render(() => (
      <n-avatar
        data-testid="avatar-username"
        size="small"
        username="usernameusernameusernameusername"
      />
    ));

    screen.findByShadowText('usernameusernameusernameusername').then((e) => {
      expect(e).toBeInTheDocument();
    });
  });
  it('group', () => {
    render(() => (
      <n-avatar-group
        data={[
          {
            src: avatarSrc,
          },
        ]}
      />
    ));
    const { findByTestId } = render(() => (
      <n-avatar-group
        data-testid="avatar-group"
        data={Array(20)
          .fill(0)
          .map((_, i) => {
            if (i % 2) {
              return {
                src: avatarSrc,
              };
            }
            return {
              username: ['avatar', 'gw', 'bjec', '#zos'][i % 3],
              color: ['#cabdeb', 'green', '#e9887c', '#e989ua'][i % 3],
            };
          })}
        max-count={2}
      />
    ));

    findByTestId('avatar-group').then((e) => {
      expect(e).toBeInTheDocument();
    });
  });
});
