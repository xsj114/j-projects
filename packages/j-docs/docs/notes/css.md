[toc]

# CSS


## 属性选择器

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

## 伪类选择器

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


## 弹性盒模型

### 旧版弹性盒模型


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
