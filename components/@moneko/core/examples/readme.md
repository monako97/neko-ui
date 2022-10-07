[TOC]

# @moneko/core

[1]: https://swc.rs/docs/configuration/minification#jscminifycompress 'SwcOptions'
[2]: https://terser.org/docs/api-reference#compress-options 'TerserOptions'

## 配置项

| 属性               | 说明                                              | 类型                                                                                                          | 默认值  |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------- |
| clean              | 清除过时的打包文件                                | boolean                                                                                                       | true    |
| compiler           | 转译方式                                          | swc\|tsc                                                                                                      | swc     |
| swcrc              | swc 配置项                                        | Record<string, any> \| ((isDev: boolean) => Record<string, any>)                                              | -       |
| entry              | 额外的 entry, 比如兼容 es10 的 object.fromentries | Record<string, string>                                                                                        | -       |
| minifier           | js、css 压缩配置                                  | { type?: swc \| tsc; options?: [SwcOptions][1] \| [TerserOptions][2]; css?: 'cssnano' \| 'parcelCss';} | -       |
| env                | 环境变量, 可通过 process.env 获取                 | Record<string, any>                                                                                           | -       |
| miniIdc            | 数据持久化配置, 为 false 时关闭持久化             | { programName?: string; encrypt?: boolean; encryptKey?: string; }\|false                                      | -       |
| sourceMap          | sourceMap 配置                                    | SourceMapDevToolPluginOptions \| false;                                                                       | -       |
| devtool            | devtool 配置                                      | Configuration['devtool']                                                                                      | -       |
| alias              | 路径别名映射                                      | Record<string, string>                                                                                        | -       |
| routeBaseName      | 根路由                                            | string                                                                                                        | /       |
| publicPath         | 资源根路径                                        | string                                                                                                        | auto    |
| designSize         | 设计图尺寸                                        | number                                                                                                        | 1680    |
| fallbackCompPath   | 自定义容错组件                                    | string                                                                                                        | -       |
| modifyVars         | less 全局变量                                     | Record<string, string>                                                                                        | -       |
| antdThemeVariables | antd 主题配置                                     | { compact: false, dark: false}                                                                                | -       |
| prefixCls          | 类名前缀                                          | string                                                                                                        | sky     |
| layoutHasSider     | 是否需要左侧菜单栏 仅中台类型有效                 | boolean                                                                                                       | -       |
| moduleRules        | 自定义 webpack module rules                       |                                                                                                               | -       |
| cssModules         | node_modules 中, 需要开启 cssModules 的模块       | string[]                                                                                                      | -       |
| importOnDemand     | 按需引入                                          |                                                                                                               | -       |
| proxy              | 服务器代理                                        | Record<string, string>                                                                                        | -       |
| cacheDirectory     | 自定义缓存目录，为 false 时，不使用缓存           | string \| false                                                                                               | -       |
| devServer          | 开发服务器设置                                    | Record<string, string>                                                                                        | -       |
| assetHtml          | 自定义插入 html 的 js 和 css                      | AssetHtmlOptions[]                                                                                            | -       |
| htmlPluginOption   | HtmlWebpackPlugin Option                          |                                                                                                               | -       |
| routerMode         | 路由模式                                          | 'hash' \| 'browser' \| 'memory';                                                                              | browser |
| plugins            | webpack 插件                                      |                                                                                                               | -       |
| splitChunk         | 对生产 chunk 进行拆分                             | false \|OptimizationSplitChunksOptions                                                                        | -       |
| webFontLoader      | 需要通过 Web 字体加载的字体                       | string[]                                                                                                      | -       |
| output             | 编译输出路径                                      | ROOT/dist \| ROOT/docs                                                                                        | -       |
| runtimeChunk       | 拆分 runtime                                      | boolean\| 'single' \| 'multiple'\| { name?: string \| Function; };                                            | -       |
| moduleFederation   | 模块联邦                                          | ModuleFederationOption[]                                                                                      | -       |
| externals          | 跳过编译的模块                                    | string[]                                                                                                      | -       |
| rulesInclude       | 需要进入到规则的模块或者位置                      | { less?: string[]; css?: string[]; js?: string[]; media?: string[]; fonts?: string[]; }                       | -       |

### SwcOptions

> [SwcOptions][1]

### TerserOptions

> [TerserOptions][2]

## 自定义模块解析规则

```javascript
// config/index.ts
export default {
  moduleRules: [
    {
      test: /\.md$/,
      type: 'assets',
      exclude: [/node_modules/],
    },
  ],
};
```

## 自定义 ts-loader 配置

> 在项目根目录下创建一个 tsloader.config.ts

```javascript
// tsloader.config.ts
export default {};
```
