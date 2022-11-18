---
title: CSS
titleTemplate: 学习笔记
outline: 'deep'
---

[toc]

# CSS


## 选择器

选择器的作用是用于匹配HTML元素


### 分类和权重


| 分类 | 示例 |
| ---- | ----- |
| 元素选择器 | `a{}` |
| 伪元素选择器 | `::before{}` |
| 类选择器 | `.test{}` |
| 属性选择器 | `[type=radio]{}` |
| 伪类选择器 | `:hover{}` |
| ID选择器 | `#id{}` |
| 组合选择器 | `[type=checkbox]+label{}` |
| 否定选择器 | `:not(.test){}` |
| 通用选择器 | `*{}` |

:::tip
伪元素是双冒号，伪类是单冒号<br/>
伪元素是一种真实存在的元素，在页面中可以有内容，可以有样式的。<br/>
伪类是一种状态下的样式，比如hover伪类，它的意思是鼠标指向一个元素的时候，这样一种状态下的样式。
:::

| 权重 | 权重值 |
| ---- |  ----- |
| ID选择器 |  100 |
| 类选择器，属性选择器，伪类选择器 | 10 |
| 元素选择器，伪元素选择器| 1 |
| 其它选择器 | 0 |



### 属性选择器

```html
// p标签的attr属性等于test
<style type="text/css">
    p[attr=test]{
        background:yellow;
    }
</style>

<body>
    <p attr="test"></p>
</body>
```

```html
// p标签中attr属性中包含test
<style type="text/css">
    p[attr~=test]{
        background:yellow;
    }
</style>

<body>
    <p attr="test bg"></p>
</body>
```

```html
// p标签中attr属性以t开头
<style type="text/css">
    p[attr^=t]{
        background:yellow;
    }
</style>
<body>
    <p attr="test"></p>
</body>
```

```html
// p标签中attr属性以t结尾
<style type="text/css">
    p[attr$=t]{
        background:yellow;
    }
</style>

<body>
    <p attr="test"></p>
</body>
```

```html
// p标签中attr属性只要包含t就可以
<style type="text/css">
    p[attr*=t]{
        background:yellow;
    } 
</style>

<body>
    <p attr="test"></p>
</body>
```

```html
// p标签中attr属性以test开头
// 注意该值必须是整个单词
<style type="text/css">
    p[attr|=test]{
        background:yellow;
    }  
</style>

<body>
    <p attr="test"></p>
    <p attr="test-bg"></p>
</body> 
```

### 伪类选择器

| 伪类选择器 |
| ------ |
| :nth-last-child() |
| :nth-of-type() |
| :nth-last-of-type() |
| :only-of-type |
| :only-child |


```html
// 第一个子节点是p的元素
<style type="text/css">
    div p:nth-child(1){
        background:red;
    }
</style>

<body>
    <div>
        <p></p>
    </div>
</body>
```

```html
<style type="text/css">
    // 下标是奇数的子元素
    p:nth-child(odd){
        background:blue;
    }
    // 下标是偶数的子元素
    p:nth-child(even){
        background:yellow;
    }
</style>

<body>
    <p>odd</p>
    <p>even</p>
    <p>odd</p>
    <p>even</p>
</body>
```



```html
<style type="text/css">
    input{
        width:100px;
        height:30px;
        color:#000;
    }
    
    /*input启用时,颜色为red*/
    input:enabled{
        color:red;
    }
    
    /*input禁用时,颜色为blue*/
    input:disabled{
        color:blue;
    }
</style>

<body>
    <input type="text" value="请输入" disabled>
</body>
```


```html
<style type="text/css">
    // input被选中时的样式
    input:checked{
        width:30px;
        height:30px;
    }
</style>

<body>
    <input type="checkbox" />
    <input type="radio" />
</body>
```


```html
<style type="text/css">
    /*p标签之后的所有h1标签的样式*/
    p~h1{
        background:red;
    }
</style>

<body>
    <h1>h1</h1>
    <p>p</p>
    <h1>h1</h1>
    <h1>h1</h1>
</body>
```

```html
<style type="text/css">
    /*段落的第一个字符的样式*/
    p:first-letter{
        font-size:30px;
    }
    /*段落的首行的样式*/
    p:first-line{
        background:red;
    }
    /*选中时的样式*/
    p::selection{
        color:yellow;
        background:blue;
    }
</style>

<body>
    <p>测试测试</p>
</body>
```

```html
<style type="text/css">
    // h6标签class不是special的样式
    h6:not(.special){
        background:blue;
    }
</style>

<body>
	<h6>h6</h6>
	<h6 class="special">h6</h6>
	<h6>h6</h6>
</body> 
```


### 解析方式和性能

浏览器解析CSS选择器的方式是从右往左解析的

```css
/*浏览器会先去找.test,找到后再去看有没有一个祖先是div，再去看有没有一个祖先是body*/
body div .test{
    color: red;
}
```

## 盒模型

`CSS`盒模型包含`margin`,`border`,`padding`,`content`<br/>
盒模型大小 = `border` + `padding` + `width/height`<br/>
标准盒模型与`IE`盒模型的区别是计算的宽度和高度不同

| 盒模型分类 |  描述  | 设置 |
| ------ | ---- | ----- |
| 标准盒模型 |  宽度和高度指的是`content` |  `box-sizing: content-box;`  |
| `IE`盒模型 | 宽度和高度指的是`content+padding+border` | 	`box-sizing: border-box;` |


## float

::: tip
定义：
使元素脱离文档流,按照指定方向发生移动,遇到父级边界或者相邻的浮动元素停了下来
:::

块在一排显示<br/>
内联支持宽高<br/> 
默认内容撑开宽度<br/> 
脱离文档流<br/> 
提升层级半层 



## position

### `position-relative`的特性

不影响元素本身的特性<br/>
不使元素脱离文档流,元素移动之后原始位置会被保留（不会因为偏移而改变布局的计算）<br/>
如果没有定位偏移量,对元素本身没有任何影响<br/>
提升层级


### `position-absolute`的特性

使元素完全脱离文档流<br/> 
使内联支持宽高<br/>
块属性标签内容撑开宽度<br/>
如果有定位父级相对于定位父级发生偏移,没有定位父级相对于`document`发生偏移<br/>
相对定位一般都是配合绝对定位元素使用<br/>
提升层级

## 布局

### table表格布局

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
        .left{
            background: red;
            width: 200px;
        }
        .right{
            background: blue;
        }
        table{
            width: 800px;
            height: 200px;
            border-collapse: collapse;
        }
    </style>
    <script type="text/javascript"></script>
</head>
<body>
    <table>
        <tr>
            <td class="left">左</td>
            <td class="right">右</td>
        </tr>
    </table>
</body>
</html>
```


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
        .left{
            background: red;
            width: 200px;
        }
        .right{
            background: blue;
        }
        .table{
            display: table;
            width: 800px;
            height: 200px;
        }
        .table-row{
            display: table-row;
        }
        .table-cell{
            display: table-cell;
            vertical-align: middle;
        }
    </style>
    <script type="text/javascript"></script>
</head>
<body>
    <div class="table">
        <div class="table-row">
            <div class="left table-cell">
                左
            </div>
            <div class="right table-cell">
                右
            </div>
        </div>
    </div>
</body>
</html>
```

### float浮动 + margin

### inline-block布局

### flexbox布局


#### 旧版弹性盒模型


`display: box`<br/>
`display: inline-box`

| 主轴设置 | 描述 | 值 | 备注|
| ------ | ----- | ----- | --- |
| box-orient | 主轴方向 | horizontal(横向)<br/>vertical(垂直) |
| box-direction | 主轴排列顺序 | reverse(反序)<br/>normal(正序) | reverse会顶着左侧,新版会顶着右侧|
| box-pack | 主轴方向富裕空间 | start <br/> end <br/> center <br/> justify |
| box-align | 侧轴方向富裕空间 | start <br/> end <br/> center  |


| 子级样式 | 描述| 备注|
| --- | --- | ---- |
| box-flex |盒子的弹性空间 | 子元素的尺寸=盒子的尺寸*子元素的box-flex属性值/所有子元素的box-flex属性值的和 |
| box-ordinal-group | 元素的具体位置设置 | 数值越小越靠前,最小值默认处理为1|



## 自定义字体


```html
<head>
<style type="text/css">
.custom-font{
    font-family: IF;
}
@font-face{
    font-family: "IF";
    src: url("./IndieFlower.ttf");
}
</style>
</head>

<body>
    <p class="custom-font">自定义字体</p>
</body>
```


## 响应式

### 媒体类型

| 类型| 描述 |
| --- | --- |
|  all   | 所有媒体 |
| tv | 电视 |
| screen | 彩屏设备 |

```css
@media tv {}
```

### 关键字

> only


```css
// 仅在彩屏设备下识别
@media only screen{}
```

> and

```css
// 连接媒体类型和媒体特性的
// 当屏幕宽度大于等于500的时候识别
@media all and (min-width:500px) {}
```

> not

```css
// 排除掉某种特殊的媒体类型
@media not tv {}
```


### 媒体特性

| 特性 |描述 |
| --- | ---- |
| min-width |  当屏幕大小大于等于某个值的时候识别 | 
| max-width | 当屏幕大小小于等于某个值的时候识别  | 
| orientation:portrait | 屏幕垂直 |
| orientation:landscape | 屏幕水平 |





    
## 移动端视口设置 

```html
<meta name="viewport" content="width=device-width,user-scalable=no">
```

| 属性 |  描述 | 选项 |
| ---- | ---- | --- |
| width | 可视区的宽度 |  `number` 或 `device-width`|
|   user-scalable   |  是否允许用户缩放 | `yes` 或 `no`  |
| initial-scale | 初始比例,一定要和最小缩放比例保持一致 | |
| minimum-scale | 最小缩放比例 | |
| maximum-scale | 最大缩放比例 | |
| devicePixelRatio | 像素比(只能获取,不能设置)<br/>它把一个像素,放大至N个像素去显示| |



##  移动端的`rem`适配

```js
(function(){
    var html = document.documentElement
    var hWidth = html.getBoundingClientRect().width
    html.style.fontSize = hWidth / 16 + 'px'
})()
```
