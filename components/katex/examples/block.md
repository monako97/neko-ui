---
title: 块级公式
description: 单独使用一块区域作为公式展示
order: 2
---

```html
<n-katex display-mode="true" fleqn="true">
\begin{array}{c}
  S= \binom{N}{n},A_{k}=\binom{M}{k}\cdot \binom{N-M}{n-k} \\
  P\left ( A_{k}\right ) = \frac{\binom{M}{k}\cdot \binom{N-M}{n-k}}{\binom{N}{n}}
\end{array}
</n-katex>
```

```jsx
<n-katex display-mode="true" fleqn="false">
{`
\\begin{array}{c}
  S= \\binom{N}{n},A_{k}=\\binom{M}{k}\\cdot \\binom{N-M}{n-k} \\\\
  P\\left ( A_{k}\\right ) = \\frac{\\binom{M}{k}\\cdot \\binom{N-M}{n-k}}{\\binom{N}{n}}
\\end{array}
`}
</n-katex>
```
