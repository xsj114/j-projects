---
title: CSS
titleTemplate: 面试总结
---

[toc]

# CSS

## 块元素的特性

默认块元素独占一行<br/>
支持所有`css`命令


## 内联元素的特性

宽高由内容撑开<br/>
不支持宽高<br/>
一行上可以显示继续跟同类的标签<br/>
不支持上下的`margin`<br/>
代码换行被解析

## `inline-block`的特性

块在一排显示<br/>
内联支持宽高<br/>
默认内容撑开宽度<br/>
标签之间的换行间隙被解析


## float的特性

::: tip
定义：
使元素脱离文档流,按照指定方向发生移动,遇到父级边界或者相邻的浮动元素停了下来
:::

块在一排显示<br/>
内联支持宽高<br/> 
默认内容撑开宽度<br/> 
脱离文档流<br/> 
提升层级半层 


## `position-relative`的特性


不影响元素本身的特性<br/>
不使元素脱离文档流,元素移动之后原始位置会被保留<br/>
如果没有定位偏移量,对元素本身没有任何影响<br/>
提升层级

## `position-absolute`的特性

使元素完全脱离文档流<br/> 
使内联支持宽高<br/>
块属性标签内容撑开宽度<br/>
如果有定位父级相对于定位父级发生偏移,没有定位父级相对于`document`发生偏移<br/>
相对定位一般都是配合绝对定位元素使用<br/>
提升层级



## 说出10个块级元素与10个行内元素，并说出行级元素与块级元素的区别

| 块级元素 |
| ------ |
|  \<div\>  |
| \<p\> |
| \<h1\> |
| \<form\> |
| \<tr\> |
| \<td\> |
| \<table\> |
| \<address\>|
| \<ul\>|
| \<li\>|

|行级元素 |
| ----- |
|    \<a\>   |
| \<input\>|
| \<label\> |
| \<br\> |
| \<img\> |
| \<span\> |
| \<strong\> |
|  \<textarea\> |
|  \<em\>         |
|    \<big\>         |

块级元素可以包含行级元素和块级元素<br/>
行级元素不能包含块级元素



## 用纯css画一个下箭头

```html
<style type="text/css">
div{
    width:0;
    height:0;
    border-top:10px solid #000;
    border-left:10px solid transparent;
    border-right:10px solid transparent;
}
</style>
<body>
    <div></div>	
</body>
```


## margin的问题

| 问题 | 解决 |
| ---- | ---- |
| 使用`margin-top`会传递给他的父级 | 通过触发`BFC`解决 |
| `margin`值会上下叠压 | 单独给每个元素设置，虽然还会有上下叠压的问题，但是会取最大值 |





## 什么是外边距重叠？重叠的结果是什么？

外边距重叠就是`margin-collapse`

在`css`当中,相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且所结合的外边距称为折叠外边距

| 计算规则 |
| ----- |
| 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值 |
| 两个相邻的外边距都是负数时,折叠结果是两者绝对值的较大值 |
| 两个外边距一正一负时,折叠结果是两者相加的和 |


## 清除浮动的几种方法

| 方法 | 弊端 |
| --- | ---- |
| 加高度 | 扩展性不好 |
| 给父级加浮动 | 页面中所有元素都加浮动 |
| `after`伪类 | |



## `display:none`与`visibility:hidden`的区别是什么？

`display:none`隐藏对应的元素但不挤占该元素原来的空间<br/>
`visibility:hidden`隐藏对应的元素并且挤占该元素原来的空间



## css中`link`和`@import`的区别是

`link`属于`HTML`标签,在页面加载的时候,`link`会同时被加载<br/>
`@import`是`css`中提供的,`@import`引用的`CSS`会在页面加载完成后才会加载引用的`css`



## 什么是`css hack`

针对不同的浏览器写不同的`css code`的过程就是`css hack`也是浏览器兼容


## 假设高度已知，请写出三栏布局，其中左栏，右栏，宽度各为300px，中间自适应

| 方法 |  描述 |
| --- | ---- |
|  浮动  | 清楚浮动,如果处理不好,问题会很多,兼容性较好|
| 绝对定位 |   好处是快捷，坏处是下面的子元素都要脱离文档流 |
| `flexbox`  | 比较完美的布局 |
| 表格布局  | 兼容性非常好,会同时增高 |
| 网格布局 |  新的技术 |



## 谈谈你对CSS盒模型的认识

`CSS`盒模型包含`margin`,`border`,`padding`,`content`<br/>
盒模型大小 = `border` + `padding` + `width/height`<br/>
标准盒模型与`IE`盒模型的区别是计算的宽度和高度不同

| 盒模型分类 |  描述  | 设置 |
| ------ | ---- | ----- |
| 标准盒模型 |  宽度和高度指的是`content` |  `box-sizing: content-box;`  |
| `IE`盒模型 | 宽度和高度指的是`content+padding+border` | 	`box-sizing: border-box;` |



## JS怎么获取盒模型对应的宽和高

```js
// 取到内联样式的宽和高
dom.style.width/height

// 计算后的样式(只有IE支持)
dom.currentStyle.width/height 

// 计算后的样式
window.getComputedStyle(dom).style.width/height  

dom.getBoundingClientRect().width/height
```


## BFC

| `BFC`的原理 |
| ------ | 
|  在`BFC`这个元素内的垂直方向的边距会发生重叠  |
| `BFC`的区域不会与浮动元素重叠 |
| 计算`BFC`高度的时候，浮动元素也会参与计算 |
| `BFC`在页面中是一个独立的容器<br/>外面的元素不会影响里面的元素<br/>里面的元素也不会影响外面的元素 |



|创建`BFC` |
| ----- |
|  `overflow`不为`visible` |
| `float`值不为`none` |
| `position`不为`static`或`relative`|
| `display:inline-block` |



