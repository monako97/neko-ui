import React, { FC, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import getBrowser from 'neko-ui/utils/broswer';
import { projectInfo } from '@/utils';

const siteEmptyCss = css`
  .site-empty {
    min-height: calc(100vh - 14.75rem);
  }

  .site-empty > span {
    margin-left: 1rem;
  }

  .site-empty-top {
    display: flex;
    gap: 24px;
  }

  .site-empty-info {
    flex: 1;
  }

  .site-empty-thank {
    width: 180px;

    h2::before,
    a::after {
      content: none;
    }

    h2 {
      border: none;
    }
  }

  .site-empty-colors {
    display: flex;
    gap: 0.75rem;
  }

  .site-empty-color {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.3125rem;
  }

  .site-empty-color-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius, 8px);
    padding: 0.5rem 0.75rem;
    color: #fff;
    cursor: pointer;
  }

  .site-empty-color-item i {
    color: var(--text-color, rgb(0 0 0 / 65%));
    transition: opacity var(--transition-duration) var(--transition-timing-function);
  }

  .site-empty-color-item i:last-of-type {
    font-size: var(--font-size-xs, 10px);
    opacity: 0.8;
  }
`;

injectGlobal([siteEmptyCss]);
const broswer = getBrowser();
const infos: [string, string?][] = [
  ['描述', projectInfo.description],
  ['版本', projectInfo.version],
  ['作者', projectInfo.author as string],
  ['浏览器', `${broswer.name} ${broswer.version}`],
];
const colors = ['primary', 'warning', 'error', 'success'];
const types = ['color-bg', 'color-outline', 'color-border', 'color-hover', 'color', 'color-active'];

const Empty: FC = () => {
  return (
    <div className="n-md-body site-empty">
      <div className="site-empty-top">
        <div className="site-empty-info">
          {infos.map((e, i) => {
            return (
              typeof e[1] === 'string' && (
                <p key={i}>
                  <strong>{e[0]}: </strong>
                  <span>{e[1]}</span>
                </p>
              )
            );
          })}
        </div>
        <div className="site-empty-thank">
          <h2>感谢</h2>
          <a
            href="https://www.jetbrains.com/?from=monako"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg"
              alt="jetbrains"
            />
          </a>
        </div>
      </div>
      <h4>主题色</h4>
      <div className="site-empty-colors">
        {colors.map((c) => {
          return (
            <div key={c} className="site-empty-color">
              {types.map((t) => {
                return (
                  <div
                    key={t}
                    className="site-empty-color-item"
                    style={{
                      backgroundColor: `var(--${c}-${t})`,
                    }}
                  >
                    <i>{t.replace(/^color-/, '')}</i>
                    <i>
                      {getComputedStyle(document.documentElement).getPropertyValue(`--${c}-${t}`)}
                    </i>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Empty, () => true);
