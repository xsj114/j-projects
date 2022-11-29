---
title: CSS
titleTemplate: 面试总结
outline: 'deep'
---

[toc]

# CSS


## doctype的意义是什么

让浏览器以标准模式渲染（比如IE，有自己的盒模型，如果带上doctype，会以标准模式渲染）<br/>
让浏览器知道元素的合法性


## em和i有什么区别

`em`是语义化的标签，表强调<br/>
`i`是纯样式的标签，表斜体<br/>
`HTML5`中`i`不推荐使用，一般用作图标


## HTML语义化的意义是什么

开发者容易理解<br/>
机器容易理解结构<br/>
有助于`SEO`

## 哪些元素可以自闭合

| 哪些元素可以自闭合 |
| ---- |
| 表单元素input |
| 图片img |
| br<br/>hr|
| meta<br/>link |

## HTML和DOM的关系

HTML是死的<br/>
DOM由HTML解析而来，是活的<br/>
JS可以维护DOM


## form的作用有哪些

直接提交表单<br/>
使用`submit`或`reset`按钮,可直接提交表单或清空表单内容<br/>
便于浏览器保存表单<br/>
第三方库可以整体提取值


## 如果图片下面有空隙，它的原理是什么，怎么样去除？


因为`img`元素是内联元素，要遵守行高的构成，默认会按照`baseline`对齐,`baseline`和底线之间是有偏差的，这个偏差的大小视字体而定

它会遵守垂直对齐这个方式，所以调整下`vertical-align`设置为`bottom`,按底线对齐,即可去除空隙


## css实现三角形

```css
<style>
div{
    width: 0;
    height: 30px;
    border-bottom: 30px solid red;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
}
</style>

<div></div>
```

## 块元素的特性

默认块元素独占一行<br/>
支持所有`css`命令



## 内联元素的特性

宽高由内容撑开<br/>
不支持宽高<br/>
一行上可以显示继续跟同类的标签<br/>
不支持上下的`margin`<br/>
代码换行被解析<br/>

## `inline-block`的特性

块在一排显示<br/>
内联支持宽高<br/>
默认内容撑开宽度<br/>
标签之间的换行间隙被解析




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


## 九宫格布局

> 利用float布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        ul{
            width: 360px;
        }
        li{
            float: left;
            width: 100px;
            height: 100px;
            margin: 10px;
            background: yellow;
            list-style: none;
            text-align: center;
            line-height: 100px;
        }
    </style>
    <script type="text/javascript"></script>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>
</body>
</html>
```

> 利用flex布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        ul{
            width: 360px;
            display: flex;
            flex-wrap: wrap;
        }
        li{
            width: 100px;
            height: 100px;
            margin: 10px;
            background: yellow;
            list-style: none;
            text-align: center;
            line-height: 100px;
        }
    </style>
    <script type="text/javascript"></script>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>
</body>
</html>
```


```html
<style type="text/css">
    li{
        list-style: none;
    }
    .grid{
        display: flex;
        flex-wrap: wrap;
        width: 300px;
    }
    .grid li{
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border: 4px solid #ccc;
        box-sizing: border-box;
        margin-left: -4px;
        margin-top: -4px;
    }
    .grid li:nth-child(3n+1){
        margin-left: 0;
    }
    .grid li:nth-child(1){
        margin-top: 0;
    }
    .grid li:nth-child(2){
        margin-top: 0;
    }
    .grid li:nth-child(3){
        margin-top: 0;
    }
    .grid li:hover{
        border-color: red;
        z-index: 2;
    }
</style>
<body>
    <ul class="grid">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>
</body>
```


> 利用inline-block布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        ul{
            width: 360px;
            font-size: 0;
        }
        li{
            width: 100px;
            height: 100px;
            margin: 10px;
            background: yellow;
            list-style: none;
            text-align: center;
            line-height: 100px;
            font-size: 16px;
            display: inline-block;
        }
    </style>
    <script type="text/javascript"></script>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>
</body>
</html>
```

> 利用表格布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .container{
            display: table;
        }
        .table-row{
            display: table-row;
        }
        .block{
            width: 100px;
            height: 100px;
            background: yellow;
            list-style: none;
            text-align: center;
            line-height: 100px;
            display: table-cell;
        }
    </style>
    <script type="text/javascript"></script>
</head>

<body>
    <div class="container">
        <div class="table-row">
            <div class="block">1</div>
            <div class="block">2</div>
            <div class="block">3</div>
        </div>
        <div class="table-row">
            <div class="block">4</div>
            <div class="block">5</div>
            <div class="block">6</div>
        </div>
        <div class="table-row">
            <div class="block">7</div>
            <div class="block">8</div>
            <div class="block">9</div>
        </div>
    </div>
</body>
</html>
```
