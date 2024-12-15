import { createMemo, Show } from 'solid-js';
import { css } from '@moneko/css';
import type { MDXComponents } from '@moneko/solid/mdx';
import { type Language, type TabOption, theme } from 'neko-ui';

interface Props {
  children: Element;
  [key: string]: unknown;
}
const icons = {
  npm: 'https://github.com/npm.png?size=32',
  yarn: 'https://github.com/yarnpkg.png?size=32',
  pnpm: 'https://github.com/pnpm.png?size=32',
};

function logo(src: string) {
  return (
    <Show when={src}>
      <img
        src={src}
        alt=""
        style={{
          width: '15px',
          height: '15px',
        }}
      />
    </Show>
  );
}

export function npm(
  type: keyof typeof icons,
  p: { package: string; script: string; mode: 'dependencies' | 'devDependencies' },
) {
  const mode = p.mode || 'dependencies';
  let script = p.script || 'install';

  if (script === 'install' || script === 'i') {
    script = type === 'npm' ? script : 'add';
  }
  return `\`\`\`shell
${type} ${script} ${p.package} ${mode === 'dependencies' ? '-S' : '-D'}
\`\`\``;
}

const noShadowMd = css`
  .n-md-body {
    padding: 0 16px;
    margin-block-end: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;
const npmTabCss = css`
  .tabs {
    z-index: 1;

    .tab:not(.active) {
      border-radius: var(--border-radius);
    }

    &::before {
      content: none;
    }
  }

  .tabs + .content {
    border: var(--border-base);
    border-radius: var(--border-radius);
    background-color: var(--tab-current-bg);
    transform: translate3d(0, -1px, 1px);
    transition:
      border-color var(--transition-timing-function) var(--transition-duration),
      background-color var(--transition-timing-function) var(--transition-duration);
  }

  .tabs:has(& .first-active) + .content {
    border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
    color: aqua !important;
  }
`;

export function NpmTabs(p: Props) {
  const { isDark } = theme;

  const items = createMemo(
    () =>
      Object.keys(p)
        .map((key) => {
          return (
            p[key] && {
              label: key,
              icon: logo(icons[key as keyof typeof icons]),
              content: <n-md no-render={true} css={noShadowMd} text={p[key] as string} />,
            }
          );
        })
        .filter(Boolean) as TabOption[],
  );

  return (
    <n-tabs
      type="card"
      style={{
        '--tab-current-bg': isDark() ? '#1c1c1c' : 'var(--primary-details-bg)',
      }}
      css={npmTabCss}
      items={items()}
      {...p}
    />
  );
}

const mdxScope: MDXComponents = {
  h1(p: Props) {
    return <h1 data-prefix="# " role="heading" aria-level="1" {...p} />;
  },
  h2(p: Props) {
    return <h2 data-prefix="# " role="heading" aria-level="2" {...p} />;
  },
  h3(p: Props) {
    return <h3 data-prefix="# " role="heading" aria-level="3" {...p} />;
  },
  h4(p: Props) {
    return <h4 data-prefix="# " role="heading" aria-level="4" {...p} />;
  },
  h5(p: Props) {
    return <h5 data-prefix="# " role="heading" aria-level="5" {...p} />;
  },
  h6(p: Props) {
    return <h6 data-prefix="# " role="heading" aria-level="6" {...p} />;
  },
  pre(p: Props) {
    return (
      <n-code
        toolbar={true}
        language={p.children.className.replace('language-', '').replace(/ .*$/, '') as Language}
        {...p}
      />
    );
  },
} as unknown as MDXComponents;

export default mdxScope;
