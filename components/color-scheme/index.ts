import sso from 'shared-store-object';

export type Theme = 'light' | 'dark';

const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

const colorScheme = sso({
  schema: (themeMedia?.matches ? 'light' : 'dark') as Theme,
});

themeMedia?.addEventListener('change', ({ matches }: { matches: boolean }) => {
  colorScheme.schema = matches ? 'light' : 'dark';
});

export default colorScheme;
