---
title: 数学公式
description: 通过 `$` 包裹的将渲染为行内公式, 通过 `$$` 包裹的将渲染为块级公式
order: 3
---

```html
<n-md>
内联公式$\left(\LARGE{AB}\right)$
内联公式$\xcancel{ABC}$

$$
\begin{equation}
  x = a_0 + \cfrac{1}{a_1
          + \cfrac{1}{a_2
          + \cfrac{1}{a_3 + \cfrac{1}{a_4} } } }
\end{equation}
$$
</n-md>
```

```jsx
<n-md
  text={`
内联公式$\\left(\\LARGE{AB}\\right)$
内联公式$\\xcancel{ABC}$

$$
\\begin{equation}
  x = a_0 + \\cfrac{1}{a_1
          + \\cfrac{1}{a_2
          + \\cfrac{1}{a_3 + \\cfrac{1}{a_4} } } }
\\end{equation}
$$`}
/>
```
