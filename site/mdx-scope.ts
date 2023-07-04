import { createComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { MDXComponents } from 'mdx/types';

type Props = {
  children: Element;
  [key: string]: unknown;
};
function tag(type: string, p: Props) {
  const level = type.replace(/[^0-9]/gi, '') || undefined;

  return createComponent(Dynamic, {
    component: type,
    'data-prefix': level ? '# ' : undefined,
    role: level ? 'heading' : undefined,
    'aria-level': level,
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
