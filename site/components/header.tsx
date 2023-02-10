import { useMemo, memo } from 'react';
import { myPkgs, useLocation, useNavigate } from '@moneko/core';
import { Avatar, useTheme } from 'neko-ui';
import { projectInfo, type PkgType } from '@/utils';

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
    <header className="n-flex n-items-center n-fixed n-top-0 n-right-0 n-left-0 n-h-20 n-z-20 n-transition-s-bg-b n-bg-[var(--header-bg,rgba(255,255,255,0.9))] n-backdrop-blur-lg">
      <div
        className="n-flex n-p-4 n-px-6 n-cursor-pointer n-min-w-[14rem]"
        onClick={() => navigate('/')}
      >
        <Avatar className="n-w-8 n-h-8" />
        <div className="n-flex n-flex-1 n-items-center n-ml-4">
          <h2 className="n-font-normal n-text-shadow n-mb-0 n-mt-0">{projectInfo.title}</h2>
        </div>
      </div>
      <div className=" n-inline-flex n-gap-4 n-flex-1 n-items-end">
        <h2 className="n-m-0">{current?.title}</h2>
        <span className="n-opacity-70">{current?.subtitle}</span>
      </div>
      <div
        className="n-text-2xl n-py-1 n-px-6 n-cursor-pointer n-select-none"
        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌒' : '🌞'}
      </div>
    </header>
  );
};

export default memo(Header, () => true);
