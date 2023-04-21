import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { injectGlobal } from '@emotion/css';
import { updateStyleRule } from '@moneko/common';
import { myPkgs, MyPkg, useLocation, Link } from '@moneko/core';
import { Avatar, colorScheme } from 'neko-ui';
import { projectInfo } from '@/utils';

injectGlobal`
  .site-sider,
  .site-sider-group-title,
  .site-sider-item,
  .site-sider-item::before {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  .site-left {
    position: sticky;
    inset-block-start: 0;
    overflow-y: scroll;
    max-block-size: 100vb;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .site-sider {
    position: sticky;
    inset-block-start: 0;
    display: flex;
    overflow-y: scroll;
    margin: 0 1rem 1rem;
    border-radius: var(--border-radius);
    inline-size: 15rem;
    min-inline-size: 15rem;
    flex: 1;
    max-block-size: calc(100% - 2rem);
    color: var(--text-color);
    background-color: var(--header-bg, rgb(255 255 255 / 90%));
    box-sizing: border-box;
    backdrop-filter: blur(1rem);
    transition-property: background-color, color;
    flex-direction: column;
  }

  .site-sider > ul {
    position: relative;
    margin: 0;
    padding: 0 1rem;
    list-style: none;
  }

  .site-sider-group {
    position: relative;

    &:last-of-type {
      margin-block-end: 1rem;
    }
  }

  .site-sider-group-title {
    position: sticky;
    inset-block-start: 0;
    z-index: 10;
    margin: 0 0 0.5rem;
    border-block-end: var(--border-base);
    padding: 0.5rem 0;
    font-size: var(--font-size);
    color: var(--text-heading);
    backdrop-filter: blur(1rem);
    line-height: 1.25rem;
    transition-property: background-color, color, border-color;
  }

  .site-sider-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0;
  }

  .site-sider-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    min-block-size: 2.8125rem;
    color: var(--text-color);
    flex-wrap: wrap;
    cursor: pointer;
    user-select: contain;

    &:active {
      transform: scale(0.95);
    }

    &::before {
      position: absolute;
      inset-inline-end: 0;
      display: block;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      inline-size: 0.3125rem;
      block-size: 100%;
      background-color: var(--primary-border, #5794ff);
      content: '';
      transition-property: background-color, transform;
      transform: scale(0);
    }

    &[data-active='false'] {
      transition-property: background-color, color, transform;
    }

    &[data-active='true'] {
      color: var(--primary-color, #5794ff);
      background-color: var(--primary-bg, #f0f8ff);
      text-shadow: 2px 2px 2px var(--primary-outline);
      transition-property: background-color, transform;
    }

    &[data-active='true']::before {
      transform: scale(1);
    }

    a {
      display: flex;
      flex-wrap: wrap;
      color: inherit;
    }
  }

  .site-sider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 2rem;
    block-size: 100%;
  }

  .site-sider-label {
    position: relative;
  }

  .site-sider-label,
  .site-sider-subtitle {
    overflow: hidden;
    inline-size: calc(100% - 2rem);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-sider-subtitle {
    margin-inline-start: 2rem;
    padding-block-end: 0.25rem;
    font-size: var(--font-size-sm);
    opacity: 0.67;
  }

  .site-header {
    position: sticky;
    inset-block-start: 0;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1em;
    min-block-size: 2.6875rem;
  }

  .site-logo {
    background-image: none;
    animation: none;
  }

  .site-title {
    display: flex;
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: var(--text-heading);
    flex: 1;
    flex-direction: column;
    line-height: 1;
    gap: 5px;

    i {
      font-size: x-small;
      font-weight: lighter;
      color: var(--text-secondary);
      font-style: normal;
    }
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
const kv = Object.fromEntries(myPkgs.map((item) => [item.key, item]));
const menuKeys = Object.keys(menuObj);
const Sider: React.FC = () => {
  const { scheme } = colorScheme;
  const menuEl = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();
  const activeKey = useMemo(() => pathname.substring(1), [pathname]);
  const current = useMemo(() => {
    window.scrollTo({
      top: 0,
    });
    return kv[activeKey] || projectInfo;
  }, [activeKey]);
  const renderMenu = useCallback(
    (list?: MyPkg[]) => {
      return list?.map((item) => {
        return (
          <li key={item.key} className="site-sider-item" data-active={activeKey === item.key}>
            <Link to={`/${item.key}`}>
              <span className="site-sider-icon">{item.icon}</span>
              <div className="site-sider-label">{item.title || item.path}</div>
              {item.subtitle && <div className="site-sider-subtitle">{item.subtitle}</div>}
            </Link>
          </li>
        );
      });
    },
    [activeKey]
  );

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') !== scheme) {
      document.documentElement.setAttribute('data-theme', scheme);
    }
    updateStyleRule(
      {
        'color-scheme': scheme,
      },
      ':root'
    );
  }, [scheme]);
  useEffect(() => {
    document.querySelector('.site-sider-item[data-active="true"] > a')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [current, scheme]);

  return (
    <section className="site-left">
      <header className="site-header">
        <Link to="/">
          <Avatar className="site-logo" />
        </Link>
        <h1 className="site-title">
          {projectInfo.title}
          <i>{current.subtitle}</i>
        </h1>
        <div
          className="site-theme-btn"
          onClick={() => {
            colorScheme.scheme = scheme === 'dark' ? 'light' : 'dark';
          }}
        />
      </header>
      <section className="site-sider">
        <ul ref={menuEl}>
          {menuKeys.map((key) => {
            return (
              <li key={key} className="site-sider-group">
                <p className="site-sider-group-title">{key}</p>
                <ul className="site-sider-list">{renderMenu(menuObj[key])}</ul>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Sider;
