import React, {
  type ReactNode,
  Fragment,
  memo,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import { myPkgs, type RouterProps, useLocation, useNavigate } from '@moneko/core';
import { classNames } from '@moneko/common';

type MenuType = {
  subtitle?: string;
  key: string;
  title: string;
  path: string;
  icon?: ReactNode;
  children: MenuType[];
};

const menuObj: Record<string, MenuType[]> = {};

const extractMenu = (list: RouterProps[]) => {
  return list?.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const md = require('@pkg/' + item.key + '/README.mdx');
    const type = md.basic.type || 'default';
    const prev = menuObj[type] || [];

    Object.assign(menuObj, {
      [type]: prev.concat({
        ...md.basic,
        path: item.path,
        key: item.key,
      }),
    });
    Object.assign(item, {
      ...md.basic,
    });
  });
};

extractMenu(myPkgs);

const Sider = () => {
  const menuEl = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string[]>([]);

  const activeKey = useMemo(() => location.pathname.substring(1), [location]);

  const handleMenu = useCallback(
    (item: MenuType) => {
      const isSubMenu = Array.isArray(item.children);

      if (!isSubMenu) {
        navigate('/' + item.key);
      } else {
        const _openKey = [...openKey];
        const idx = _openKey.indexOf(item.key);

        if (idx === -1) {
          setOpenKey(_openKey.concat(item.key));
        } else {
          _openKey.splice(idx, 1);
          setOpenKey(_openKey);
        }
      }
    },
    [navigate, openKey]
  );
  const renderMenu = useCallback(
    (list?: MenuType[]) => {
      return list?.map((item) => {
        return (
          <Fragment key={item.key}>
            <div
              className={classNames(
                'n-min-h-[2.8125rem] n-rounded n-relative n-flex n-flex-wrap n-items-center n-cursor-pointer n-mb-2 before:n-content-[""] before:n-transition-bg-transform before:n-rounded-r before:n-w-1 before:n-h-full before:n-bg-[var(--primary-color)] before:n-absolute before:n-right-0 hover:n-text-[var(--primary-color)] hover:n-bg-[var(--primary-color-deprecated-bg)] before:n-scale-0',
                activeKey === item.key &&
                  'before:n-scale-[1!important] n-bg-[var(--primary-color-deprecated-bg)] n-text-[var(--primary-color)]'
              )}
              onClick={() => handleMenu(item)}
            >
              <span className="n-flex n-items-center n-justify-center n-w-8 n-h-full">
                {item.icon}
              </span>
              <div className="n-relative n-w-[calc(100%-2rem)] n-truncate">
                {item.title || item.path}
              </div>
              {item.subtitle && (
                <div className="n-w-[calc(100%-2rem)] n-truncate n-opacity-70 n-ml-8 n-text-xs n-pb-1">
                  {item.subtitle}
                </div>
              )}
            </div>
          </Fragment>
        );
      });
    },
    [activeKey, handleMenu]
  );

  return (
    <div className="n-bg-[var(--header-bg,rgba(255,255,255,0.8))] n-backdrop-blur-lg n-text-[var(--text-color)] n-transition-bg-c n-flex n-flex-col n-overflow-y-scroll n-box-border n-w-60 n-min-w-[15rem] n-m-4 n-mt-24 n-rounded n-z-30 n-shadow-small">
      <div ref={menuEl} className="n-py-0 n-px-4 n-relative ">
        {Object.keys(menuObj).map((key) => {
          return (
            <div key={key} className="n-relative">
              <div
                className={
                  'n-sticky n-top-0 n-z-10  n-backdrop-blur-lg n-text-sm n-pb-2 n-text-[var(--heading-color)] n-transition-bg-c after:n-h-[0.0625rem] after:n-mt-2 after:n-mb-0 after:n-mx-0 after:n-bg-[var(--border-color-base)] after:n-transition-bg after:n-block after:n-content-[""] before:n-content-[""] before:n-sticky before:n-top-2 n-h-6 n-pt-2'
                }
              >
                {key}
              </div>
              <div className="n-mb-2">{renderMenu(menuObj[key])}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Sider, () => true);
