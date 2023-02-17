---
title: Node
titleTemplate: 面试总结
outline: 'deep'
---


# Node



## node的事件循环

| 阶段 | 解释 |
| ----- | --- |
| timers | |
| pending callback | |
| idle prepare | |
| poll | |
| check | |
| close callbacks | |


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
