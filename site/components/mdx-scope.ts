import { createComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { MDXComponents } from 'mdx/types';

type Props = {
  children: Element;
  [key: string]: unknown;
};
function heading(tag: string, p: Props) {
  const level = tag.replace(/[^0-9]/gi, '') || undefined;

  return createComponent(Dynamic, {
    component: tag,
    'data-prefix': level ? '# ' : undefined,
    role: level ? 'heading' : undefined,
    'aria-level': level,
    ...p,
  });
}
const mdxScope: MDXComponents = {
  h1: heading.bind(null, 'h1'),
  h2: heading.bind(null, 'h2'),
  h3: heading.bind(null, 'h3'),
  h4: heading.bind(null, 'h4'),
  h5: heading.bind(null, 'h5'),
  h6: heading.bind(null, 'h6'),
  pre(p: Props) {
    return heading('n-code', {
      toolbar: true,
      lang: p.children.className.replace('language-', '').replace(/ .*$/, ''),
      ...p,
    });
  },
} as unknown as MDXComponents;

export default mdxScope;
