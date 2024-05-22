import { createComponent } from 'solid-js';
import { css } from '@moneko/css';
import { Dynamic } from 'solid-js/web';
import type { MDXComponents } from '@moneko/solid/mdx';

type Props = {
  children: Element;
  [key: string]: unknown;
};
function tag(type: string, p: Props) {
  const level = type.replace(/[^0-9]/gi, '');

  return createComponent(Dynamic, {
    component: type,
    'data-prefix': level ? '# ' : void 0,
    role: level ? 'heading' : void 0,
    'aria-level': level,
    ...p,
  });
}
const icons = {
  npm: 'https://github.com/npm.png?size=32',
  yarn: 'https://github.com/yarnpkg.png?size=32',
  pnpm: 'https://github.com/pnpm.png?size=32',
};

function logo(src: string) {
  return (
    src &&
    createComponent(Dynamic, {
      component: 'img',
      src: src,
      style: 'width:15px;height:15px',
    })
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

const npmTabCss = css`
  :host {
    --tab-current-bg: var(--primary-details-bg);
  }

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
const noShadowMd = css`
  .n-md-body {
    padding: 0 16px;
    margin-block-end: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;

export function NpmTabs(p: Props) {
  const items = Object.keys(p)
    .map((key) => {
      return (
        p[key] && {
          label: key,
          icon: logo(icons[key as keyof typeof icons]),
          content: createComponent(Dynamic, {
            component: 'n-md',
            'no-render': true,
            css: noShadowMd,
            text: p[key],
            'line-number': false,
          }),
        }
      );
    })
    .filter(Boolean);

  return createComponent(Dynamic, {
    component: 'n-tabs',
    items: items,
    type: 'card',
    css: npmTabCss,
    ...p,
  });
}

const mdxScope: MDXComponents = {
  h1: tag.bind(null, 'h1'),
  h2: tag.bind(null, 'h2'),
  h3: tag.bind(null, 'h3'),
  h4: tag.bind(null, 'h4'),
  h5: tag.bind(null, 'h5'),
  h6: tag.bind(null, 'h6'),
  pre(p: Props) {
    return tag('n-code', {
      toolbar: true,
      lang: p.children.className.replace('language-', '').replace(/ .*$/, ''),
      ...p,
    });
  },
} as unknown as MDXComponents;

export default mdxScope;
