---
title: 性能优化
titleTemplate: 面试总结
outline: 'deep'
---

[toc]


# 性能优化


## 浏览器渲染


| 浏览器渲染页面的过程 |
| ---------------- |
| 根据`HTML`结构生成`DOM Tree` |
| 根据`CSS`生成`CSSOM Tree`   |
| 将`DOM Tree`和`CSSOM Tree`整合形成`RenderTree`  |
| 根据`RenderTree`和`Layout`开始渲染和展示    |
| `Layout`是用来计算每一个`DOM`的位置（例如宽，高） |
| 遇到`<script>`时，会执行并阻塞渲染 |


### 浏览器渲染流程（关键渲染路径）

```
    st=>start: JavaScript（我们可以通过JavaScript去实现我们页面上的视觉的一些变化，主要意思是触发视觉变化）
    op1=>operation: Style（有了上一步的视觉变化，浏览器要重新对样式进行计算 ）
    op2=>operation: Layout（把元素按照计算后的样式，绘制到页面上，它要知道元素的大小和元素的位置）
    op3=>operation: Paint（真正的把元素画到页面上）
    op4=>operation: Composite（把不同的层，组合起来，最后合成到一起，显示给用户）
    
    st->op1->op2->op3->op4
```

::: tip
`requestAnimationFrame`是在`Layout`和`Paint`之前触发
:::


::: details 不触发Layout
`Layout`关心的是位置和大小，所以样式修改如果不是`宽度`，`高度`这样的位置信息的话，它就不会触发我们的`Layout`，比如修改背景颜色，阴影大小等就不会触发`Layout`
:::

::: details 不触发Layout也不触发Repaint
| 不触发`Layout`和`Repaint`的属性 |
| ---- |
| `transform` |
| `opacity`   |


上述两个属性虽然可以只影响我们`Composite`的过程，但是要把属性所影响到的元素提取到一个单独的`图层`里<br/>
设置元素CSS属性`will-change:transform`，浏览器就会将这个元素提取到一个单独的`图层`里
:::



### Reflow


首次页面加载完之后，把元素绘制到页面上的过程，我们叫`Layout`<br/>
之后页面上发生了一些视觉上的变化导致再次`Layout`，这个过程称之为回流，也就是`Reflow`


|  触发Reflow |
| ------- |
| 当你增加,删除,修改`DOM`结点时,会导致`Reflow`或`Repaint`（一般情况下导致了`Reflow`基本上会`Repaint`） |
| 当你移动`DOM`的位置，或是搞个动画的时候 |
| 当你修改`CSS`样式的时候 |
| 当你`Resize`窗口的时候，或是滚动的时候 |
| 当你修改网页的默认字体时 |


::: details layout thrashing（布局抖动）
当你出现`Reflow`的时候，还有可能导致`布局抖动`<br/>
`布局抖动`产生的原因是因为有连续的读写，而且每一次我们的读操作，都会强制我们的`布局`立即进行一个重新的计算，这样就会导致有连续不断的`强制回流`发生，连续不断的`强制回流`就会导致我们页面的一个`布局抖动`，结果就是我们的页面变的非常的卡顿

| 避免`layout thrashing` |
| ------- |
| 避免回流 | 
| 读写分离 |


```js
let cards = document.getElementsByClassName( 'cards' )

const update = ( timestamp ) => {
    for ( let i = 0; i < cards.length; i++ ) {
        cards[i].style.width = ( ( Math.sin( cards[i].offsetTop + timestamp / 1000 ) + 1 ) * 500 ) + 'px'
    }
    window.requestAnimationFrame( update )
}
window.addEventListener( 'load', update )
```
:::



### Repaint


页面要呈现的内容统统画在屏幕上,就是`Repaint`（重绘）


| 触发Repaint |
| ---- |
| `DOM`改动 | 
| `CSS`改动 |




## 性能优化工具

| 工具 |
| ---- |
| `WebPageTest` |
| `LightHouse` |
| `devTools` |




## 性能指标

| 指标 | 描述 | 影响因素 |
| ---- | ---- | ----- |
| `TTFB`尽量小 | `TTFB`表示请求发出到请求回来到底要经历多久 | 后台处理能力<br/>网络的情况|
| `Speed Index` | `Speed Index`（速度指数）的标准是`4s`| |
| 页面加载时间尽量小 | | |
| 首次渲染时间尽量小 | | |
| 交互响应足够快 | | |
| 画面足够流畅 | `1秒`不低于`60帧` |  |
| 异步请求足够快 | 所有的异步请求能在`1s`內把数据返回回来 | |



## RAIL测量模型

### Response

`R`代表`Response`响应<br/>
处理事件应在`50ms`以內完成

### Animation

`A`代表`Animation`动画<br/>
每`10ms`产生一帧

### Idle

`I`代表`Idle`空闲<br/>
尽可能增加空闲时间


### Load


`L`代表`Load`加载<br/>
在`5s`內完成内容加载并可以交互



## 优化


### 代码优化


::: details JAVASCRIPT开销
分析：<br/>
`JAVASCRIPT`的开销在于`加载`，`执行`，`解析&编译`<br/>
解决方案：<br/>
`Code splitting`代码拆分，按需加载<br/>
`Tree shaking`代码减重

| 从`解析`和`执行`来看 |
| -------- |
| 避免长任务 |
| 避免超过`1KB`的行间脚本 |
| 使用`requestAnimationFrame`和`requestIdleCallback`进行时间调度 |
:::


::: details V8编译原理
`V8`拿到`JS脚本`之后首先会进行`解析`的工作，把它翻译成`抽象语法树`。它先把文本识别成字符，然后在把里面重要的信息提取出来变成一些`节点`，然后存储在一定的数据结构里。接下来利用这个数据结构在去理解写的东西是什么含义，理解这个是什么含义就是`解释器（Interpreter）`做的事情。然后在把代码变成机器码运行之前，编译器会进行一些优化工作，所以`V8`的编译器有优化功能。
```
start=>start: JS
op1=>operation: Parse it
op2=>operation: Abstract Syntax Tree
op3=>operation: Interpreter
op4=>operation: Optimising Compiler 
op5=>operation: Machine Code 
op6=>operation: Bytecode


start->op1->op2->op3->op4->op5->op6
```
逆优化<br/>
有时编译器的优化工作做的不一定合适，所以在运行时的时候当它发现它所做的优化不合适的时候，它会发生一个`逆优化`的过程，如果发生`逆优化`的情况，反而会降低我们运行的效率。
```js
const { performance, PerformanceObserver } = require('perf_hooks');

const add = ( a, b ) => a + b;

const num1 = 1;
const num2 = 2;

performance.mark( 'start' );

for ( let i = 0; i < 10000000; i++ ) {
    add( num1, num2 )
}

// 发生了逆优化
add( num1, 's' )

for ( let i = 0; i < 10000000; i++ ) {
    add( num1, num2 )
}

performance.mark( 'end' );

const observer = new PerformanceObserver( ( list ) => {
    console.log( list.getEntries()[0] )
});
observer.observe( { entryTypes: [ 'measure' ] } );

performance.measure( '测量1', 'start', 'end' );

```
::: 


::: details 函数优化
像`V8`这样的`JS引擎`它会对函数默认进行一个`懒解析`，也就是说当我们这个函数真正被调用的时候，它才会去解析我们这个函数的声明的一个函数体。<br/>
`懒解析`的好处在于如果它不需要被解析的话，我们也不需要为它去创建一个语法树。在堆的内存空间上也不用为这个函数去进行一个内存分配。<br/>
如果函数是`立即执行`的，在刚开始声明的时候我们对它是默认进行了一个`懒解析`，但是我们又发现它要`立即执行`，于是又进行了一个快速的`eager parsing（饥饿解析）`，这样导致的结果就是对同一个函数先进行`懒解析`在进行`饥饿解析`，导致效率反而降低了。
```js
export default () => {
    // 通过一对括号,就可以进行eager parsing（饥饿解析）
    const add = ( ( a, b ) => a + b );
    const num1 = 1 
    const num2 = 2
    add( num1, num2 )
}
```
:::


::: details 对象优化 
`以相同顺序初始化对象成员，避免隐藏类的调整`<br/>
```js
class RectArea {      // HC0
    constructor (l,w) {
        this.l = l    // HC1
        this.w = w    // HC2
    }
}

const rectOne = new RectArea(3, 4)
const rectTwo = new RectArea(5, 6)
```

<br/>

```js
// 反例

const car1 = { color: 'red' }   // HC0
car1.seats = 4                  // HC1（不是只包含了seats属性，它其实是包含了color和seats两个属性）

const car2 = { seats: 2 }       // HC2
car2.color = 'blue'             // HC3
```
`JS`是弱类型语言，我们在写的时候不会去强调或者声明它的类型，但对于`编译器`而言最终还是要明确一个类型。它就会在解析的时候根据自己的推断会给赋一个具体的类型。我们管这些类型叫做`隐藏类型`。在之后它所做的一些优化都是基于`隐藏类型`去做的。<br/>
<br/>
`实例化后避免添加新属性`
```js
const car1 = { color: 'red' };    // In-object属性
car1.seats = 4;                   // Normal/Fast属性
```
`In-object`属性是这个对象从开始创建就带有的属性<br/>
`Normal/Fast`属性是存储在`property store`里，需要通过`描述数组`间接查找<br/>
<br/>
`尽量使用Array代替array-like对象`
```js
// 不如在真实数组上效率高
Array.prototype.forEach.call( arrayLike, ( value, index ) => {
    console.log( `${index}:${value}` )
})
```

<br/>

```js
// 最好还是先把这种`类数组`转成`数组`然后在去进行遍历
const arr = Array.prototype.slice.call( arrayLike, 0 );

arr.forEach( ( value, index ) => {
    console.log( `${index}:${value}` )
} )
```

`避免读取超过数组的长度`
```js
// 首先会造成undefined和数字进行比较，并且还会让array[3]沿原型链进行查找
function foo ( array ) {
    for ( let i = 0; i <= array.length; i++ ) { // 越界比较
        if ( array[i] > 1000 ) {
            console.log( array[i] )
        }
    }
}

const arr = [ 10, 100, 1000 ];

foo( arr );
```

`避免元素类型转换`
```js
// 原先类型是PACKED_SMI_ELEMENTS，加入4.4之后类型变成了PACKED_DOUBLE_ELEMENTS
const array = [ 3, 2, 1 ];    // PACKED_SMI_ELEMENTS
array.push(4.4)               // PACKED_DOUBLE_ELEMENTS
```
:::

::: details HTML优化
| HTML优化 |
| ---- |
| 减少`iframes`使用 |
| 压缩空白符 |
| 避免节点深层级嵌套 |
| 避免`table布局` |
| 删除注释 |
| `CSS`&`Javascript`尽量外链 |
| 删除元素默认属性 |
:::

:::details CSS优化
| CSS优化 |
| ----- |
| 降低`CSS`对渲染的阻塞 |
|  利用`GPU`进行完成动画 |
| 使用`contain`属性  |
| 使用`font-display`属性 |
:::


### 资源优化

::: details 资源的加载顺序
`preload`<br/>
preload只管加载不管解析
```html
<link rel="preload" href="img/product.svg" as="image"> // 优先加载图片

// 当优先加载字体时必须要设置crossorigin属性
<link rel="preload" href="https://fonts.gstatic.com/font.woff2" as="font" type="font/woff2" crossorigin="anonymous">   // 优先加载字体
```
`prefetch`<br/>
prefetch关注的是后续可能会用到的资源，在页面有空闲的时候加载后面需要用到的资源<br/>
```html
<link rel="prefetch" as="style" href="product-font.css">
```
:::


::: details 资源的压缩与合并
减少`HTTP`请求数量<br/>
减少请求资源的大小<br/>
:::

::: details 图片优化
| 格式 | 优点 | 缺点 |
| ---- | ---- | ---- |
| `JPEG/JPG` | 压缩比很高但是色彩保存的还很好 |  由于压缩比比较高，如果图片比较强调纹理或者边缘，它会显得非常有锯齿感或者模糊 |
| `PNG` |  可以做透明背景的图片<br>如果我们想强调一些线条，纹理，边缘的细腻程度的时候，`PNG`做的比较好  |    体积会相对较大一些  |
| `WebP` |  跟`PNG`有同样的质量，压缩比比`PNG`还高  |  浏览器兼容性不好  |

加载优化<br/>
| 方案 | 说明 |
| ---- | ---- |
|  图片懒加载  | `<img src="" loading="lazy">` |
| 渐进式图片 | 优点是始终可以让用户看到图片的全貌，只不过刚开始不太清晰逐渐给它加载清楚<br>等待时间是跟图片的大小和质量有关 |
| 响应式图片 |  `<img src="lighthouse-200.jpg" sizes="50vw" srcset="lighthouse-100.jpg 100w,lighthouse-200.jpg 200w,lighthouse-1800.jpg 1800w">` |
:::

::: details 字体优化
| 字体的两个问题 |  描述 |
| ------ | ----- |
| `FOIT`(Flash Of Invisible Text)  | 文字从看不到到看到，这样一个闪烁变化的过程 |
| `FOUT`(Flash Of Unstyled Text) | 文字开始看上去是一种样式，后来经过我们的样式渲染之后，又变成了另外一种字体，这个之间会有一个变化和闪动的过程 |

| `font-display`的值 | 描述 |
| ------ | -------- |
| auto | 让浏览器自动做选择 |
| block | `3s`之前如果还没下载完则先不显示，`3s`之后如果字体下载完了就可以去展示了，如果`3s`之后还没下载完那就先用一个默认的字体临时去显示，直到下载完了在换成你的字体 |
| swap | 开始先用一个默认的字体进行展示，直到需要的字体下载完成，在给替换成你的字体 |
| fallback | `100ms`之前如果还没下载完则先不显示，`100ms`之后如果字体下载完了就可以去展示了，如果`100ms`之后还没下载完那就先用一个默认的字体临时去显示，直到下载完了在换成你的字体  |
| optional | 浏览器可以判断用户的网络的一个速度情况，如果判断速度比较好，就用下载完的字体，如果判断网络情况不佳，预期短时间内很难把字体下载下来，那就用一个默认的字体，但是有一个问题是，一旦浏览器做出了选择，就不会在进行字体的替换了 |
:::


### 传输加载优化


 | 方法 | 描述 |
 | --- |  --- |
 | `Gzip`压缩 |  |
 | 启用`Keep Alive` |  |
 | `HTTP`缓存 | |
 | `Service Workers` |    延长了首屏时间，但页面总加载时间减少<br>只能在`localhost`或`https`下使用 |
 | `HTTP2` | |
 | 服务端渲染`SSR` | 加速首屏加载<br/>更好的`SEO` |



#### HTTP缓存

| 缓存的分类 |
| ------ |
| 强缓存 |
| 协商缓存 |


##### `Expires`

`Expires`的值表示的是绝对时间<br/>
`Expires: Thu,21 Jan 2017 23:39:02 GMT`

#####   `Cache-Control`


`Cache-Control: max-age=3600`<br/>
`max-age`的值表示的是相对时间，也就是说我在拿到资源之后，在3600秒之内，不会再去请求服务器了



| 可缓存性 | 含义 |
| ----- |  ----- |
| `public` | `HTTP`请求返回的内容所经过的任何路径当中都可以对返回内容的一个缓存的操作 |
| `private` | 只有发起请求的浏览器才能缓存 |
| `no-cache` | 可以缓存但需要服务器验证才可以使用 |


| 到期 |  生效位置及含义 | 备注 |
| ---- | ---- | ---- |
| `max-age=<seconds>` |  浏览器端 | |
| `s-maxage=<seconds>` | 只有在代理服务器中才会生效 | |
| `max-stale=<seconds>` |  在`max-age=<seconds>`过期之后，只要在`max-stale`这个时间内，它还可以使用过期的缓存，不需要到原服务器去请求新的内容 | 请求方主动带的一个头 |


| 重新验证 | 含义 |
| --- | ---- |
| `must-revalidate`  | 在已经设置了`max-age=<seconds>`的缓存当中，如果已经过期了，那我们必须去原服务端去发送这个请求，然后重新获取这份数据，而不能直接使用本地的缓存|
| `proxy-revalidate`  | 用于缓存服务器中的，指定缓存服务器中必须在过期的时候，它必须要去原服务器上重新请求一遍，不能直接使用本地的缓存|

| 其他 | 含义 |
| --- | ---- |
| `no-store` | 任何地方都不可以缓存 |
| `no-transform` | 告诉代理服务器不要随便改动我返回的内容 |


```js
const http = require('http')
    
http.createServer(function (request, response) {
    if (request.url === '/script.js') {
        response.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=20'
        })
        response.end('script loaded')
    }
}).listen(8888)
```


##### `Last-Modified`和`If-Modified-Since`


它通过对比上次修改时间以验证资源是否需要更新，在拿到资源文件的时候服务器会通过`Last-Modified`下发一个时间，在下次请求时会在请求头中加`If-Modified-Since`



##### `Etag`和`If-None-Match`


它通过对比资源的签名判断是否使用缓存，服务器下发资源的时候，会给你`Etag`值（资源对内容会产生唯一的一个签名，我们叫它数据签名），在下次请求时会在请求头中加`If-None-Match`



## 提升页面性能的方法有哪些


| 方法 |
| ----- |
| 资源压缩合并，减少`HTTP`请求   | 
| 非核心代码异步加载 |
| 使用`CDN` |
| 预解析`DNS` |


::: details 非核心代码异步加载
| 异步加载的方式 | 描述 |
| ------ | ----- |
| 动态脚本加载 | 创建个`script`标签，把标签加到`body`上面去 |
| `defer` | 在`HTML`解析完之后才会执行，如果是多个，按照加载的顺序依次执行 |
| `async` | 在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关 |


```html
<script src="" defer></script>
<script src="" async></script>
```
:::


::: details 预解析DNS
```html
<link rel="dns-prefetch" href="www.baidu.com"/>
```

<br/>

```html
// 强制打开a标签的DNS预解析，默认a标签的DNS预解析开启，例如HTTP协议中
// HTTPS中有些浏览器会关闭a标签的DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on">
```
:::


## 渲染优化

| 方法 |
| ---- |
| `CSS`放前面，`JS`放后面 |
| 懒加载(图片懒加载，下拉加载更多) | 
| 减少DOM查询，对DOM查询做缓存 |
| 减少DOM操作,多个操作尽量合并在一起执行 |
| 事件节流 |
| 尽早执行操作(如`DOMContentLoaded`) |



::: details 懒加载(图片懒加载，下拉加载更多)
```js
<script>
    var img = document.getElementById("img")
    img.src = img.getAttribute("data-realsrc")
</script>
<body>
    <img id="img" src="preview.png" data-realsrc="abc.png"/>
</body>
```
:::

::: details 减少DOM查询，对DOM查询做缓存
```js
// 未缓存DOM查询
var i
for( i = 0; i < document.getElementsByTagName('p').length; i++ ){}

// 缓存了DOM查询
var pList = document.getElementsByTagName('p')
var i
for( i = 0; i < pList.length; i++ ){}
```
:::

::: details 减少DOM操作,多个操作尽量合并在一起执行
```js
<script>
    var listNode = document.getElementById('list')
    var frag = document.createDocumentFragment()
    var li
    for(var x = 0; x < 10; x++){
        li = document.createElement("li")
        li.innerHTML = "List item" + x
        frag.appendChild(li)
    }
    listNode.appendChild(frag)
</script>

<body>
    <ul id="list"></ul>
</body>
```
::: 



## 什么是首屏加载？怎么优化？

| 测量指标 | 含义 | 范围 |  备注 |
|  ------ | ---- | ---- |  ---- |
| `First Contentful Paint` | 有意义内容的绘制 | 控制在`2s`以内 | 当出现了第一个内容之后它就知道这个网站是可以访问的 |
| `Largest Contentful Paint` | 最大内容的绘制 | 控制在`2.5s`以内 | 我们看到它绘制的第一个最大内容，无论是图片或者是很大一块文字内容之后，我们就知道这个网站到底是做什么的了 |
| `Time to Interactive` | 用户可以开始进行交互了，你的页面全部加载完成了 | 控制在`3.8s`以内 | |



## 从输入URL到页面加载显示完成都发生了什么？


浏览器有一个`UI thread`，它会做一个判断看输入的内容到底是`搜索`还是你真正要访问的一个站点，如果访问的是一个`URL`,它会对你输入的`URL`去进行一个相关的解析，接下来`UI thread`会通知`Network thread`


`Network thread`首先会进行`DNS`查找，要去确认域名对应的那个`IP`，然后才能和服务器建立连接。在请求发起之前，需要设置`UA`等信息。服务器收到请求后，根据处理逻辑将数据组织成`Response`返回到前端，在返回到浏览器这边的时候，它在读取到`Response`前几个字节的时候会做一个分析，分析我们这个数据的类型，然后根据判断到的类型在去进行相关的解析。接下来还会做一个安全检查去判断一下，你访问的这个域名是不是安全的。然后会通知`UI thread`数据准备就绪。

当数据准备好并且`Renderer Process`也准备好了之后，会有一个进程间的通信，并且会把数据传递给我们的`Renderer Process`。`Main thread`开始进行文本的解析，构建`DOM`，在构建`DOM`的过程中会遇到引用外部资源的情况，它会去进行加载。在遇到`JS`脚本的时候，会阻塞解析，可以使用`async`或者`defer`去进行一个异步的加载。`Main thread`还会去解析`CSS`，最终得到一个`computed styles`。`Main thread`遍历我们的`DOM`和`computed styles`构造了我们的布局树，这棵树决定了浏览器到底要画哪些东西，它描述了我们每一个元素最终具体要画成什么样子。接下来进入到了`Layout`部分，`Layout`是指查找我们元素几何形状的一个过程，并且会`创建绘制记录`。


接下来，`Main thread`会提交信息告诉`Compositor Thread`要绘制什么，然后`Compositor Thread`会绘制图层,但是图层可能非常大，就会切块分给`Raster Thread`去做。然后构建`图层树`，去把我们已经绘制出来的图层合成成一帧。

::: tip
`UI thread`和`Network thread`都是`Browser Process`中的<br/>
`Main thread`，`Raster Thread`和`Compositor Thread`都是`Renderer Process`中的<br/>
浏览器渲染的工作会交给`Renderer Process`
:::


::: details 页面加载过程 
| 加载资源的形式 |
| ----------  |
|     输入`URL`或跳转页面加载`HTML`      |
|  加载`HTML`中的静态资源 |

| 加载一个资源的过程 |
| ------------- |
| 浏览器根据`DNS`服务器得到域名的`IP`地址 |
| 向这个`IP`的机器发送`HTTP`请求 |
| 服务器收到，处理，并返回`HTTP`请求 |
| 浏览器得到返回内容 |
:::




