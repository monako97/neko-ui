在非原生(`React`、`Vue`、`SolidJS`、`Angular` 等)技术栈中使用时, 您只需要将其视为原生标签书写就行, 事件绑定的写法按照所使用的技术栈的规范写法即可.
比如: 在 `Vue` 中, 事件绑定需要将 onXxx 替换为 @xxx, 而在 `React` 或 `SolidJS` 中则无需调整

1. 案例中的代码

   ```jsx
   <n-input onChange={(e) => console.log(e)} />
   ```

2. 你在 `Vue` 中使用的代码

   ```html
   <template>
     <n-input @change="(e) => console.log(e)" />
   </template>
   ```
