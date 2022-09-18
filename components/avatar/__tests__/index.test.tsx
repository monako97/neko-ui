import React from 'react';
import Avatar from '../index';
import { render, screen } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */
test('测试 Avatar 默认', () => {
  render(<Avatar />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */
test('测试 Avatar 入参', () => {
  const avatarSrc = 'https://123.123.png';
  const avatarAlt = '头像';
  const { container } = render(
    <Avatar className="avatar-custom-cls" src={avatarSrc} alt={avatarAlt} />
  );

  expect(container.querySelector('.avatar-custom-cls')).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole(`img`).getAttribute('src')).toBe(avatarSrc);
  expect(screen.getByRole(`img`).getAttribute('alt')).toBe(avatarAlt);
});
