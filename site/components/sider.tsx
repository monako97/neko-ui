import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { updateStyleRule } from '@moneko/common';
import { myPkgs, MyPkg, useLocation, Link } from '@moneko/core';
import { Avatar, colorScheme } from 'neko-ui';
import { projectInfo } from '@/utils';

const menuObj: Record<string, MyPkg[]> = {};
const extractMenu = (list: MyPkg[]) => {
  return list?.map((item) => {
    const type = item?.type || 'default';
    const prev = menuObj[type] || [];

    Object.assign(menuObj, {
      [type]: prev.concat({
        ...item,
        type,
      }),
    });
  });
};

extractMenu(myPkgs);
const menuKeys = Object.keys(menuObj);
const siderCss = css`
  .site-sider,
  .site-sider-group-title,
  .site-sider-item,
  .site-sider-item::before {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  .site-sider {
    position: sticky;
    top: 4.375rem;
    display: flex;
    overflow-y: scroll;
    margin: 0 1rem 1rem;
    border-radius: var(--border-radius, 8px);
    width: 15rem;
    min-width: 15rem;
    max-height: calc(100vh - 6rem);
    color: var(--text-color, rgb(0 0 0 / 65%));
    background-color: var(--header-bg, rgb(255 255 255 / 90%));
    box-sizing: border-box;
    backdrop-filter: blur(1rem);
    transition-property: background-color, color;
    flex-direction: column;
  }

  .site-sider > div {
    position: relative;
    padding: 0 1rem;
  }

  .site-sider-group {
    position: relative;

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }

  .site-sider-group-title {
    position: sticky;
    top: 0;
    z-index: 10;
    margin-bottom: 0.5rem;
    border-bottom: var(--border-base);
    padding: 0.5rem 0;
    font-size: var(--font-size, 14px);
    color: var(--text-heading, #1b1b1b);
    backdrop-filter: blur(1rem);
    line-height: 1.25rem;
    transition-property: background-color, color, border-color;
  }

  .site-sider-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .site-sider-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius, 8px);
    min-height: 2.8125rem;
    color: var(--text-color, rgb(0 0 0 / 65%));
    flex-wrap: wrap;
    cursor: pointer;
    user-select: contain;

    &:active {
      transform: scale(0.95);
    }

    &::before {
      position: absolute;
      right: 0;
      display: block;
      border-radius: 0 var(--border-radius, 8px) var(--border-radius, 8px) 0;
      width: 0.3125rem;
      height: 100%;
      background-color: var(--primary-color-border, #5794ff);
      content: '';
      transition-property: background-color, transform;
      transform: scale(0);
    }

    &[data-active='false'] {
      transition-property: background-color, color, transform;
    }

    &[data-active='true'] {
      color: var(--primary-color, #5794ff);
      background-color: var(--primary-color-bg, #f0f8ff);
      transition-property: background-color, transform;
    }

    &[data-active='true']::before {
      transform: scale(1);
    }
  }

  .site-sider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 100%;
  }

  .site-sider-label {
    position: relative;
  }

  .site-sider-label,
  .site-sider-subtitle {
    overflow: hidden;
    width: calc(100% - 2rem);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-sider-subtitle {
    margin-left: 2rem;
    padding-bottom: 0.25rem;
    font-size: var(--font-size-sm, 12px);
    opacity: 0.67;
  }

  .site-header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1em;
  }

  .site-title {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: var(--text-heading);
    gap: inherit;
    flex: 1;
  }

  .site-theme-btn {
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

  [data-theme='dark'] .site-theme-btn::before {
    content: '\\e647';
    color: #fff;
  }

  .site-theme-btn:active {
    transform: scale(0.95);
  }
`;

injectGlobal([siderCss]);
const Sider = () => {
  const { schema } = colorScheme;
  const menuEl = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const activeKey = useMemo(() => location.pathname.substring(1), [location]);

  const renderMenu = useCallback(
    (list?: MyPkg[]) => {
      return list?.map((item) => {
        return (
          <Link
            key={item.key}
            to={`/${item.key}`}
            className="site-sider-item"
            data-active={activeKey === item.key}
          >
            <span className="site-sider-icon">{item.icon}</span>
            <div className="site-sider-label">{item.title || item.path}</div>
            {item.subtitle && <div className="site-sider-subtitle">{item.subtitle}</div>}
          </Link>
        );
      });
    },
    [activeKey]
  );

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') !== schema) {
      document.documentElement.setAttribute('data-theme', schema);
    }
    updateStyleRule(
      {
        'color-scheme': schema,
      },
      ':root'
    );
  }, [schema]);

  return (
    <div>
      <div className="site-header">
        <Link className="site-title" to="/">
          <Avatar />
          {projectInfo.title}
        </Link>
        <div
          className="site-theme-btn"
          onClick={() => {
            colorScheme.schema = schema === 'dark' ? 'light' : 'dark';
          }}
        />
      </div>
      <div className="site-sider">
        <div ref={menuEl}>
          {menuKeys.map((key) => {
            return (
              <div key={key} className="site-sider-group">
                <div className="site-sider-group-title">{key}</div>
                <div className="site-sider-list">{renderMenu(menuObj[key])}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Sider, () => true);
