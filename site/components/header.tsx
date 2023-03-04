import React, { useMemo, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { myPkgs, useLocation, useNavigate } from '@moneko/core';
import { Avatar, useTheme } from 'neko-ui';
import { projectInfo, type PkgType } from '@/utils';

const headerCss = css`
  .site-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    height: 4.375rem;
    background-color: var(--header-bg, rgb(255 255 255 / 90%));
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: box-shadow, background-color, border-color;
    backdrop-filter: blur(1rem);
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 2%);
  }

  .site-logo {
    display: flex;
    padding: 1rem 1.5rem;
    cursor: pointer;
    min-width: 14rem;
  }

  .site-favicon {
    width: 2rem;
    height: 2rem;
  }

  .site-title {
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 1rem;
  }

  .site-title h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    text-shadow: 0.125rem 0.125rem 0.125rem var(--text-shadow-color);
  }

  .site-header-center {
    display: inline-flex;
    gap: 1rem;
    flex: 1;
    align-items: flex-end;
  }

  .site-header-center h2 {
    margin: 0;
  }

  .site-header-center span {
    opacity: 0.67;
  }

  .site-theme-btn {
    padding: 0 1.5rem;
    font-size: 1.5rem;
    transition: transform var(--transition-duration) var(--transition-timing-function);
    line-height: 2rem;
    cursor: pointer;
    user-select: none;
  }

  .site-theme-btn::before {
    font-family: neko-icon, sans-serif;
    color: #fc0;
    content: '\\e645';
  }

  .site-theme-btn[data-theme='dark']::before {
    content: '\\e647';
    color: #fff;
  }

  .site-theme-btn:active {
    transform: scale(0.95);
  }
`;

injectGlobal([headerCss]);
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, changeTheme] = useTheme();

  const current: PkgType = useMemo(
    () =>
      (myPkgs.find((item) => item.key === location.pathname.substring(1)) as unknown as PkgType) ||
      projectInfo,
    [location.pathname]
  );

  return (
    <header className="site-header">
      <div className="site-logo" onClick={() => navigate('/')}>
        <Avatar className="site-favicon" />
        <div className="site-title">
          <h2>{projectInfo.title}</h2>
        </div>
      </div>
      <div className="site-header-center">
        <h2>{current?.title}</h2>
        <span>{current?.subtitle}</span>
      </div>
      <div
        className="site-theme-btn"
        data-theme={theme}
        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </header>
  );
};

export default memo(Header, () => true);
