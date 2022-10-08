---
title: yarn
titleTemplate: 学习笔记
outline: 'deep'
---

[toc]

# YARN


## Usage


| 命令 | 描述 |
| ---- | ---- |
| `yarn install`| 安装所有依赖|
| `yarn add [package]` | 增加一个依赖 |
| `yarn up [package]` | 更新一个依赖 |
| `yarn remove [package]` | 删除一个依赖 |
| `yarn set version latest` | 更新`yarn`自己 |
| `yarn cache clean` | 删除共享缓存文件|
| `yarn workspace` | 在指定的`workspace`中运行命令|


## Features

### PnP



::: details node_modules的问题
`node_modules`通常包含大量文件,生成它们所需的时间较长<br/>

`node_modules`生成是一个`I/O`繁重的操作,包管理器除了做一个简单的文件复制之外没有太多的余地来优化它<br/>

在运行时,`node`解析也必须进行一些操作来确定从哪里加载每个所需的文件,这也是启动`node`应用程序花费如此多时间的部分原因<br/>

`node_modules`的设计不允许包管理工具对包正确的去重，这不仅导致磁盘使用率高于所需,而且一些包在内存中被多次实例化
:::


`PnP`让包管理器通知解释器包在磁盘上的位置，并管理包之间的依赖关系<br/>
在这种模式下，会生成单个`.pnp.cjs`文件，`.pnp.cjs`文件中，包含一个包名称和版本到磁盘位置的映射，还包含一个包名称和版本到它们的依赖项列表的映射，有了这些查找表，`yarn`可以立即告诉`node`在哪里可以找到它需要访问的任何包



#### loose模式


::: details default mode
```json
// package.json
{
  "name": "test",
  "packageManager": "yarn@3.2.3",
  "dependencies": {
    "webpack": "^5.74.0"
  }
}

```

<br/>

```
yarnPath: .yarn/releases/yarn-3.2.3.cjs
```

<br/>

```js
// webpack依赖acorn
let acorn = require("acorn");
console.log(acorn)
```
:::


::: details loose mode
```json
// package.json
{
  "name": "test",
  "packageManager": "yarn@3.2.3",
  "dependencies": {
    "webpack": "^5.74.0"
  }
}

```

<br/>

```
yarnPath: .yarn/releases/yarn-3.2.3.cjs
pnpMode: loose
pnpFallbackMode: 'acorn'
```

<br/>

```js
// webpack依赖acorn
let acorn = require("acorn");
console.log(acorn)
```
:::


如上两个案例可以看出，在`PnP`的严格模式下，没有明确列出依赖项的包不允许访问，尽管它的依赖项依赖这个包<br/>

在`loose`模式下,`PnP`与`node-modules`提升器协同工作,允许访问没有明确列为依赖项的包


### 离线缓存

每次从远程仓库下载一个包,包的副本存储在缓存中。下次安装相同的包时，yarn将利用存储在缓存中的版本。

::: tip
默认情况下缓存在项目本地，缓存的位置是`.yarn/cache`,可以使用`cacheFolder`配置选项进行修改<br/>
如果`enableGlobalCache`为true,它将指示yarn使用一个特殊路径，该路径将由列出相同配置的所有项目共享<br/>
可以通过共享缓存来禁用本地缓存,这种情况下将使用全局缓存<br/>
```
// .yarnrc.yml
enableGlobalCache: true
```
清除缓存
```sh
// 清除缓存
yarn cache clean
// 清除全局镜像
yarn cache clean --mirror
```
:::


### workspaces


::: details monorepos
允许多个项目一起存在于同一个存储库中,并可以相互交叉引用,对一个源代码的任何修改都会立即应用于其他项目
:::

#### worktree

声明`worktree`，要在`package.json`文件中声明`workspaces`字段

#### workspace

只能访问工作空间所依赖的依赖项<br/>
包管理工具能够解析`workspace: `<br/>
当使用`workspace: `协议时,`yarn`将拒绝解析除本地工作区以外的任何内容


### 零安装

| 零安装的条件 |
| ----- |
| 使用`yarn2`或更高版本 |
| 使用`pnp`而不是`node_modules`解决依赖关系 |
| 将`.yarn/cache`添加到远程仓库中 |
| 将`.pnp.cjs`(包含`node`用于加载您的包的依赖关系树)添加到远程仓库中 |




## Yarn在package.json中的常用字段


```json
{
    // 必须提供给当前包才能正常工作的一组依赖项
    "dependencies": {},
    // 列出的依赖项仅安装在本地，并且永远不会由包的使用者安装
    "devDependencies": {},
    // 列出的依赖项将由使用者提供
    "peerDependencies": {},
    // 列出的依赖项即便安装失败，也不影响整体项目运行
    "optionalDependencies": {},
    // 只能设置在项目的根目录下，在任何其他workspace中使用会产生警告
    // 定义使用特定的包版本,下面列出了acorn包使用6.4.2版本，如果你的项目里引入了webpack，acorn是webpack的依赖，它的版本可能是8.8.0,设置此字段后，将只会下载6.4.2版本
    "resolutions": {
        "acorn": "6.4.2"
    }
}
```


## .yarnrc.yml

```
// 下载的软件包在系统上的存储路径
cacheFolder: "./.yarn/cache"

// 忽略cacheFolder设置，并将缓存文件存储到共享的文件夹中
enableGlobalCache: false

// 存储所有系统全局文件的路径
globalFolder: "./.yarn/global"

// 定义发出http请求时要使用的代理
httpProxy: "http://127.0.0.1:1087"

// 定义发出https请求时要使用的代理
httpsProxy: "http://127.0.0.1:1087"

// 定义使用什么方式去安装node包
nodeLinker: "pnp"

// 某些引入的依赖包在依赖项方面被错误的指定,从而导致yarn拒绝访问，利用packageExtensions字段提供了一种扩展现有包定义的方法
packageExtensions: ""

// 定义pnp模式下允许包使用内置回退机制的范围
pnpFallbackMode: ""

// 定义pnp的模式,有loose和strict两种模式
pnpMode: ""

// 定义目前在项目中安装yarn的首选方式
yarnPath: ""
```



