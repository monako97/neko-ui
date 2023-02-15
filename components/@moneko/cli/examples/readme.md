# @moneko/cli

[TOC]

## 快速开始

```shell
# 安装脚手架工具
npm i @moneko/cli -g
```

## 创建一个新项目

```shell
mo create demo
? 请输入开发者名称? @moneko/cli
? 您想创建一个什么类型的项目呢? 微应用(single-spa)
? 您使用的 react 版本是? react
? 请选择需要开启的开发辅助功能 css后处理(压缩、Hack、单位换算等), css代码规范, javascript代码规范
fetch @moneko/core, react, @moneko/postcss, @moneko/stylelint, @moneko/eslint, @moneko/cli: ...
fetch react: ^18.2.0
fetch npm package all ✨ Done!
# 创建完成
```

## 使用 npm

### 安装依赖

```shell
npm i
```

### 启动项目

```shell
npm start
# 使用补充配置 （例如额外加载 /config/prod.ts 中的启动参数）
npm start --config=prod
```

### 构建项目

```shell
npm run build
# 使用补充配置 （例如额外加载 /config/prod.ts 中的启动参数）
npm run build --config=prod
```

## 使用 Yarn

### 使用 Yarn 安装依赖

```shell
yarn
```

### 使用 Yarn 启动

```shell
yarn start
# 使用补充配置 （例如额外加载 /config/prod.ts 中的启动参数）
yarn start config=prod
```

### 使用 Yarn 构建项目

```shell
yarn build
# 使用补充配置 （例如额外加载 /config/prod.ts 中的启动参数）
yarn build config=prod
```

## 编译 app

> 使用 flutter 3.0
> 应用类型为 mobile 的项目中执行打包步骤`npm run build`，确保正确生产出的资产在 `dist` 文件夹中，然后执行 `mo buildApp`，按控制台提示操作

```shell
mo buildApp
? 请输入软件包名称? com.myoucai.bid ## 默认值
? 请选择需要打包的类型 打包为apk (release)
❯◉ 打包为apk (release) # 方向上下键选择条目，按空格键选中，回车键确认
 ◯ 打包为apk (debug)
 ◯ 打包为ipa (release)[未签名，需要 OSX 及 Xcode]
 ◯ 打包为ipa (debug)[未签名，需要 OSX 及 Xcode]

 # ...
 Running Gradle task 'assembleRelease'...                           27.7s
✓  Built build/app/outputs/flutter-apk/app-release.apk (15.8MB).
Done

```
