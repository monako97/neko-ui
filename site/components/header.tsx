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
    height: 80px;
    background-color: var(--header-bg, rgb(255 255 255 / 90%));
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 5%);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: box-shadow, background-color, border-color;
    backdrop-filter: blur(16px);
  }

  .site-logo {
    display: flex;
    padding: 16px 24px;
    cursor: pointer;
    min-width: 224px;
  }

  .site-favicon {
    width: 32px;
    height: 32px;
  }

  .site-title {
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 16px;
  }

  .site-title h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    text-shadow: 2px 2px 2px var(--text-shadow-color);
  }

  .site-header-center {
    display: inline-flex;
    gap: 16px;
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
    padding: 4px 24px;
    font-size: 24px;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
    transition: transform var(--transition-duration) var(--transition-timing-function);
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
        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌒' : '🌞'}
      </div>
    </header>
  );
};

export default memo(Header, () => true);
