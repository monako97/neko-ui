import React, { memo, useCallback, useMemo, useState, useRef } from 'react';
import { css, injectGlobal } from '@emotion/css';
import { myPkgs, MyPkg, useLocation, useNavigate } from '@moneko/core';

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
    top: 0;
    z-index: 30;
    display: flex;
    overflow-y: scroll;
    margin: 0 16px 16px;
    border-radius: var(--border-radius-base, 4px);
    width: 240px;
    min-width: 240px;
    color: var(--text-color, rgb(0 0 0 / 65%));
    background-color: var(--header-bg, rgb(255 255 255 / 80%));
    box-sizing: border-box;
    backdrop-filter: blur(16px);
    transition-property: background-color, color;
    flex-direction: column;
  }

  .site-sider > div {
    position: relative;
    padding: 0 16px;
  }

  .site-sider-group {
    position: relative;
  }

  .site-sider-group:last-of-type {
    margin-bottom: 16px;
  }

  .site-sider-group-title {
    position: sticky;
    top: 0;
    z-index: 10;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--border-color-base, #d9d9d9);
    padding: 8px 0;
    font-size: 14px;
    color: var(--heading-color, rgb(255 255 255 / 85%));
    backdrop-filter: blur(16px);
    line-height: 20px;
    transition-property: background-color, color, border-color;
  }

  .site-sider-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .site-sider-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-base, 4px);
    min-height: 45px;
    color: var(--text-color, rgb(0 0 0 / 65%));
    flex-wrap: wrap;
    cursor: pointer;
    user-select: contain;
  }

  .site-sider-item:active {
    transform: scale(0.95);
  }

  .site-sider-item::before {
    position: absolute;
    right: 0;
    display: block;
    border-radius: 0 var(--border-radius-base, 4px) var(--border-radius-base, 4px) 0;
    width: 5px;
    height: 100%;
    background-color: var(--primary-color-border, #5794ff);
    content: '';
    transition-property: background-color, transform;
    transform: scale(0);
  }

  .site-sider-item[data-active='false'] {
    transition-property: background-color, color, transform;
  }

  .site-sider-item[data-active='true'] {
    color: var(--primary-color, #5794ff);
    background-color: var(--primary-color-bg, #f0f8ff);
    transition-property: background-color, transform;
  }

  .site-sider-item[data-active='true']::before {
    transform: scale(1);
  }

  .site-sider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 100%;
  }

  .site-sider-label {
    position: relative;
  }

  .site-sider-label,
  .site-sider-subtitle {
    overflow: hidden;
    width: calc(100% - 32px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-sider-subtitle {
    margin-left: 32px;
    padding-bottom: 4px;
    font-size: 12px;
    opacity: 0.67;
  }
`;

injectGlobal([siderCss]);
const Sider = () => {
  const menuEl = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string[]>([]);
  const activeKey = useMemo(() => location.pathname.substring(1), [location]);
  const handleMenu = useCallback(
    (item: MyPkg) => {
      if (Array.isArray(item.children)) {
        const _openKey = [...openKey];
        const idx = _openKey.indexOf(item.key);

        if (idx === -1) {
          setOpenKey(_openKey.concat(item.key));
        } else {
          _openKey.splice(idx, 1);
          setOpenKey(_openKey);
        }
      } else {
        navigate('/' + item.key);
      }
    },
    [navigate, openKey]
  );
  const renderMenu = useCallback(
    (list?: MyPkg[]) => {
      return list?.map((item) => {
        return (
          <a
            key={item.key}
            href={window.location.origin + window.location.pathname + '#/' + item.key}
            className="site-sider-item"
            data-active={activeKey === item.key}
            onClick={() => handleMenu(item)}
          >
            <span className="site-sider-icon">{item.icon}</span>
            <div className="site-sider-label">{item.title || item.path}</div>
            {item.subtitle && <div className="site-sider-subtitle">{item.subtitle}</div>}
          </a>
        );
      });
    },
    [activeKey, handleMenu]
  );

  return (
    <div className="site-sider">
      <div ref={menuEl}>
        {Object.keys(menuObj).map((key) => {
          return (
            <div key={key} className="site-sider-group">
              <div className="site-sider-group-title">{key}</div>
              <div className="site-sider-list">{renderMenu(menuObj[key])}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Sider, () => true);
