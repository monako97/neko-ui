---
title: 基本使用
order: 1
---

```html
<n-switch checked="true"></n-switch>
<n-spin spin="true">
  <n-highlight-text
    text="朱敦儒的词作语言流畅，清新自然。他的词风可分为三个阶段：早年词风浓艳丽巧；
      中年的词风激昂慷慨；闲居后词风婉明清畅。朱敦儒对南宋词坛也产生了 一些积极的影响。
      他将一生的际遇和心态变化都赋于词中，给后人以直接的启迪和影响。
      辛弃疾《念奴娇》词就明确说是“效朱希真体”，陆游年青时曾受知于朱敦儒，为人与作词都受朱敦儒的熏陶，
      他的名作《卜算子·咏梅》即与朱敦儒的《卜算子·古涧一枝梅》风格相似。"
    highlight="语言流畅"
  ></n-highlight-text>
</n-spin>
<script>
  const el = container.querySelector('n-switch');
  const spinEl = container.querySelector('n-spin');

  el.onchange = function (e) {
    spinEl.spin = e.detail;
  };
</script>
```

```jsx
let el;

render(
  <>
    <n-switch
      checked
      onChange={(e) => {
        el.spin = e.detail;
      }}
    />
    <n-spin ref={(e) => (el = e)} spin>
      <n-highlight-text
        text="朱敦儒的词作语言流畅，清新自然。他的词风可分为三个阶段：早年词风浓艳丽巧；
      中年的词风激昂慷慨；闲居后词风婉明清畅。朱敦儒对南宋词坛也产生了 一些积极的影响。
      他将一生的际遇和心态变化都赋于词中，给后人以直接的启迪和影响。
      辛弃疾《念奴娇》词就明确说是“效朱希真体”，陆游年青时曾受知于朱敦儒，为人与作词都受朱敦儒的熏陶，
      他的名作《卜算子·咏梅》即与朱敦儒的《卜算子·古涧一枝梅》风格相似。"
        highlight="《卜算子·咏梅》"
      />
    </n-spin>
  </>
);
```
