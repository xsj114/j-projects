---
title: JAVASCRIPT
titleTemplate: 面试总结
outline: 'deep'
---

[toc]

# JAVASCRIPT

## 说一下对变量提升的理解

```js
// 变量声明,函数声明（注意和函数表达式的区别）
// 执行上下文
console.log(a)  //undefined
var a = 100;


fn( 'zh' )  
function fn ( name ) {
    age = 20
    console.log(name, age)  //'zh' 20
    var age
}
```


## 如何理解作用域

自由变量（当前作用域没有定义的变量，即自由变量）<br/>
作用域链即自由变量的查找<br/>
没有块级作用域只有函数和全局作用域

## JS数据类型

| 数据类型 |
|  ----  |
| `Boolean` |
| `Null` |
| `Undefined`  |
| `Number` |
| `String` |
| `Symbol` |
| `Object` |


## JS中使用`typeof`能得到的类型

| 类型 |
| ---- |
| `undefined` |
| `string`  |
|  `number` |
| `boolean` |
| `object` |
| `function` |
| `symbol` |

## JS显式类型转换和隐式类型转换

| 显式类型转换 | 隐式类型转换 | 
| --- |      ----- |
| `Number()` |    四则运算`+-*/`   |
| `String()` |   `if`判断语句 |
| `Boolean()` |  `console.log()` |

::: tip
使用`+,-`号的时候，如果前面没有数据，后面跟着字符串，那么会转为数字类型，转不出来就是`NAN`
:::


## JS按存储方式区分变量类型

```js
// 值类型
var a = 10;
var b = a;
a = 11;
console.log(b)  // 10
```

```js
// 引用类型
var obj1 = { x: 100 }
var obj2 = obj1
obj1.x = 200
console.log(obj2.x)   // 200
```



## 何时使用`===`和`==`

```js
obj.a == null
// 相当于
obj.a === null || obj.a === undefined
```

## 创建对象的几种方法

```js
// 第一种
var obj = {name:'zh'}
var obj = new Object({name:'zh'})

// 第二种
var M = function () { this.name = 'zh' }
var m = new M()

// 第三种
// obj的原型对象是P
var P = {name: 'zh'}
var obj = Object.create(P)

```

## 对象属性的特征

::: tip
要修改对象属性的默认特性，必须使用`Object.defineProperty()`
:::

| 数据属性 | 描述 |
| ------ | ---- |
| `Configurable` | 能否重新定义属性或用`delete`删除属性 |
| `Enumerable` | 能否通过`for-in`循环返回属性 |
| `Writable` | 能否修改属性的值 |
| `Value`  |这个属性的数据值，默认值为`undefined` |

::: tip
访问器属性不能直接定义，必须使用`Object.defineProperty()`来定义
:::

| 访问器属性 | 描述 |
| ---- | ----- |
| `Configurable` | 能否重新定义属性或用`delete`删除属性 |
| `Enumerable` | 能否通过`for-in`循环返回属性 |
| `Get` | 读取属性时调用的函数，默认值为`undefined` |
| `Set` | 写入属性时调用的函数，默认值为`undefined` |



## 如何准确判断一个变量是数组类型

```js
const arr = [1,2,3]
console.log(arr instanceof Array) // true
```


## `instanceof`的原理

判断实例对象的`__proto__`属性和构造函数的`prototype`属性是不是同一个引用


## 描述`new`一个对象的过程

创建一个新对象<br/>
将构造函数的作用域赋值给新对象，因此`this`指向这个新对象<br/>
执行构造函数中的代码，即对`this`赋值<br/>
返回新对象


```js
function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function(){
	   console.log(this.name)
	 }
}
var person1 = new Person('Nicholas', 29, 'Software Engineer')
var person2 = new Person('Greg', 27, 'Doctor')

person1.constructor = Person  //true
person2.constructor = Person  //true
```


## 原型规则

所有的引用类型(数组，对象，函数)都具有对象特性，即可自由扩展属性（除了`null`以外）

所有的引用类型(数组，对象，函数)，都有一个`__proto__`属性，`__proto__`属性值指向它的构造函数的`prototype`属性值，当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`(即它的构造函数的`prototype`)中寻找

所有的函数，都有一个`prototype`属性，属性值也是一个普通的对象，这个对象就是原型对象，默认情况下，所有原型对象都会自动获得一个`constructor`属性，这个属性是一个指向`propotype`属性所在函数的指针

## 写一个原型链继承的例子

```js
function A(){}
function B(){}
B.prototype = new A()
```

## zepto或其他框架源码中如何使用原型链

```js
var div = new Elem( 'div' )
function Elem( id ){
    this.elem = document.getElementById( id )
}
Elem.prototype.html = function( val ) {
    var elem = this.elem
    if( val ) {
        elem.innerHTML = val
        return this     //链式操作
    } else {
        return elem.innerHTML
    }
}
Elem.prototype.on = function( type, fn ) {
    var elem = this.elem
    elem.addEventListenet( type, fn )
}
```


## 说明`this`几种不同的使用场景

作为构造函数执行<br/>
作为对象属性执行<br/>
作为普通函数执行<br/>
`call,apply,bind`


`this`对象是在运行时基于函数的执行环境绑定的<br/>
在全局函数中,`this`等于`window`<br/>
而当函数被作为某个对象的方法调用时,`this`等于那个对象<br/>
不过匿名函数的执行环境具有全局性,因此其`this`对象通常指向`window`


## `this`要在执行时才能确认,定义时无法确认

```js
var a = {
    name: 'A',
    fn: function () {
        console.log(this.name)
    }
}

a.fn()  // this === a
a.fn.call({name:'B'})  // this === {name:'B'}
var fn1 = a.fn
fn1()  // this === window
```

## JS中的内置函数

| 内置函数 |
| ----- |
| `Object`    |
| `Array` |
| `Boolean` |
| `Number` |
| `String`  |
| `Function` |
| `Date` |
| `RegExp` |
| `Error` |


## 定义函数的两种方式

```js
// 函数声明
function functionName (arg1, arg2) {}

// 函数表达式
var functionName = function (arg1, arg2) {}
```
::: tip
在匿名函数中定义的任何变量，都会在执行结束时被销毁
:::


## 有一个函数执行对象查找时,永远不会去查找原型,这个函数是?

`hasOwnProperty()`

## 实际开发中闭包的应用

闭包实际应用中主要用于封装变量，收敛权限<br/>
函数作为返回值<br/>
函数作为参数传递


## 闭包是指有权访问另一个函数作用域中的变量的函数

```js
function createComparisonFunction(propertyName){
	return function (obj1,obj2) {
		var valueOne = obj1[propertyName]
		var valueTwo = obj2[propertyName]
		if (valueOne < valueTwo) {
			return -1
		} else if(valueOne > valueTwo){
			return 1
		} else {
			return 0
		}
	}
}

var obj1 = {age: 20}
var obj2 = {age: 30}
console.log(createComparisonFunction('age')(obj1,obj2))
```

```js
// 闭包只能取得包含函数中任何变量的最后一个值
function createFunctions(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i]=function(){
			return i;
		}
	}
	return result;
}
console.log(createFunctions()[0]())  // 10
console.log(createFunctions()[1]())  // 10
console.log(createFunctions()[9]())  // 10
```


## DOM事件的级别

| 级别 | 示例 |
|  ---- | ----  |
| DOM0   | element.onclick = function(){} |
| DOM2 | element.addEventListener('click', function(){}, false) |
| DOM3 | element.addEventListener('keyup', function(){}, false) |

## DOM事件流

第一阶段是捕获阶段<br/>
第二阶段是目标阶段<br/>
第三阶段是冒泡阶段


## 描述DOM事件捕获的具体流程

`window`到`document`到`html`标签到`body`标签，然后一级一级往下传，最后到目标元素


## `DOM`节点的`attribute`和`property`有何区别
`property`只是一个`js`对象的属性的修改<br/>
`attribute`是对`html`标签属性的修改


## 前后端如何通信

| 方式  |  是否同源 |
| ---- | ---- |
| `Ajax` | 同源 |
| `WebSocket` | 不限制同源 |
| `CORS` | 支持同源或者不同源 |


## 什么是同源策略及限制

同源策略要求同域名,同端口,同协议

| 限制 |
| ---- |
|  `Cookie,LocalStorage,IndexDB`无法获取  |
| `DOM`无法获得 |
| `AJAX`请求不能发送 |


## 跨域通信的几种方式

|  方式 | 描述 |
| ---- | ---- |
| `JSONP`  | 通过`script`标签发送请求,服务端返回一个函数,定义一个全局的函数名称，然后运行函数得到数据 |
| `Hash` | |
| `postMessage` | |
| `WebSocket` | |
| `CORS` | |


可以跨域的三个标签`<script>,<img>,<link>`


## 同步和异步的区别是什么？分别举一个同步和异步的例子

同步会阻塞代码执行而异步不会<br/>
`alert`是同步<br/>
`setTimeout`是异步


## 前端使用异步的场景有哪些

定时任务: `setTimeout,setInterval`<br/>
网络请求: `ajax`请求，动态`<img />`加载<br/>
事件绑定


## 前端错误

| 分类 |
| --- |
| 及时运行错误(代码错误) |
| 资源加载错误 |

| 及时运行错误的捕获方式 |
| ----------- |
|  `try-catch` |
| `window.onerror` |

| 资源加载错误的捕获方式 |
| --------- |
| `img.onerror` |
| `Error`事件捕获|
| `performance.getEntries()` |



| 上报错误 |
| ----- |
| 采用`Ajax`通信的方式上报 |
| 采用`Image`对象上报 |


```js
//  Error事件捕获
window.addEventListener('error',function(e){},true)
```


## 跨域的JS运行错误可以捕获嘛？错误提示是什么？应该怎么处理？

只能拿到`script error`，拿不到行号和列号

处理分两步<br/>
在`script`标签增加`crossorigin`属性<br/>
设置资源响应头`Access-Control-Allow-Origin: *`


## 安全性

| XSS跨站请求攻击(跨域脚本攻击) | XSS预防|
| ----------------------- | ------------ |
| 在输入内容时，可以输入脚本(`<script>`),脚本中有攻击代码，获取基本信息，发送到自己的服务器上 |  替换关键字，例如替换`<`为`&lt;` `>`为`&gt;` |


| `CSRF`跨站请求伪造预防 |
| ------- |
| `Token`验证 |
| `Referer`验证 |
| 隐藏令牌 |


## 请描述一下`Cookie`，`sessionStorage`，`localStorage`的区别


| `Cookie`用于存储的缺点 |
| ------------ |
| 存储量太小，只有4kb |
| 所有`HTTP`请求都带着,会影响获取资源的效率 |
| API简单，需要封装才能用 |

| `sessionStorage，localStorage` |
| ----------- |
| `H5`中专门为存储而设计的 |
| 最大容量5M |
| API简单易用 |


## window.onload和DOMContentLoaded的区别

|window.onload |DOMContentLoaded|
| ----- | --- |
|  页面的全部资源加载完才会执行，包括图片，视频等 |  `DOM`渲染完即可执行，此时图片，视频还可能没有加载完 |


## JS是怎样管理内存的？

变量创建时自动分配内存，不使用时自动释放内存，这个过程叫做`垃圾回收`<br/>
变量通常可以分为两类，一类是`局部变量`，一类是`全局变量`

`局部变量`在函数执行完，没有闭包引用，就会被标记回收<br/>
`全局变量`直至浏览器卸载页面时释放

垃圾回收实现机制共有两种，一种是`引用计数`，一种是`标记清除`

`引用计数`是当创建变量之后，去看下有哪些对它进行了引用，当`引用计数`归0之后就可以对它进行相关的回收了。不过`引用计数`无法解决循环引用的问题。


`标记清除`是两个过程，一个是`标记`的过程，一个是`清除`的过程。

标记的过程会从一个根节点去进行扫描，通过一个遍历去看一下所有的节点是不是都可以被访问的到，如果某些节点不能被访问到了，就会把他们标记出来。清除的过程就是把标记出来的节点给回收掉。


## 哪些操作会造成内存泄漏？


意外的全局变量<br/>
被遗忘的定时器和回调函数<br/>
闭包<br/>
`DOM`引用

```js
var elements = {
  image: document.getElementById('image')
};
function doStuff() {
  elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
  document.body.removeChild(document.getElementById('image'));
  // 这个时候我们对于image仍然有一个引用,Image元素仍然无法被内存回收
}
```


## 如何避免内存泄漏？

::: tip
避免意外的全局变量产生
:::

```js
function accidentalGlobal () {
    leak1 = 'leak1';
    this.leak2 = 'leak2';
}
accidentalGlobal();

// accidentalGlobal函数执行完就生成了两个全局变量
window.leak1;
window.leak2;
```

::: tip
避免反复运行引发大量闭包
:::

```js
var store;

function outer () {
    var largeData = new Array(10000000);
    var prevStore = store;
    
    function inner () {
        if (prevStore) return largeData;
    }
    return function (){};
}

setInterval(function(){
    store = outer();
}, 10);
```

::: tip
避免脱离的DOM元素
:::

```js
function createElement () {
    const div = document.createElement('div');
    div.id = 'detached';
    return div;
}

const detachedDiv = createElement();
document.body.appendChild(detachedDiv);

function deleteElement () {
    document.body.removeChild(document.getElementById('detached'));
}
deleteElement();
```

## 如何理解JSON

`JSON`只不过是一个`JS对象`而已,不过它也是一种数据格式

```js
// 把对象变成字符串
JSON.stringify({a:10,b:20}) 

// 把字符串变成对象
JSON.parse('{"a":10,"b":20}')
```

## `mouseover,mouseout`事件与`mouseenter,mouseleave`事件的区别

`mouseover,mouseout`鼠标经过自身时触发事件。经过其子元素时也触发事件<br/>
`mouseenter,mouseleave`鼠标经过自身时触发事件。经过其子元素时不触发事件


## 如何检测浏览器的类型

```js
console.log(navigator.userAgent)
```


## 什么是DOCTYPE及作用，有哪几种

`DTD`是一系列的语法规则，用来定义`XML`或`(X)HTML`的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式

`DOCTYPE`是用来声明文档类型和`DTD`规范的，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时便会出一些差错

| html5 | html4.0.1|
| ---- | ------ |
|    `<!DOCTYPE html>`  |  严格模式和宽松模式(严格模式不包括展示性的和弃用的元素,宽松模式包括)|


## 双向绑定的原理是?


`data`到`view`是正向，通过`Object.defineProperty`实现<br/>
`view`到`data`是反向，通过`input`事件实现

## web服务器工作的过程


```
    st=>start: 接收客户端连接
    op1=>operation: 接收请求报文
    op2=>operation: 处理请求
    op3=>operation: 访问Web资源
    op4=>operation: 构造应答
    op5=>operation: 发送应答
    
    st->op1->op2->op3->op4->op5
```


| 请求报文 |
| ---- |
| 请求方法 请求地址 HTTP版本 |
| 请求头|
| 请求内容 |


| 应答报文 |
| ----- |
| HTTP版本 状态码 状态解释 |
| 应答头 |
| 应答内容 |




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


## SESSION


| 优势 |  
| ----- |
| 相比`JWT`最大的优势就在于可以主动清除`SESSION`（因为`SESSION`是保存在服务端的） |
|`SESSION`保存在服务器端，相对较为安全 |
| 结合`Cookie`使用，较为灵活，兼容性较好 |

|  劣势 | 
| ----- |
| `Cookie+SESSION`在跨域场景表现并不好 |
| 如果是分布式部署，需要做多机共享`SESSION`机制 |
| 基于`Cookie`的机制很容易被`CSRF` |
| 查询`SESSION`信息可能会有数据库查询操作 | 


## JWT


`JWT`(JSON WEB TOKEN)是一个开放标准<br/>
`JWT`定义了一种紧凑且独立的方式，可以将各方之间的信息作为`JSON`对象进行安全传输<br/>
`JWT`信息可以验证和信任，因为是经过数字签名的


::: details JWT的构成
头部（Header）<br/>
`Header`本质是个`JSON`,这个`JSON`有两个字段<br/>
第一个是`typ`，代表令牌的类型，这里固定为`JWT`<br/>
第二个是`alg`,代表的是使用的哪种`hash`算法，比如`RSA`
```js
// Header编码前后
{"alg": "HS256", "typ": "JWT"}
'eyjhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9'
```
有效载荷(Payload)<br/>
存储需要传递的信息，比如用户ID，用户名等<br/>
还包含元数据，如过期时间，发布人等<br/>
与`Header`不同，`Payload`可以加密<br/>
签名(Signature)<br/>
对`Header`和`Payload`部分进行签名<br/>
保证`Token`在传输的过程中没有被篡改或者损坏
:::


## `JWT`与`SESSION`

::: tip
可拓展性<br/>
拓展程序有水平拓展，有垂直拓展<br/>
水平拓展就是加服务器<br/>
垂直拓展就是增强你服务器的硬件性能，比如说磁盘，内存，`CPU`等<br/>
`SESSION`都是存在服务器中的，在水平拓展的方案中，你就必须要专门创建一个独立的中心式的`SESSION`存储系统才行，否则是没有办法共享的，所以在这种情况下，`JWT`是要比`SESSION`好的
:::



::: tip
RESTFUL API<br/>
`SESSION`是有状态的所以不能用做`RESTFUL API`
:::

::: tip
性能<br/>
在客户端向服务端发送请求的时候，可能会有大量的用户信息在`JWT`中，那么每个`HTTP`请求都会产生大量的开销，如果用`SESSION`的话，只要少量的开销就可以了，因为`SESSION`非常的小<br/>

但是`SESSION`也有缺点，因为对于`SESSION`来说，每一个请求都需要在服务器上查找一下`SESSION`，因为它拿到的是`SESSION ID`嘛，并没有完整的信息，你要用`SESSION ID`来查完整的信息，这也是需要消耗性能的，`JWT`它的数据都在`JWT`的字符串里，所以说不需要进行数据库查询
:::

::: tip
时效性<br/>
`JWT`要比`SESSION`时效性差一点，因为`JWT`只有等到过期时间才可以销毁，`SESSION`可以在服务端手动的去销毁
:::

## 手写代码

::: details 防抖
```js
function debounce ( fn, delay ) {
    let timer = null
    return function () {
        const context = this
        const args = arguments;
        if ( timer ) { clearTimeout(timer) }
        timer = setTimeout( () => {
            fn.apply( context, args )
        }, delay)    
    }           
}
```
:::


::: details 节流
```js
function throttle ( fn, delay ) {
    let flag = true;
    return function () {
        if ( !flag ) return
        let context = this
        let args = arguments
        flag = false
        setTimeout( () => {
            fn.apply( context, args )
            flag = true
        }, delay )
    }
}
```
:::

::: details 深拷贝
```js
function deepClone ( data ) {
    if ( typeof data === 'object' ) {
        const result = Array.isArray( data ) ? [] : {};   
        for ( let key in data ) {
            if (typeof data[key] === 'object' ) {
                result[key] = deepClone( data[key] )
            } else {
                result[key] = data[key]
            }
        }
        return result
    } else {
        return data
    }
}
```
:::

::: details  call
```js
Function.prototype._call = function ( that ) {
    that.fn = this        
    const args = [ ...arguments ].slice( 1 )
    const result = that.fn( ...args )
    delete that.fn
    return result
}
```
:::


::: details  apply
```js
Function.prototype._apply = function ( that ) {
    that.fn = this        
    const args = arguments[1]
    const result = args ? that.fn( args ) : that.fn()
    delete that.fn
    return result
}
```
:::


::: details bind
```js
Function.prototype._bind = function ( obj ) {
    if (typeof this !== 'function') throw new Error('not a function')
    const context = obj ?? window
    const that = this
    const args = [ ...arguments ].slice( 1 )
    const Temp =  function () {};
    const result = function () {
        return that.apply(this instanceof result ? this : context, [...args, ...arguments])
    }
    Temp.prototype = this.prototype
    result.prototype = new Temp()
    return result
}
```
:::


::: details instanceof
```js
function _instanceof (left, right) {
    let prototype = right.prototype;
    let proto = left.__proto__;
    while ( true ) {
        if ( proto === null ) return false;
        if ( proto === prototype ) return true;
        proto = proto.__proto__;
    }
}
```
:::


::: details new
```js
function new ( fn, ...args ) {
    const obj = Object.create( fn.prototype )
    const result = fn.apply( obj, args )
    if ( result && ( typeof result === 'object' || typeof result === 'function' ) ) {
        return result
    }
    return obj
}
```
:::



## 一个关于setTimeout的笔试题

```js
console.log(1)
setTimeout(function(){
	console.log(2)
},0)
console.log(3)
setTimeout(function(){
	console.log(4)
},1000)
console.log(5)

// 1 3 5 2 4
```

## 创建10个a标签,点击的时候弹出来对应的序号

```js
for(var i = 0; i < 10; i++) {
    (function (i) {
        var a = document.createElement('a')
        a.addEventListener('click',function(e){
            e.preventDefault()
            var num = i
            console.log(num)
        })
        document.body.appendChild(a)
	})(i)
}
```


## 获取2017-06-10格式的日期

```js
var dt = new Date()
var formatDate = formatDate(dt)
console.log(formatDate)
function formatDate (dt) {
    if(!dt){
        dt=new Date()   
    }
    var year = dt.getFullYear()
    var month = dt.getMonth() + 1 
    var date = dt.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (date < 10){
        date = '0' + date
	}
	return year + '-' + month + '-' + date
}
```


## 获取随机数，要求是长度一致的字符串格式

```js
var random = Math.random()
random = random + '0000000000'
random = random.slice(0,10)
console.log(random)
```


## 写一个能遍历对象和数组的通用forEach函数

```js
function forEach (obj, fn) {
    var key
    if (obj instanceof Array){
        obj.forEach(function(item, index){
            fn(index, item)
        })
    } else {
        for (key in obj) {
            fn(key, obj[key])
        }
    }
}
```



## JS案例

```js
function Foo(){
    getName = function(){
        console.log(1)
    }
    return this
}
Foo.getName = function(){
    console.log(2)
}
Foo.prototype.getName = function(){
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName (){
    console.log(5)
}
Foo.getName() 
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()

// 2 4 1 1 2 3 3
```

## 编写一个通用的事件监听函数

```js
function bindEvent (elem, type, selector, fn){
    if (fn == null ) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function(e) {
        var target
        if (selector) {
            target = e.target;
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}
```

## 使用面向对象方式维护一个列表，每个列表有一个删除按钮，点击删除按钮移除当前行

```html
<script>
window.addEventListener('DOMContentLoaded',function(){
    new List('.list');
})
class List{
    constructor(sel){
			this.el=Array.from(document.querySelectorAll(sel));
			let self=this;
			this.el.forEach(item=>{
				item.addEventListener('click',function(e){
					if(e.target.className.indexOf('del')>-1){
						self.removeItem.call(self,e.target)
					}
				},false)
			})
    }
		
    removeItem(target){
        let self = this
        let findParent = function(node) {
            let parent = node.parentNode;
            let root = self.el.find(item => {
                return item == parent
            })
            if(root){
                root.removeChild(node);
            }else{
    	       findParent(parent)
            }
    	}
        findParent(target)
    }
}
</script>
<body>
	<ul class="list">
		<li><span class="del">1</span></li>
		<li><span class="del">2</span></li>
		<li><span class="del">3</span></li>
		<li><span class="del">4</span></li>
		<li><span class="del">5</span></li>
		<li><span class="del">6</span></li>
		<li><span class="del">7</span></li>
		<li><span class="del">8</span></li>
	</ul>
</body>
```

