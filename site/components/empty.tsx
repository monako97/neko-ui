import React, { FC, memo } from 'react';
import { css, injectGlobal } from '@emotion/css';
import getBrowser from 'neko-ui/utils/broswer';
import { projectInfo } from '@/utils';

const siteEmptyCss = css`
  .site-empty {
    min-height: calc(100vh - 14.75rem);
  }

  .site-empty > span {
    margin-left: 16px;
  }

  .site-empty-colors {
    display: flex;
    gap: 12px;
  }

  .site-empty-color {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 5px;
  }

  .site-empty-color-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius-base);
    padding: 8px 12px;
    color: #fff;
    cursor: pointer;
  }

  .site-empty-color-item i {
    color: var(--text-color);
    transition: opacity var(--transition-duration) var(--transition-timing-function);
  }

  .site-empty-color-item i:last-of-type {
    font-size: 10px;
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
