# @moneko/core

[TOC]

[1]: https://swc.rs/docs/configuration/minification#jscminifycompress 'SwcOptions'
[2]: https://terser.org/docs/api-reference#compress-options 'TerserOptions'

## 配置项

| 属性             | 说明                                              | 类型                                                                                                        | 默认值    |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------- |
| clean            | 清除过时的打包文件                                | boolean                                                                                                     | true      |
| compiler         | 转译方式                                          | `swc`\|`tsc`                                                                                                | `swc`     |
| swcrc            | swc 配置项                                        | `SwcConfig` \| ((isDev: `boolean`) => `SwcConfig`)                                                          | -         |
| entry            | 额外的 entry, 比如兼容 es10 的 object.fromentries | `Record<string, string>`                                                                                    | -         |
| minifier         | js、css 压缩配置                                  | { type?: `swc`\|`tsc`; options?: [`SwcOptions`][1] \| [`TerserOptions`][2]; css?: `cssnano` \| `parcelCss`} | -         |
| env              | 环境变量, 可通过 process.env 获取                 | `Record<string, any>`                                                                                       | -         |
| miniIdc          | 数据持久化配置, 为 false 时关闭持久化             | { programName?: string; encrypt?: boolean; encryptKey?: string; }\|`false`                                  | -         |
| sourceMap        | sourceMap 配置                                    | `SourceMapDevToolPluginOptions` \| `false`                                                                  | -         |
| devtool          | devtool 配置                                      | `Configuration['devtool']`                                                                                  | -         |
| alias            | 路径别名映射                                      | `Record<string, string>`                                                                                    | -         |
| basename         | 根路由                                            | string                                                                                                      | `/`       |
| publicPath       | 资源根路径                                        | string                                                                                                      | `auto`    |
| designSize       | 设计图尺寸                                        | number                                                                                                      | 1680      |
| fallbackCompPath | 自定义容错组件                                    | string                                                                                                      | -         |
| modifyVars       | less 全局变量                                     | `Record<string, string>`                                                                                    | -         |
| prefixCls        | 类名前缀                                          | string                                                                                                      | n         |
| layoutHasSider   | 是否需要左侧菜单栏 仅中台类型有效                 | boolean                                                                                                     | -         |
| moduleRules      | 自定义 webpack module rules                       |                                                                                                             | -         |
| cssModules       | node_modules 中, 需要开启 cssModules 的模块       | `string`[]                                                                                                  | -         |
| importOnDemand   | 按需引入                                          | `SwcImportOnDemandTransform` \| `TsImportPlugin.Options`                                                    | -         |
| proxy            | 服务器代理                                        | `Record<string, string>`                                                                                    | -         |
| cacheDirectory   | 自定义缓存目录，为 false 时，不使用缓存           | `string` \| `false`                                                                                         | -         |
| devServer        | 开发服务器设置                                    | `Record<string, string>`                                                                                    | -         |
| assetHtml        | 自定义插入 html 的 js 和 css                      | `AssetHtmlOptions`[]                                                                                        | -         |
| htmlPluginOption | HtmlWebpackPlugin Option                          | `HtmlWebpackPluginOptions`                                                                                  | -         |
| routerMode       | 路由模式                                          | `hash` \| `browser` \| `memory`                                                                             | `browser` |
| plugins          | webpack 插件                                      |                                                                                                             | -         |
| splitChunk       | 对生产 chunk 进行拆分                             | `false` \|`OptimizationSplitChunksOptions`                                                                  | -         |
| output           | 编译输出路径                                      | `root_folder/dist` \| `root_folder/docs`                                                                    | -         |
| runtimeChunk     | 拆分 runtime                                      | `boolean`\|`single` \| `multiple`\| { name?: `string` \| `Function` };                                      | -         |
| moduleFederation | 模块联邦                                          | `ModuleFederationOption`[]                                                                                  | -         |
| externals        | 跳过编译的模块                                    | `string`[]                                                                                                  | -         |
| rulesInclude     | 需要进入到规则的模块或者位置                      | { less?: `string`[]; css?: `string`[]; js?: `string`[]; media?: `string`[]; fonts?: `string`[]; }           | -         |

### SwcOptions

!> [SwcOptions][1]

### TerserOptions

!> [TerserOptions][2]

## 按需导入 `swc`

!> 使用 swc 时的按需导入配置 importOnDemand: { '库名': {...配置项} }

### SwcImportOnDemandTransform

| 属性                  | 说明                                                                            | 类型                  | 默认值  |
| --------------------- | ------------------------------------------------------------------------------- | --------------------- | ------- |
| transform             | 要使用的库名称，而不是导入语句中指定的库名称。`${member}` 是替换的成员          | string                | -       |
| style                 | 设置转换时需要单独导入的样式，`${member}` 是替换的成员                          | `string` \|`boolean`  | `false` |
| skipDefaultConversion | 当设置为 true 时，将保留 `import { Button }` 语法，而不是转换为 `import Button` | boolean               | `false` |
| preventFullImport     | 当遇到会导致导入整个模块时，是否抛出                                            | boolean               | `true`  |
| memberTransformers    | 成员转换规则                                                                    | `MemberTransformer`[] | []      |

### MemberTransformer

| 属性        | 说明                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| pascal_case | 帕斯卡拼写法(大驼峰): 所有单词的首字母大写，然后直接连接起来，单词之间没有连接符                           |
| camel_case  | 骆驼拼写法(小驼峰): 第一个单词的首字母小写, 后续所有单词的首字母大写，然后直接连接起来，单词之间没有连接符 |
| kebab_case  | 连字符拼写法: 各个单词或缩写之间以`-`做间隔                                                                |
| dashed_case | 破折号式: 每个单词全小写或全大写，多单词使用`-`隔开                                                        |
| snake_case  | 蛇形命名: 每个单词全小写或全大写，多单词使用`_`隔开                                                        |

### 配置案例 MemberTransformer

```javascript
const conf = {
  importOnDemand: {
    /** 库名 */
    'neko-ui': {
      transform: 'es/${member}',
      memberTransformers: ['dashed_case'],
    },
    /** 库名 */
    lodash: {
      transform: '${member}',
    },
    /** 库名 */
    antd: {
      transform: 'es/${member}',
      style: 'es/${member}/style',
      memberTransformers: ['dashed_case'],
    },
  },
};
// 以下代码将会按照预期进行转换
import { BackTop } from 'antd';
import { Markdown } from 'neko-ui';
import { isFunction } from 'lodash';
// to
import BackTop from 'antd/es/back-top';
import 'antd/es/back-top/style';
import Markdown from 'neko-ui/es/markdown';
import isFunction from 'lodash/isFunction';
```

## 模块联邦

!> Webpack5 Module Federation

### ModuleFederationOption

| 属性     | 说明                                           | 类型                                                 | 默认值            |
| -------- | ---------------------------------------------- | ---------------------------------------------------- | ----------------- |
| name     | 模块名称，唯一性，不能重名                     | string                                               | -                 |
| filename | 打包的模块文件名                               | string                                               | `remote_entry.js` |
| name     | 模块名称，唯一性，不能重名                     | string                                               | -                 |
| remotes  | 表示作为 Host 时, 去消费哪些 Remote            | `ModuleFederationRemotes`[]                          | -                 |
| exposes  | 当前模块具体导出去的内容                       | `string` \| { name: `string`; path: `string`; }      | -                 |
| shared   | 优先用 Host 的依赖, 如果 Host 没有, 再用自己的 | `Record<string, SharedConfig \| string>`\|`string`[] | -                 |
| library  | library                                        | { type: `var` \| `string`; name: `string`; }         | -                 |
| runtime  | runtime                                        | string                                               | -                 |

### ModuleFederationRemotes

| 属性     | 说明                   | 类型       | 默认值            |
| -------- | ---------------------- | ---------- | ----------------- |
| name     | 远程模块名称           | string     | -                 |
| filename | 远程模块文件名         | string     | `remote_entry.js` |
| host     | 远程模块访问地址       | string     | -                 |
| alias    | 远程模块别名           | string     | -                 |
| library  | 从此模块加载的 library | `string`[] | -                 |

### SharedConfig

| 属性            | 说明                                                                                                                   | 类型    | 默认值 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ------ |
| eager           | 直接在异步请求后面包含提供的和后备模块,这也允许在初始加载中使用此共享模块,所有可能的共享模块也都需要急切               | boolean | -      |
| import          | 应提供共享范围的提供的模块,如果在共享作用域中找不到共享模块或版本无效,则还充当回退模块,默认为属性名称                  | number  | -      |
| packageName     | 软件包名称,用于从描述文件中确定所需的版本,仅当无法根据请求自动确定包名称时才需要                                       | string  | -      |
| requiredVersion | 共享范围中来自模块的版本要求                                                                                           | number  | -      |
| shareKey        | 在共享范围内的此键下查找模块                                                                                           | string  | -      |
| shareScope      | 共享范围名称                                                                                                           | string  | -      |
| singleton       | 在共享范围内仅允许共享模块的单个版本(默认情况下处于禁用状态)                                                           | boolean | -      |
| strictVersion   | 如果版本无效,则不接受共享模块(默认为是,如果本地后备模块可用并且共享模块不是单例,否则为 no,如果未指定所需的版本,则无效) | boolean | -      |
| version         | 所提供模块的版本,将替换较低的匹配版本,但不会替换较高的版本                                                             | number  | -      |

### 配置案例 moduleFederation

```javascript
import { PACKAGENAME } from '@moneko/core/build/process-env';
import type { PartialConfigType } from '@moneko/core';

const config: PartialConfigType = {
  htmlPluginOption: {
    tags: [
      {
        textContent: `window.__RemotesEntry__={
          // 比如你已经构建了一个sharedlibrary作为模块联邦的共享库
          sharedLibrary: '//可以访问sharedlibrary的链接'
        };`,
      },
    ],
  },
  moduleFederation: [
    {
      name: PACKAGENAME.replace(/-/g, '_'),
      remotes: [
        {
          name: 'sharedLibrary',
          host: '[window.__RemotesEntry__.sharedLibrary]',
          // 下面的这些模块在将通过网络使用sharedLibrary中的资源,而不是本地
          library: ['react', 'react-dom', 'react-router', 'react-router-dom'],
        },
      ],
    },
  ],
};

export default config;
```

## 自定义模块解析规则

```javascript
// config/index.ts
export default {
  moduleRules: [
    {
      test: /\.aaa$/,
      type: 'assets',
      exclude: [/node_modules/],
    },
  ],
};
```

## 自定义 ts-loader 配置

!> 在项目根目录下创建一个 tsloader.config.ts

```javascript
// tsloader.config.ts
export default {};
```
