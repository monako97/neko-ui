import React from 'react';
import { Markdown } from 'neko-ui';

const Demo = () => {
  const md = `
内联公式$\\left(\\LARGE{AB}\\right)$
内联公式$\\xcancel{ABC}$
$$
\\begin{array}{c}   S= \\binom{N}{n},A_{k}=\\binom{M}{k}\\cdot \\binom{N-M}{n-k} \\\\   P\\left ( A_{k}\\right ) = \\frac{\\binom{M}{k}\\cdot \\binom{N-M}{n-k}}{\\binom{N}{n}} \\end{array}\\begin{array}{c}   a,b \\in R^{+} \\\\    \\Rightarrow \\frac{a+b}{{2}}\\ge \\sqrt{ab} \\\\    \\left( \\text{当且仅当}a=b\\text{时取“}=\\text{”号}\\right) \\end{array}
$$

$$
\\begin{equation}
  x = a_0 + \\cfrac{1}{a_1 
          + \\cfrac{1}{a_2 
          + \\cfrac{1}{a_3 + \\cfrac{1}{a_4} } } }
\\end{equation}
$$

![/assets/images/ypi.png](csa)
    `;

  return <Markdown text={md} tex />;
};

export default Demo;
