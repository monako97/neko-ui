---
title: 基本使用
order: 1
---

```html
加载:<n-switch checked="true"></n-switch> 边框:<n-switch checked="true"></n-switch>
<br />
<n-spin spin="true" style="border: 1px solid #ccc;">
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
  const el = container.querySelectorAll('n-switch');
  const spinEl = container.querySelector('n-spin');

  el[0].onchange = function (e) {
    spinEl.spin = e.detail;
  };
  el[1].onchange = function (e) {
    spinEl.style.border = e.detail ? '1px solid #ccc' : 'none';
  };
</script>
```

```jsx
let el;
const text = `朱敦儒的词作语言流畅，清新自然。他的词风可分为三个阶段：早年词风浓艳丽巧；
      中年的词风激昂慷慨；闲居后词风婉明清畅。朱敦儒对南宋词坛也产生了 一些积极的影响。
      他将一生的际遇和心态变化都赋于词中，给后人以直接的启迪和影响。
      辛弃疾《念奴娇》词就明确说是“效朱希真体”，陆游年青时曾受知于朱敦儒，为人与作词都受朱敦儒的熏陶，
      他的名作《卜算子·咏梅》即与朱敦儒的《卜算子·古涧一枝梅》风格相似。`;
render(
  <>
    加载:
    <n-switch
      checked
      onChange={(e) => {
        el.spin = e.detail;
      }}
    />
    边框:
    <n-switch
      checked
      onChange={(e) => {
        el.style.border = e.detail ? '1px solid #ccc' : 'none';
      }}
    />
    <br />
    <n-spin
      ref={(e) => (el = e)}
      spin
      style={{
        border: '1px solid #ccc',
      }}
    >
      <n-highlight-text text={text} highlight="《卜算子·咏梅》" />
    </n-spin>
  </>
);
```
