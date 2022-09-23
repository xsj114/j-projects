---
title: yarn
titleTemplate: 学习笔记
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


## Features


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



