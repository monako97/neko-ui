import React, { useMemo } from 'react';
import { injectGlobal } from 'neko-ui';
import getBrowser from 'neko-ui/utils/broswer';
import jb_beam from '@/assets/images/jb_beam.svg';
import { projectInfo } from '@/utils';

injectGlobal`
  .site-empty {
    min-block-size: calc(100vb - 236px);

    & > span {
      margin-inline-start: 16px;
    }

    .site-empty-top {
      display: flex;
      gap: 24px;
    }

    .site-empty-info {
      flex: 1;
    }

    &-thank {
      img {
        inline-size: 120px;
        block-size: 120px;
      }

      h2::before,
      a::after {
        content: none;
      }

      h2 {
        margin: 0;
        border: none;
      }
    }

    &-colors {
      display: flex;
      gap: 12px;
    }

    &-color {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 5px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--border-radius);
        padding: 8px 12px;
        color: #fff;
        cursor: pointer;
        transition-property: background-color;

        &,
        span {
          transition-timing-function: var(--transition-timing-function);
          transition-duration: var(--transition-duration);
        }

        span {
          color: var(--text-color);
          transition-property: opacity, color;

          &:first-of-type::before {
            content: attr(data-name);
          }

          &:last-of-type {
            font-size: var(--font-size-xs);
            opacity: 0.8;
          }
        }

        &:hover span:first-of-type {
          &::before {
            content: attr(data-val);
          }
        }
      }
    }
  }
`;

const Empty: React.FC = () => {
  const { infos, colors, types } = useMemo(() => {
    const _browser = getBrowser();

    return {
      broswer: _browser,
      infos: [
        ['描述', projectInfo.description],
        ['版本', projectInfo.version],
        ['作者', projectInfo.author?.name],
        ['浏览器', `${_browser.name} ${_browser.version}`],
      ],
      colors: ['primary', 'warning', 'error', 'success'],
      types: ['bg', 'outline', 'border', 'hover', 'color', 'active'],
    };
  }, []);

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
            <img src={jb_beam} />
          </a>
        </div>
      </div>
      <h4>主题色</h4>
      <div className="site-empty-colors">
        {colors.map((c) => {
          return (
            <div key={c} className="site-empty-color">
              {types.map((t) => {
                const v = `--${c}-${t}`;

                return (
                  <div
                    key={t}
                    className="site-empty-color-item"
                    style={{
                      backgroundColor: `var(${v})`,
                    }}
                  >
                    <span data-val={v} data-name={t} />
                    <span>{getComputedStyle(document.documentElement).getPropertyValue(v)}</span>
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

export default Empty;
