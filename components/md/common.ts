export function katexBlock(code: string) {
  return `<n-katex display-mode="true">${code}</n-katex>`;
}
export function katexInline(code: string) {
  return `<n-katex>${code}</n-katex>`;
}
export function image(lazyPicture?: boolean, pictureViewer?: boolean) {
  return function (src: string, title: string, alt: string) {
    return `<n-img lazy="${lazyPicture}" disabled="${!pictureViewer}" role="img" src="${src}" alt="${alt}" ${title ? `title="${title}"` : ''}></n-img>`;
  };
}
export function code(langToolbar?: string[] | null) {
  return function (sourcecode: string, lang: string) {
    if (lang === 'treeview') {
      return `<n-tree data="${sourcecode}" />`;
    }
    const needEndod = /<[^>]+>/;

    return `<n-code class="n-code" toolbar="${langToolbar && !!langToolbar.length}" language="${lang}">${needEndod.test(sourcecode) ? encodeURIComponent(sourcecode) : sourcecode}</n-code>`;
  };
}
