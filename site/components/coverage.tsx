import { For, createMemo } from 'solid-js';
import { css, cx } from '@moneko/css';
import { getPathName, projectBasicInfo, useLocation } from '@moneko/solid-js';
import { type CustomElement, baseStyle } from 'neko-ui';
import { customElement } from 'solid-element';

const style = css`
  .site-coverage {
    display: flex;
    gap: 16px;
    margin: 0 auto 16px;
    max-inline-size: 1280px;
    flex-wrap: wrap;
  }

  .site-coverage-error {
    --border-color: var(--error-color, #ff4d4f);
  }

  .site-coverage-success {
    --border-color: var(--success-color, #52c41a);
  }

  .site-coverage-warning {
    --border-color: var(--warning-color, #faad14);
  }

  .site-coverage-body {
    display: flex;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow:
      0 0 2px 0 var(--border-color),
      inset 0 0 2px 0 var(--border-color);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    transition-property: box-shadow, background-color, border-color, color;
  }

  .site-coverage-label,
  .site-coverage-value {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: inherit;
  }

  .site-coverage-label {
    border-inline-end: 1px solid var(--border-color);
    padding: 0 8px;
    font-size: var(--font-size);
    font-weight: 500;
    color: white;
    background-color: var(--border-color);
    text-shadow: 2px 2px 2px var(--primary-shadow);
    line-height: 20px;
  }

  .site-coverage-value {
    padding: 4px 8px;
    min-inline-size: 80px;
    font-size: var(--font-size-sm);
    text-align: center;
    line-height: 16px;
    flex-direction: column;
    color: var(--border-color);
  }

  .site-coverage-value > div:first-of-type {
    border-block-end: 1px solid var(--border-color);
    inline-size: 100%;
    transition: inherit;
    transition-property: box-shadow, background-color, border-color;
  }
`;

type CoverageType = 'statements' | 'conditionals' | 'methods';

function Coverage() {
  const location = useLocation();
  const coverage = createMemo(() => {
    const name = getPathName(location);

    return (
      projectBasicInfo.coverage[name ? `components.${name}` : projectBasicInfo.programInfo.name] ||
      {}
    );
  });

  function getNum(num: number) {
    return typeof num === 'number' && !isNaN(num) ? num : '-';
  }
  const obj: Record<CoverageType, string> = {
    statements: '语句覆盖率',
    conditionals: '条件覆盖率',
    methods: '函数覆盖率',
  };
  const keys = Object.keys(obj);

  return (
    <>
      <style>
        {baseStyle()}
        {style}
      </style>
      <div class="site-coverage">
        <For each={keys}>
          {(k) => {
            const c = createMemo(() => parseFloat(coverage()[k as never]));
            const cd = createMemo(() => parseFloat(coverage()[`covered${k}` as never]));
            const num = createMemo(() =>
              c() === 0 && cd() === 0 ? 100 : Math.round((cd() / c()) * 100) || 0,
            );
            const stat = createMemo(() =>
              num() < 50 ? 'error' : num() < 80 ? 'warning' : 'success',
            );

            return (
              <div class={cx('site-coverage-body', `site-coverage-${stat()}`)}>
                <div class="site-coverage-label">{obj[k as CoverageType]}</div>
                <div class="site-coverage-value">
                  <div>{num()}%</div>
                  <div>{`${getNum(c())} / ${getNum(cd())}`}</div>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </>
  );
}
export type CoverageElement = CustomElement;

customElement('site-coverage', Coverage);
