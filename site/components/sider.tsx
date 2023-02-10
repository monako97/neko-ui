import { memo, useCallback, useMemo, useState, useRef } from 'react';
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
        const activeCls =
          'n-transition-bg before:n-scale-100 n-bg-primaryDeprecatedBg n-text-primary';

        return (
          <a
            key={item.key}
            href={window.location.origin + window.location.pathname + '#/' + item.key}
            className={`n-text-color n-min-h-[2.8125rem] n-rounded n-relative n-flex n-flex-wrap n-items-center n-cursor-pointer n-mb-2 before-content-empty before:n-transition-bg-transform before:n-rounded-r before:n-w-1 before:n-h-full before:n-bg-primary before:n-absolute before:n-right-0 hover:n-text-primary before:n-scale-0 ${
              activeKey === item.key ? activeCls : 'n-transition-bg-c'
            }`}
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
          </a>
        );
      });
    },
    [activeKey, handleMenu]
  );

  return (
    <div className="n-sticky n-top-0 n-bg-header n-backdrop-blur n-text-color n-transition-bg-c n-flex n-flex-col n-overflow-y-scroll n-box-border n-w-60 n-min-w-[15rem] n-m-4 n-mt-0 n-rounded n-z-30">
      <div ref={menuEl} className="n-py-0 n-px-4 n-relative ">
        {Object.keys(menuObj).map((key) => {
          return (
            <div key={key} className="n-relative">
              <div className="n-sticky n-top-0 n-z-10 n-backdrop-blur n-text-sm n-pb-2 n-text-heading n-transition-bg-c after:n-h-[0.0625rem] after:n-mt-2 after:n-mb-0 after:n-mx-0 after:n-bg-borderColor after:n-transition-bg after-content-empty before-content-empty before:n-sticky before:n-top-2 n-h-6 n-pt-2">
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
