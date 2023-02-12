---
title: Node
titleTemplate: 面试总结
outline: 'deep'
---


# Node


## nodejs的加载机制


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
