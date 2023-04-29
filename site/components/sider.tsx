import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { updateStyleRule } from '@moneko/common';
import { myPkgs, MyPkg, useLocation, Link } from '@moneko/core';
import { Avatar, Tooltip, Typography, colorScheme, injectGlobal } from 'neko-ui';
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
    margin: 0 16px 16px;
    border-radius: var(--border-radius);
    inline-size: 240px;
    min-inline-size: 240px;
    flex: 1;
    max-block-size: calc(100% - 32px);
    color: var(--text-color);
    background-color: var(--component-bg, rgb(255 255 255 / 90%));
    box-sizing: border-box;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition-property: background-color, color;
    flex-direction: column;
  }

  .site-sider > ul {
    position: relative;
    margin: 0;
    padding: 0 16px;
    list-style: none;
  }

  .site-sider-group {
    position: relative;

    &:last-of-type {
      margin-block-end: 16px;
    }
  }

  .site-sider-group-title {
    position: sticky;
    inset-block-start: 0;
    z-index: 10;
    margin: 0 0 8px;
    border-block-end: var(--border-base);
    padding: 8px 0;
    font-size: var(--font-size);
    color: var(--text-heading);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    line-height: 20px;
    transition-property: background-color, color, border-color;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .site-sider-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
  }

  .site-sider-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    min-block-size: 45px;
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
      inline-size: 5px;
      block-size: 100%;
      background-color: var(--primary-hover);
      content: '';
      transition-property: background-color, transform;
      transform: scale(0);
    }

    &[data-active='false'] {
      transition-property: background-color, color, transform;
    }

    &[data-active='true'] {
      color: var(--on-primary-selection);
      background-color: var(--primary-selection);
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
      width: 100%;
    }
  }

  .site-sider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 32px;
    block-size: 100%;
    user-select: none;
  }

  .site-sider-label {
    position: relative;
  }

  .site-sider-label,
  .site-sider-subtitle {
    overflow: hidden;
    inline-size: calc(100% - 32px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-sider-subtitle {
    margin-inline-start: 32px;
    padding-block-end: 4px;
    font-size: var(--font-size-sm);
    opacity: 0.67;
  }

  .site-header {
    position: sticky;
    inset-block-start: 0;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    gap: 1em;
    min-block-size: 43px;
    max-width: 224px;
  }

  .site-logo {
    background-image: none;
    animation: none;
  }

  .site-title {
    display: flex;
    flex: 1;
    flex-direction: column;
    line-height: 1.1;
    gap: 5px;
    h1 {
      margin: 0;
      font-size: 1.5em;
      font-weight: bold;
      color: var(--text-heading);
    }
    i {
      font-size: x-small;
      font-weight: lighter;
      color: var(--text-color);
      font-style: normal;
    }
  }

  .site-theme-btn {
    font-size: 24px;
    transition: transform var(--transition-duration) var(--transition-timing-function);
    line-height: 32px;
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
  .site-tooltip {
    .site-sider-label,
    .site-sider-subtitle {
      inline-size: 100%;
    }
    .site-sider-subtitle {
      margin-inline-start: 0;
    }
  }
  @media screen and (max-width: 1100px) {
    .site-sider {
      min-inline-size: 68px;
      inline-size: 68px;
      >ul {
        padding: 0 8px;
      }
    }
    .site-header {
      justify-content: center;
    }
    .site-sider-group-title {
      text-align: center;
    }
    .site-sider-item {
      cursor: pointer;
      a {
        display: flex;
        width: 100%;
        height: 48px;
        justify-content: center;
        align-items: center;
      }
      &::before {
        content: none;
      }
    }
    .site-sider-item .site-sider-label,
    .site-sider-item .site-sider-subtitle,
    .site-title,
    .site-theme-btn {
      display: none;
    }
  }
`;

const Sider: React.FC = () => {
  const { scheme } = colorScheme;
  const menuEl = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();
  const { kv, menuKeys, menuObj } = useMemo(() => {
    const obj: Record<string, MyPkg[]> = {};
    const extractMenu = (list: MyPkg[]) => {
      return list?.map((item) => {
        const type = item?.type || 'default';
        const prev = obj[type] || [];

        Object.assign(obj, {
          [type]: prev.concat({
            ...item,
            type,
          }),
        });
      });
    };

    extractMenu(myPkgs);

    return {
      kv: Object.fromEntries(myPkgs.map((item) => [item.key, item])),
      menuKeys: Object.keys(obj),
      menuObj: obj,
    };
  }, []);
  const activeKey = useMemo(() => pathname.substring(1), [pathname]);
  const current = useMemo(() => {
    window.scrollTo({
      top: 0,
    });
    return kv[activeKey] || projectInfo;
  }, [activeKey, kv]);
  const renderMenu = useCallback(
    (list?: MyPkg[]) => {
      return list?.map((item) => {
        const row = (
          <>
            <div className="site-sider-label">{item.title || item.path}</div>
            {item.subtitle && <div className="site-sider-subtitle">{item.subtitle}</div>}
          </>
        );

        return (
          <li key={item.key} className="site-sider-item" data-active={activeKey === item.key}>
            <Link to={`/${item.key}`}>
              <Tooltip trigger="hover" title={<div className="site-tooltip">{row}</div>}>
                <span className="site-sider-icon">{item.icon}</span>
              </Tooltip>
              {row}
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
  }, [current]);

  return (
    <section className="site-left">
      <header className="site-header">
        <Link to="/">
          <Avatar className="site-logo" />
        </Link>
        <div className="site-title">
          <Typography tag="h1" truncated>
            {projectInfo.title}
          </Typography>
          <Typography tag="i" type="secondary" truncated>
            {current.subtitle}
          </Typography>
        </div>
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
