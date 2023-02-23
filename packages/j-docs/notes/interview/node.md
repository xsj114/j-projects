---
title: Node
titleTemplate: 面试总结
outline: 'deep'
---


# Node



## node的事件循环

| 阶段 | 解释 |
| ----- | --- |
| `timers` | 这个阶段执行`timer`（`setTimeout`、`setInterval`）的回调 |
| `I/O callbacks`  | 执行一些系统调用错误，比如网络通信的错误回调 |
| `idle prepare` | 仅系统内部使用 |
| `poll` | `poll`阶段主要有两个功能：<br/>处理`poll`队列的事件<br/>当有已超时的`timer`，执行它的回调函数<br/><br/>`event loop`将同步执行`poll`队列里的回调，直到队列为空或执行的回调达到系统上限，接下来`event loop`会去检查有无预设的`setImmediate`，也分两种情况：<br/><br/>若有预设的`setImmediate()`, `event loop`将结束`poll`阶段进入`check`阶段，并执行`check`阶段的任务队列<br/>若没有预设的`setImmediate()`，`event loop`将阻塞在该阶段等待,并检查`timer`队列是否为空，如果`timer`队列非空，`event loop`就开始下一轮事件循环，即重新进入到`timer`阶段<br/>|
| `check` | 执行`setImmediate()`的回调 |
| `close callbacks` | 执行`socket`的`close`事件回调 |


## nodejs的加载机制

## 为什么node可以高并发

因为`node`具有`事务驱动`和`异步I/O`特性，是非阻塞异步操作


## require有什么性能问题


## node中module.exports和exports的区别

`exports`是`module.exports`的引用

```js
console.log( module.exports === exports ) // true
```

如果给`exports`设置了一个新的对象，`exports`和`module.exports`将不再是同一个对象

```js
exports = {}
console.log( exports === module.exports ) // false
```
