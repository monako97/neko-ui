import React from 'react';
import { Avatar } from 'neko-ui';
import { render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
describe('Avatar', () => {
  const avatarSrc = 'https://123.123.png/';
  const avatarAlt = '头像';

  Object.defineProperty(document.body, 'insertBefore', {
    writable: true,
    value: jest.fn(),
  });
  it('测试 Avatar 默认', () => {
    render(<Avatar username="csacsacsasc" />);
    expect(screen.getByText('csacsacsasc')).toBeInTheDocument();
    render(<Avatar />);
  });

  it('测试 Avatar 入参', () => {
    render(
      <Avatar data-testid="avatar" className="avatar-custom-cls" src={avatarSrc} alt={avatarAlt} />
    );

    screen.findByTestId('avatar').then((e) => {
      expect(e).toBeInTheDocument();
    });
    screen.findByAltText<HTMLImageElement>(avatarAlt).then((e) => {
      expect(e.src).toBe(avatarSrc);
      expect(e.alt).toBe(avatarAlt);
    });
  });
  it('Avatar size', () => {
    render(<Avatar data-testid="avatar-size" size={16} src={avatarSrc} alt={avatarAlt} />);

    screen.findByTestId('avatar-size').then((e) => {
      expect(e).toBeInTheDocument();
      expect(e.style.width).toBe('16px');
      expect(e.style.height).toBe('16px');
    });
    render(<Avatar data-testid="avatar-size-type" size="large" src={avatarSrc} alt={avatarAlt} />);

    screen.findByTestId('avatar-size-type').then((e) => {
      expect(e).toBeInTheDocument();
      expect(e.style.width).toBe('40px');
      expect(e.style.height).toBe('40px');
    });
  });
  it('Avatar color', () => {
    render(<Avatar data-testid="avatar-color" color="red" src={avatarSrc} alt={avatarAlt} />);

    screen.findByTestId('avatar-color').then((e) => {
      expect(e).toBeInTheDocument();
      expect(e.style.getPropertyValue('--avatar-color')).toBe('red');
    });
  });
});
