import React, { useCallback, useEffect, useState } from 'react';
import { myPkgs, RouterProps, useLocation, useNavigate } from '@moneko/core';
import styles from './index.less';
import { isEqual } from 'lodash';
import { projectInfo } from '@/utils';
import { Avatar } from 'neko-ui';

type MenuType = {
  subtitle?: string;
  key: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
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
  const navigate = useNavigate();
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string>();
  const handleMenu = useCallback(
    (item: RouterProps) => {
      const isSubMenu = Array.isArray(item.children);

      if (!isSubMenu) {
        navigate(item.key);
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
          <React.Fragment key={item.key}>
            <div
              className={[styles.item, activeKey === item.key && styles.active].join(' ')}
              onClick={() => handleMenu(item)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <div className={styles.con}>{item.title || item.path}</div>
              {item.subtitle && <div className={styles.subTitle}>{item.subtitle}</div>}
            </div>
          </React.Fragment>
        );
      });
    },
    [activeKey, handleMenu]
  );

  useEffect(() => {
    setActiveKey(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <Avatar className={styles.logoImg} onClick={() => navigate('/')} />
        <div className={styles.logoCon}>
          <h2>{projectInfo.title}</h2>
          <p>{projectInfo.description}</p>
        </div>
      </div>
      <div className={styles.sider}>
        {Object.keys(menuObj).map((key) => {
          return (
            <React.Fragment key={key}>
              <div className={styles.title}>{key}</div>
              <div className={styles.menu}>{renderMenu(menuObj[key])}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Sider, isEqual);
