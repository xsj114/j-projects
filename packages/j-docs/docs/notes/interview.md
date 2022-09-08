 [toc]

# 面试总结

## CSS

### 块元素

| 特性 |
| --- |
| 默认块元素独占一行 |
| 支持所有`css`命令 |

### 内联元素

| 特性 |
| --- |
| 宽高由内容撑开 |
| 不支持宽高 |
| 一行上可以显示继续跟同类的标签 |
| 不支持上下的`margin` |
| 代码换行被解析 |

### inline-block

| 特性 |
| --- |
| 块在一排显示 |
| 内联支持宽高 |
| 默认内容撑开宽度 |
| 标签之间的换行间隙被解析 |


### float

> 定义：使元素脱离文档流,按照指定方向发生移动,遇到父级边界或者相邻的浮动元素停了下来

| 特性 |
| ---- |
| 块在一排显示 |
| 内联支持宽高 |
| 默认内容撑开宽度 |
| 脱离文档流 |
| 提升层级半层 |



### position-relative

| 特性 |
| --- |
| 不影响元素本身的特性 |
| 不使元素脱离文档流,元素移动之后原始位置会被保留 |
| 如果没有定位偏移量,对元素本身没有任何影响 |
| 提升层级 |

### position-absolute

| 特性 |
| --- |
| 使元素完全脱离文档流 |
| 使内联支持宽高 |
| 块属性标签内容撑开宽度|
| 如果有定位父级相对于定位父级发生偏移,没有定位父级相对于`document`发生偏移|
| 相对定位一般都是配合绝对定位元素使用 |
| 提升层级 |



### 说出10个块级元素与10个行内元素，并说出行级元素与块级元素的区别

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

块级元素有宽高
行级元素无宽高
块级元素可以包含行级元素和块级元素
行级元素不能包含块级元素

### 用纯css画一个下箭头

```
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


### margin的问题

#### 使用`margin-top`会传递给他的父级

通过触发`BFC`解决

#### `margin`值会上下叠压

单独给每个元素设置，虽然还会有上下叠压的问题，但是会取最大值



### 清除浮动的几种方法

| 方法 | 弊端 |
| --- | ---- |
| 加高度 | 扩展性不好 |
| 给父级加浮动 | 页面中所有元素都加浮动 |
| `after`伪类 | |

### `display:none`与`visibility:hidden`的区别是什么？

`display:none`隐藏对应的元素但不挤占该元素原来的空间
`visibility:hidden`隐藏对应的元素并且挤占该元素原来的空间


### CSS中`link`和`@import`的区别是

`link`属于`HTML`标签
`@import`是`CSS`中提供的

在页面加载的时候,`link`会同时被加载,而`@import`引用的`CSS`会在页面加载完成后才会加载引用的`CSS`

### 什么是外边距重叠？重叠的结果是什么？

外边距重叠就是`margin-collapse`

在CSS当中,相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且所结合的外边距称为折叠外边距

#### 计算规则

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
两个相邻的外边距都是负数时,折叠结果是两者绝对值的较大值
两个外边距一正一负时,折叠结果是两者相加的和

### 什么是`css hack`

针对不同的浏览器写不同的`css code`的过程就是`css hack`也是浏览器兼容

### 假设高度已知，请写出三栏布局，其中左栏，右栏，宽度各为300px，中间自适应

| 方法 |  描述 |
| --- | ---- |
|  浮动  | 清楚浮动,如果处理不好,问题会很多,兼容性较好|
| 绝对定位 |   好处是快捷，坏处是下面的子元素都要脱离文档流 |
| `flexbox`  | 比较完美的布局 |
| 表格布局  | 兼容性非常好,会同时增高 |
| 网格布局 |  新的技术 |

### 谈谈你对CSS盒模型的认识
`CSS`盒模型包含`margin`,`border`,`padding`,`content`
盒模型大小 = `border` + `padding` + `width/height`
标准盒模型与`IE`盒模型的区别是计算的宽度和高度不同

| 盒模型分类 |  描述  | 设置 |
| ------ | ---- | ----- |
| 标准盒模型 |  宽度和高度指的是`content` |  `box-sizing: content-box;`  |
| `IE`盒模型 | 宽度和高度指的是`content+padding+border` | 	`box-sizing: border-box;` |

### JS怎么获取盒模型对应的宽和高

```
// 取到内联样式的宽和高
dom.style.width/height

// 计算后的样式(只有IE支持)
dom.currentStyle.width/height 

// 计算后的样式
window.getComputedStyle(dom).style.width/height  

dom.getBoundingClientRect().width/height
```

### BFC

| `BFC`的原理 |
| ------ | 
|  在`BFC`这个元素内的垂直方向的边距会发生重叠  |
| `BFC`的区域不会与浮动元素重叠 |
| 计算`BFC`高度的时候，浮动元素也会参与计算 |
| `BFC`在页面中是一个独立的容器，外面的元素不会影响里面的元素，里面的元素也不会影响外面的元素 |

|创建`BFC` |
| ----- |
|  `overflow`不为`visible` |
| `float`值不为`none` |
| `position`不为`static`或`relative`|
| `display:inline-block` |



## JAVASCRIPT

### 防抖

```
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

### 节流

```
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

### 深拷贝

```
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

### 手写`call`函数

```
Function.prototype. _call = function ( that ) {
    that.fn = this        
    const args = [ ...arguments ].slice( 1 )
    const result = that.fn( ...args )
    delete that.fn
    return result
}
```

### 手写`apply`函数

```
Function.prototype. _apply = function ( that ) {
    that.fn = this        
    const args = arguments[1]
    const result = args ? that.fn( args ) : that.fn()
    delete that.fn
    return result
}
```

### 手写`bind`函数

```
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

### 双向绑定是什么原理

`data`到`view`是正向，通过`Object.defineProperty`实现
`view`到`data`是反向，通过`input`事件实现

### RESTful API

| `RESTful API`包含 |
| --- |
| 基本的`URI`，如`https://api.github.com/users` |
| 标准`HTTP`方法如`GET`，`POST`，`PUT`，`PATCH`，`DELETE` |
| 传输的数据媒体类型如`JSON`，`XML` |


#### REST

`REST`（Representational State Transfer）是`万维网软件架构风格`用来创建网络服务

`Representational`是数据的表现形式（`JSON`，`XML`....）
`State`是当前状态或者数据
`Transfer`是数据传输

| REST的6个限制 | 描述 |
| ------- | ------ |
| 客户-服务器(Client-Server) | 关注点分离<br>服务端专注数据存储提升了简单性<br>前端专注用户界面提升了可移植性 |
| 无状态 | 所有用户会话信息都保存在客户端<br>每次请求必须包括所有信息不能依赖上下文信息<br>服务端不用保存会话信息提升了简单性，可靠性，可见性|
| 缓存 | 所有服务端响应都要被标为可缓存或不可缓存<br>减少前后端交互提升了性能|
| 统一接口 | 接口设计尽可能统一通用，提升了简单性，可见性 <br> 接口与实现解耦，使前后端可以独立开发迭代|
| 分层系统 | 软件架构是分层的，每层只知道相邻的一层，后面隐藏的就不知道了，比如客户端不知道是和代理还是真实服务器通信|
| 按需代码| 客户端可以下载运行服务端传来的代码，比如JS<br>通过减少一些功能简化了客户端 |







##### 统一接口的限制

| 统一接口的限制 |  描述 |
| ---------- | ----- |
| 资源的标识 | 资源是任何可以命名的事物，比如用户，评论等<br>每个资源可以通过`URI`被唯一地标识 |
| 通过表述来操作资源 |表述就是`Representation`<br>客户端不能直接操作服务端资源(比如`SQL`)<br>客户端应该通过表述来操作资源（比如`JSON`） |
| 自描述消息 | 每个消息（请求或响应）必须提供足够的信息让接受者理解，例如媒体类型，`HTTP`方法，是否缓存 |
|超媒体作为应用状态引擎 | 超媒体指带文字的链接<br>应用状态指一个网页<br>引擎指驱动，跳转<br>合起来就是点击链接跳转到另一个网页 |




#### RESTful API设计最佳实践


##### 请求设计规范


| 请求设计规范 | 例子 |
| ----- | ----- |
| `URI`使用名词，尽量用复数 | `/users` |
| `URI`使用嵌套表示关联关系 | `/users/12/repos/5` |
| 使用正确的`HTTP`方法| `GET`，`POST`，`PUT`，`DELETE` |
| 不符合`CRUD`（增删改查）的情况 | `POST`<br>`action`<br>`子资源` |

##### 响应设计规范

| 响应设计规范 | 解释 |
|  ----- |  ----- |
| 查询 |  每个响应都是可以被查询，可以被过滤的，我们加上一些限制条件就只能返回符合这些条件的一些返回值了 |
| 分页 | 如果列表特别长的话，我们应该加上分页信息 |
| 字段过滤 | 返回的结果只能返回你指定的那几个字段 |
| 状态码 | 选择正确的状态码来作为它的响应  |
| 错误处理 | 如果请求是错的，应该尽量把错误信息给返回并按照一个规范的格式 |


##### 增删改查应该返回什么响应

`增`返回当前增加或修改的数据 
`删`返回`204`状态码
`改`返回当前增加或修改的数据 
`查`返回查询的数据








### SESSION


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

### JWT


`JWT`(JSON WEB TOKEN)是一个开放标准
`JWT`定义了一种紧凑且独立的方式，可以将各方之间的信息作为`JSON`对象进行安全传输
`JWT`信息可以验证和信任，因为是经过数字签名的

#### JWT的构成

#####  头部（Header）

`Header`本质是个`JSON`,这个`JSON`有两个字段
第一个是`typ`，代表令牌的类型，这里固定为`JWT`
第二个是`alg`,代表的是使用的哪种`hash`算法，比如`RSA`

```
// Header编码前后

{"alg": "HS256", "typ": "JWT"}

'eyjhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9'
```

##### 有效载荷(Payload)

存储需要传递的信息，比如用户ID，用户名等
还包含元数据，如过期时间，发布人等
与`Header`不同，`Payload`可以加密

#####  签名(Signature)

对`Header`和`Payload`部分进行签名
保证`Token`在传输的过程中没有被篡改或者损坏

### `JWT` vs `SESSION`

#### 可拓展性


拓展程序有水平拓展，有垂直拓展
水平拓展就是加服务器
垂直拓展就是增强你服务器的硬件性能，比如说磁盘，内存，`CPU`等

`SESSION`都是存在服务器中的，在水平拓展的方案中，你就必须要专门创建一个独立的中心式的`SESSION`存储系统才行，否则是没有办法共享的，所以在这种情况下，`JWT`是要比`SESSION`好的



#### RESTFUL API

`SESSION`是有状态的所以不能用做`RESTFUL API`

#### 性能

在客户端向服务端发送请求的时候，可能会有大量的用户信息在`JWT`中，那么每个`HTTP`请求都会产生大量的开销，如果用`SESSION`的话，只要少量的开销就可以了，因为`SESSION`非常的小

但是`SESSION`也有缺点，因为对于`SESSION`来说，每一个请求都需要在服务器上查找一下`SESSION`，因为它拿到的是`SESSION ID`嘛，并没有完整的信息，你要用`SESSION ID`来查完整的信息，这也是需要消耗性能的，`JWT`它的数据都在`JWT`的字符串里，所以说不需要进行数据库查询


#### 时效性

`JWT`要比`SESSION`时效性差一点，因为`JWT`只有等到过期时间才可以销毁，`SESSION`可以在服务端手动的去销毁

### `mouseover,mouseout`事件与`mouseenter,mouseleave`事件的区别

`mouseover,mouseout`鼠标经过自身时触发事件。经过其子元素时也触发事件
`mouseenter,mouseleave`鼠标经过自身时触发事件。经过其子元素时不触发事件

### JS中使用`typeof`能得到的类型

| 类型 |
| ---- |
| `undefined` |
| `string`  |
|  `number` |
| `boolean` |
| `object` |
| `function` |
| `symbol` |

### 何时使用`===`和`==`

```
obj.a == null
// 相当于
obj.a === null || obj.a === undefined
```


### JS数据类型

| 数据类型 |
|  ----  |
| `Boolean` |
| `Null` |
| `Undefined`  |
| `Number` |
| `String` |
| `Symbol` |
| `Object` |

### JS显式类型转换和隐式类型转换

| 显式类型转换 | 隐式类型转换 | 
| --- |      ----- |
| `Number()` |    四则运算`+-*/`   |
| `String()` |   `if`判断语句 |
| `Boolean()` |  `console.log()` |



> 使用`+,-`号的时候。如果前面没有数据，后面跟着字符串，那么会转为数字类型，转不出来就是`NAN`


### 创建对象的几种方法

```
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

### 对象属性的特征

要修改对象属性的默认特性，必须使用`Object.defineProperty()`

| 数据属性 | 描述 |
| ------ | ---- |
| `Configurable` | 能否重新定义属性或用`delete`删除属性 |
| `Enumerable` | 能否通过`for-in`循环返回属性 |
| `Writable` | 能否修改属性的值 |
| `Value`  |这个属性的数据值，默认值为`undefined` |

> 

| 访问器属性 | 描述 |
| ---- | ----- |
| `Configurable` | 能否重新定义属性或用`delete`删除属性 |
| `Enumerable` | 能否通过`for-in`循环返回属性 |
| `Get` | 读取属性时调用的函数，默认值为`undefined` |
| `Set` | 写入属性时调用的函数，默认值为`undefined` |

访问器属性不能直接定义，必须使用`Object.defineProperty()`来定义

### 定义函数的两种方式

```
// 函数声明
function functionName (arg1, arg2) {}

// 函数表达式
var functionName = function (arg1, arg2) {}
```

> 在匿名函数中定义的任何变量，都会在执行结束时被销毁

 
### JS中的内置函数

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

### JS按存储方式区分变量类型

```
// 值类型
var a = 10;
var b = a;
a = 11;
console.log(b)  // 10
```

```
// 引用类型
var obj1 = { x: 100 }
var obj2 = obj1
obj1.x = 200
console.log(obj2.x)   // 200
```

### 如何理解JSON

`JSON`只不过是一个`JS对象`而已,不过它也是一种数据格式

```
// 把对象变成字符串
JSON.stringify({a:10,b:20}) 

// 把字符串变成对象
JSON.parse('{"a":10,"b":20}')
```

### 原型规则

所有的引用类型(数组，对象，函数)都具有对象特性，即可自由扩展属性（除了`null`以外）

所有的引用类型(数组，对象，函数)，都有一个`__proto__`属性，`__proto__`属性值指向它的构造函数的`prototype`属性值，当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`(即它的构造函数的`prototype`)中寻找

所有的函数，都有一个`prototype`属性，属性值也是一个普通的对象，这个对象就是原型对象，默认情况下，所有原型对象都会自动获得一个`constructor`属性，这个属性是一个指向`propotype`属性所在函数的指针





### 如何准确判断一个变量是数组类型

```
const arr = [1,2,3]
console.log(arr instanceof Array) // true
```

#### 手写`instanceof`

```
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

#### `instanceof`的原理

判断实例对象的`__proto__`属性和构造函数的`prototype`属性是不是同一个引用

### 写一个原型链继承的例子

```
function A(){}
function B(){}
B.prototype = new A()
```

### 描述`new`一个对象的过程

创建一个新对象
将构造函数的作用域赋值给新对象，因此`this`指向这个新对象
执行构造函数中的代码，即对`this`赋值
返回新对象


```
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

#### 手写`new`运算符

创建一个空对象
让空对象的`__proto__`成员指向构造函数的`prototype`成员对象
使用`apply`调用构造函数。属性和方法被添加到`this`引用的对象中
如果构造函数中没有返回其他对象，那么返回`this`，即创建的这个新对象，否则返回构造函数返回的对象

```
function New ( fn, ...args ) {
    const obj = Object.create( fn.prototype )
    const result = fn.apply( obj, args )
    if ( result && ( typeof result === 'object' || typeof result === 'function' ) ) {
        return result
    }
    return obj
}
```




### zepto或其他框架源码中如何使用原型链

```
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

### 说一下对变量提升的理解

```
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


### 说明`this`几种不同的使用场景

作为构造函数执行
作为对象属性执行
作为普通函数执行
`call,apply,bind`


`this`对象是在运行时基于函数的执行环境绑定的
在全局函数中,`this`等于`window`
而当函数被作为某个对象的方法调用时,`this`等于那个对象
不过匿名函数的执行环境具有全局性,因此其`this`对象通常指向`window`


### `this`要在执行时才能确认,定义时无法确认

```
var a={
    name: 'A',
    fn: function(){
        console.log(this.name)
    }
}

a.fn()  // this === a
a.fn.call({name:'B'})  // this === {name:'B'}
var fn1 = a.fn
fn1()  // this === window
```




### 如何理解作用域

自由变量（当前作用域没有定义的变量，即自由变量）
作用域链即自由变量的查找
没有块级作用域只有函数和全局作用域

### 实际开发中闭包的应用

闭包实际应用中主要用于封装变量，收敛权限
函数作为返回值
函数作为参数传递

### 闭包是指有权访问另一个函数作用域中的变量的函数

```
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

```
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

### 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

使用代理，代码比较简洁，给浏览器的压力较小

### 同步和异步的区别是什么？分别举一个同步和异步的例子
同步会阻塞代码执行而异步不会
`alert`是同步
`setTimeout`是异步

### 前端使用异步的场景有哪些

定时任务: `setTimeout,setInterval`
网络请求: `ajax`请求，动态`<img />`加载
事件绑定


### DOM是哪种基本的数据结构

树


### `DOM`节点的`attribute`和`property`有何区别
`property`只是一个`JS`对象的属性的修改
`attribute`是对`HTML`标签属性的修改


### DOM事件的级别

| 级别 | 示例 |
|  ---- | ----  |
| DOM0   | element.onclick = function(){} |
| DOM2 | element.addEventListener('click', function(){}, false) |
| DOM3 | element.addEventListener('keyup', function(){}, false) |


### DOM事件模型

捕获和冒泡

### DOM事件流

第一阶段是捕获阶段
第二阶段是目标阶段
第三阶段是冒泡阶段

### 描述DOM事件捕获的具体流程

`window`到`document`到`html`标签到`body`标签，然后一级一级往下传最后到目标元素

### 如何检测浏览器的类型

```
console.log(navigator.userAgent)
```

### 什么是同源策略及限制

同源策略要求同域名,同端口,同协议

| 限制 |
| ---- |
|  `Cookie,LocalStorage,IndexDB`无法获取  |
| `DOM`无法获得 |
| `AJAX`请求不能发送 |


### 前后端如何通信

| 方式  |  是否同源 |
| ---- | ---- |
| `Ajax` | 同源 |
| `WebSocket` | 不限制同源 |
| `CORS` | 支持同源或者不同源 |


### 跨域通信的几种方式

|  方式 | 描述 |
| ---- | ---- |
| `JSONP`  | 通过`script`标签发送请求,服务端返回一个函数,定义一个全局的函数名称，然后运行函数得到数据 |
| `Hash` | |
| `postMessage` | |
| `WebSocket` | |
| `CORS` | |


可以跨域的三个标签`<script>,<img>,<link>`



### 跨域的JS运行错误可以捕获嘛？错误提示是什么？应该怎么处理？

只能拿到`script error`，拿不到行号和列号

处理分两步
在`script`标签增加`crossorigin`属性
设置资源响应头`Access-Control-Allow-Origin: *`


### 什么是DOCTYPE及作用，有哪几种

`DTD`是一系列的语法规则，用来定义`XML`或`(X)HTML`的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式

`DOCTYPE`是用来声明文档类型和`DTD`规范的，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时便会出一些差错

| html5 | html4.0.1|
| ---- | ------ |
|    `<!DOCTYPE html>`  |  严格模式和宽松模式(严格模式不包括展示性的和弃用的元素,宽松模式包括)|


### window.onload和DOMContentLoaded的区别

|window.onload |DOMContentLoaded|
| ----- | --- |
|  页面的全部资源加载完才会执行，包括图片，视频等 |  `DOM`渲染完即可执行，此时图片，视频还可能没有加载完 |


### 有一个函数执行对象查找时,永远不会去查找原型,这个函数是?

`hasOwnProperty()`


### 哪些操作会造成内存泄漏？


意外的全局变量
被遗忘的定时器和回调函数
闭包
`DOM`引用

```
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

### 请描述一下`Cookie`，`sessionStorage`，`localStorage`的区别


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


### 前端错误

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


```
//  Error事件捕获
window.addEventListener('error',function(e){},true)
```

### 安全性

#### XSS
| XSS跨站请求攻击(跨域脚本攻击) | XSS预防|
| ----------------------- | ------------ |
| 在输入内容时，可以输入脚本(`<script>`),脚本中有攻击代码，获取基本信息，发送到自己的服务器上 |  替换关键字，例如替换`<`为`&lt;` `>`为`&gt;` |



#### CSRF

跨站请求伪造

| `CSRF`预防 |
| ------- |
| `Token`验证 |
| `Referer`验证 |
| 隐藏令牌 |


### 页面加载过程

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


### 从输入URL到页面加载显示完成都发生了什么？


浏览器有一个`UI thread`，它会做一个判断看输入的内容到底是`搜索`还是你真正要访问的一个站点，如果访问的是一个`URL`,它会对你输入的`URL`去进行一个相关的解析，接下来`UI thread`会通知`Network thread`


`Network thread`首先会进行`DNS`查找，要去确认域名对应的那个`IP`，然后才能和服务器建立连接。在请求发起之前，需要设置`UA`等信息。服务器收到请求后，根据处理逻辑将数据组织成`Response`返回到前端，在返回到浏览器这边的时候，它在读取到`Response`前几个字节的时候会做一个分析，分析我们这个数据的类型，然后根据判断到的类型在去进行相关的解析。接下来还会做一个安全检查去判断一下，你访问的这个域名是不是安全的。然后会通知`UI thread`数据准备就绪。

当数据准备好并且`Renderer Process`也准备好了之后，会有一个进程间的通信，并且会把数据传递给我们的`Renderer Process`。`Main thread`开始进行文本的解析，构建`DOM`，在构建`DOM`的过程中会遇到引用外部资源的情况，它会去进行加载。在遇到`JS`脚本的时候，会阻塞解析，可以使用`async`或者`defer`去进行一个异步的加载。`Main thread`还会去解析`CSS`，最终得到一个`computed styles`，它描述了我们每一个元素最终具体要画成什么样子。`Main thread`遍历我们的`DOM`和`computed styles`构造了我们的`RenderTree`。接下来进入到了`Layout`部分，`Layout`是指查找我们元素几何形状的一个过程，，并且会`创建绘制记录`。


接下来，我们需要`Raster Thread`将页面拆分图层，构建`图层树`。然后`Compositor Thread`去把我们已经绘制出来的图层合成成一帧。


> `UI thread`和`Network thread`都是`Browser Process`中的
> `Main thread`，`Raster Thread`和`Compositor Thread`都是`Renderer Process`中的
> 浏览器渲染的工作会交给`Renderer Process`


### 什么是首屏加载？怎么优化？

| 测量指标 | 含义 | 范围 |  备注 |
|  ------ | ---- | ---- |  ---- |
| `First Contentful Paint` | 有意义内容的绘制 | 控制在`2s`以内 | 当出现了第一个内容之后它就知道这个网站是可以访问的 |
| `Largest Contentful Paint` | 最大内容的绘制 | 控制在`2.5s`以内 | 我们看到它绘制的第一个最大内容，无论是图片或者是很大一块文字内容之后，我们就知道这个网站到底是做什么的了 |
| `Time to Interactive` | 用户可以开始进行交互了，你的页面全部加载完成了 | 控制在`3.8s`以内 | |

### JS是怎样管理内存的？

变量创建时自动分配内存，不使用时自动释放内存，这个过程叫做`垃圾回收`
变量通常可以分为两类，一类是`局部变量`，一类是`全局变量`

`局部变量`在函数执行完，没有闭包引用，就会被标记回收
`全局变量`直至浏览器卸载页面时释放

垃圾回收实现机制共有两种，一种是`引用计数`，一种是`标记清除`

`引用计数`是当创建变量之后，去看下有哪些对它进行了引用，当`引用计数`归0之后就可以对它进行相关的回收了。不过`引用计数`无法解决循环引用的问题。


`标记清除`是两个过程，一个是`标记`的过程，一个是`清除`的过程。

标记的过程会从一个根节点去进行扫描，通过一个遍历去看一下所有的节点是不是都可以被访问的到，如果某些节点不能被访问到了，就会把他们标记出来。清除的过程就是把标记出来的节点给回收掉。


### 如何避免内存泄漏？

#### 避免意外的全局变量产生

```
function accidentalGlobal () {
    leak1 = 'leak1';
    this.leak2 = 'leak2';
}
accidentalGlobal();

// accidentalGlobal函数执行完就生成了两个全局变量
window.leak1;
window.leak2;
```

#### 避免反复运行引发大量闭包

```
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

#### 避免脱离的DOM元素

```
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


### 一个关于setTimeout的笔试题

```
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

### 创建10个\<a\>标签,点击的时候弹出来对应的序号

```
for(var i=0;i<10;i++){
    (function(i){
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

### 获取2017-06-10格式的日期

```
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

### 获取随机数，要求是长度一致的字符串格式

```
var random = Math.random()
random = random + '0000000000'
random = random.slice(0,10)
console.log(random)
```

### 写一个能遍历对象和数组的通用forEach函数

```
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

### 九宫格

```
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


### 编写一个通用的事件监听函数

```
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


### 使用面向对象方式维护一个列表，每个列表有一个删除按钮，点击删除按钮移除当前行

```
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

### JS案例

```
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




### CommonJS模块的加载原理

`CommonJS`主要是通过`require`和`module.exports`两个方法做模块化加载，`CommonJS`模块是运行时执行，并且是同步加载模块，加载完的模块是一个对象，并将它放到缓存中，再次加载的时候，也会从缓存中读取，不会在重复加载了，也就是说`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次。在`CommonJS`中，一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出


### ES6模块的加载原理

浏览器加载`ES6`模块，也使用`<script>`标签，但是要加入`type="module"`属性,浏览器对于带有`type="module"`的`<script>`，都是异步加载,等同于打开了`<script>`标签的`defer`属性

`JS`引擎对脚本静态分析的时候,遇到模块加载命令`import`,就会生成一个只读引用。等到脚本真正执行时,再根据这个只读引用,到被加载的那个模块里面去取值。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

### ES6模块与CommonJS模块的差异

`CommonJS`模块输出的是一个值的拷贝,`ES6`模块输出的是值的引用
`CommonJS`模块是运行时加载,`ES6`模块是编译时输出接口
`CommonJS`模块的`require()`是同步加载模块,`ES6`模块的`import`命令是异步加载,有一个独立的模块依赖的解析阶段


### Web服务器工作的过程


```flow
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
| [请求方法][请求地址][HTTP版本] |
| [请求头]|
| [请求内容] |


| 应答报文 |
| ----- |
| [HTTP版本][状态码][状态解释] |
| [应答头] |
| [应答内容] |





## webpack


### webpack原理


```flow
    st=>start: 找到入口文件
    op1=>operation: 分析文件中的依赖
    op2=>operation: 将文件中的依赖依次存到队列中，转换队列生成一个依赖图
    op3=>operation: 根据依赖图，生成编译后的代码
    
    st->op1->op2->op3
```



```
/* index.js */
import message from './message.js'
console.log(message)

/* message.js */
import {word} from './word.js'
const message = `say ${word}`
export default message

/* word.js */
export const word = 'hello'
```


```
const fs = require( 'fs' )
const path = require( 'path' )
const parser = require( '@babel/parser' )
const traverse = require( '@babel/traverse' ).default
const babel = require( '@babel/core' )


const moduleAnalyser = ( filename ) => {
    const content = fs.readFileSync( filename, 'utf-8' )
    // 利用@babel/parser,将源代码转换成抽象语法树
    const ast = parser.parse( content, {
        sourceType: 'module'
    } )
    // 分析抽象语法树的import声明
    const dependencies = {}
    traverse( ast, {
        ImportDeclaration ( { node } ) {
            const dirname = path.dirname( filename )
            const newFile = path.join( dirname, node.source.value )
            dependencies[ node.source.value ] = newFile
        }
    })
    // 因为代码是ES Module的代码，浏览器不能直接运行，所以将源代码进行一次编译
    const { code } = babel.transformFromAst( ast, null, {
        presets: [ "@babel/preset-env" ]
    } )
    return {
        filename,
        dependencies,
        code
    }
}

const makeDependenciesGraph = ( entry ) => {
    const entryModule = moduleAnalyser( entry )
    const graphArray = [ entryModule ]
    for ( let i = 0; i < graphArray.length; i++ ) {
        const item = graphArray[ i ]
        const { dependencies } = item
        if ( dependencies ) {
            for ( let j in dependencies ) {
                graphArray.push( moduleAnalyser( dependencies[ j ] ) )
            }
        }
    }
    const graph = {}
    graphArray.forEach(item => {
        graph[ item.filename ] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })

    return graph
}

const generateCode = ( entry ) => {
    const graph = JSON.stringify( makeDependenciesGraph( entry ) )
    return `
        ( function( graph ) {
            function require( module ) {
                // 因为eval执行中的代码是相对路径，此函数将它转为绝对路径
                function localRequire( relativePath ) {
                    return require( graph[ module ].dependencies[ relativePath ] );
                }
                var exports = {};
                // 因为每个模块导出怕污染全局环境，所以都是一个闭包
                ( function( require, exports, code ) {
                    eval( code )
                } )( localRequire, exports, graph[module].code );
                return exports
            };
            require( '${entry}' );
        } )( ${graph} );
    `
}

const code = generateCode( './src/index.js' )
console.log( code )
```

> 源代码经过编译后，有 `require` 方法和 `exports`对象，这两个在浏览器中都未实现，因此需要我们手写


### webpack性能优化

####  跟上技术的迭代（`Node`,`Npm`,`Yarn`）
####  在尽可能少的模块上应用`Loader`

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}
```
####  `Plugin`尽可能精简并确保可靠
####  `resolve`参数合理配置

```
/*
    下面配置的extensions和mainFiles属性都要合理配置，webpack会搜索相应文件，如果滥用，会影响webpack打包速度
*/
module.exports = {
    resolve: {
        // 此配置的意思是，当我去引入一个其他目录下的模块的时候，我会先到这个目录下去找.js结尾的文件，然后在找以.jsx结尾的文件
        extensions: ['.js', '.jsx'],
        // 此配置的意思是，当我去引入一个目录下的内容的时候，我会先去尝试引入以index开头的这个文件，在去尝试引入以child开头的这个文件
        mainFiles: ['index', 'child'],
        alias: {
            child: path.resolve(__dirname, '../src/child')
        }
    }
}
```
#### 使用`DllPlugin`提高打包速度

```
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
}
```
#### 使用`noParse`提高打包速度

```
module.exports = {
    module: {
        noParse: /lodash/
    }
}
```

`noParse`的意思是直接通知`webpack`哪些库不去进行解析

#### 控制包文件大小

#### 合理使用sourceMap




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

```flow
    st=>start: JavaScript（我们可以通过JavaScript去实现我们页面上的视觉的一些变化，主要意思是触发视觉变化）
    op1=>operation: Style（有了上一步的视觉变化，浏览器要重新对样式进行计算 ）
    op2=>operation: Layout（把元素按照计算后的样式，绘制到页面上，它要知道元素的大小和元素的位置）
    op3=>operation: Paint（真正的把元素画到页面上）
    op4=>operation: Composite（把不同的层，组合起来，最后合成到一起，显示给用户）
    
    st->op1->op2->op3->op4
```

#### 不触发`Layout`

`Layout`关心的是位置和大小，所以样式修改如果不是`宽度`，`高度`这样的位置信息的话，它就不会触发我们的`Layout`，比如修改背景颜色，阴影大小等就不会触发`Layout`


#### 不触发`Layout`也不触发`Repaint`


| 不触发`Layout`和`Repaint`的属性 |
| ---- |
| `transform` |
| `opacity`   |


上述两个属性虽然可以只影响我们`Composite`的过程，但是要把属性所影响到的元素提取到一个单独的`图层`里

设置元素CSS属性`will-change:transform`，浏览器就会将这个元素提取到一个单独的`图层`里



### Reflow

首次页面加载完之后，把元素绘制到页面上的过程，我们叫`Layout`
之后页面上发生了一些视觉上的变化导致再次`Layout`，这个过程称之为回流，也就是`Reflow`

|  触发Reflow |
| ------- |
| 当你增加,删除,修改`DOM`结点时,会导致`Reflow`或`Repaint`（一般情况下导致了`Reflow`基本上会`Repaint`） |
| 当你移动`DOM`的位置，或是搞个动画的时候 |
| 当你修改`CSS`样式的时候 |
| 当你`Resize`窗口的时候，或是滚动的时候 |
| 当你修改网页的默认字体时 |

#### layout thrashing（布局抖动）

当你出现`Reflow`的时候，还有可能导致`布局抖动`

`布局抖动`产生的原因是因为有连续的读写，而且每一次我们的读操作，都会强制我们的`布局`立即进行一个重新的计算，这样就会导致有连续不断的`强制回流`发生，连续不断的`强制回流`就会导致我们页面的一个`布局抖动`，结果就是我们的页面变的非常的卡顿

| 避免`layout thrashing` |
| ------- |
| 避免回流 | 
| 读写分离 |

##### 例子

```
let cards = document.getElementsByClassName( 'cards' )

const update = ( timestamp ) => {
    for ( let i = 0; i < cards.length; i++ ) {
        cards[i].style.width = ( ( Math.sin( cards[i].offsetTop + timestamp / 1000 ) + 1 ) * 500 ) + 'px'
    }
    window.requestAnimationFrame( update )
}
window.addEventListener( 'load', update )
```





### Repaint

页面要呈现的内容统统画在屏幕上,就是`Repaint`（重绘）

| 触发Repaint |
| ---- |
| `DOM`改动 | 
| `CSS`改动 |








## 性能优化

### 性能优化工具

| 工具 |
| ---- |
| `WebPageTest` |
| `LightHouse` |
| `devTools` |

### 性能指标

| 指标 | 描述 | 影响因素 |
| ---- | ---- | ----- |
| `TTFB`尽量小 | `TTFB`表示请求发出到请求回来到底要经历多久 | 后台处理能力<br/>网络的情况|
| `Speed Index` | `Speed Index`（速度指数）的标准是`4s`| |
| 页面加载时间尽量小 | | |
| 首次渲染时间尽量小 | | |
| 交互响应足够快 | | |
| 画面足够流畅 | `1秒`不低于`60帧` |  |
| 异步请求足够快 | 所有的异步请求能在`1s`內把数据返回回来 | |


### RAIL测量模型

#### Response

`R`代表`Response`响应
处理事件应在`50ms`以內完成

#### Animation

`A`代表`Animation`动画
每`10ms`产生一帧

#### Idle

`I`代表`Idle`空闲
尽可能增加空闲时间


#### Load


`L`代表`Load`加载
在`5s`內完成内容加载并可以交互


### 优化

#### 代码优化

##### JAVASCRIPT开销

`JAVASCRIPT`的开销在于`加载`，`执行`，`解析&编译`

###### 解决方案

`Code splitting`代码拆分，按需加载
`Tree shaking`代码减重

| 从`解析`和`执行`来看 |
| -------- |
| 避免长任务 |
| 避免超过`1KB`的行间脚本 |
| 使用`requestAnimationFrame`和`requestIdleCallback`进行时间调度 |


##### V8编译原理

`V8`拿到`JS脚本`之后首先会进行`解析`的工作，把它翻译成`抽象语法树`。它先把文本识别成字符，然后在把里面重要的信息提取出来变成一些`节点`，然后存储在一定的数据结构里。接下来利用这个数据结构在去理解写的东西是什么含义，理解这个是什么含义就是`解释器（Interpreter）`做的事情。然后在把代码变成机器码运行之前，编译器会进行一些优化工作，所以`V8`的编译器有优化功能。

```flow
start=>start: JS
op1=>operation: Parse it
op2=>operation: Abstract Syntax Tree
op3=>operation: Interpreter
op4=>operation: Optimising Compiler 
op5=>operation: Machine Code 
op6=>operation: Bytecode


start->op1->op2->op3->op4->op5->op6
```

###### 逆优化

有时编译器的优化工作做的不一定合适，所以在运行时的时候当它发现它所做的优化不合适的时候，它会发生一个`逆优化`的过程，如果发生`逆优化`的情况，反而会降低我们运行的效率。

```
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

##### 函数优化

像`V8`这样的`JS引擎`它会对函数默认进行一个`懒解析`，也就是说当我们这个函数真正被调用的时候，它才会去解析我们这个函数的声明的一个函数体。

`懒解析`的好处在于如果它不需要被解析的话，我们也不需要为它去创建一个语法树。在堆的内存空间上也不用为这个函数去进行一个内存分配。


如果函数是`立即执行`的，在刚开始声明的时候我们对它是默认进行了一个`懒解析`，但是我们又发现它要`立即执行`，于是又进行了一个快速的`eager parsing（饥饿解析）`，这样导致的结果就是对同一个函数先进行`懒解析`在进行`饥饿解析`，导致效率反而降低了。

```
export default () => {
    // 通过一对括号,就可以进行eager parsing（饥饿解析）
    const add = ( ( a, b ) => a + b );
    const num1 = 1 
    const num2 = 2
    add( num1, num2 )
}
```

##### 对象优化

###### 以相同顺序初始化对象成员，避免隐藏类的调整

```
class RectArea {      // HC0
    constructor (l,w) {
        this.l = l    // HC1
        this.w = w    // HC2
    }
}

const rectOne = new RectArea(3, 4)
const rectTwo = new RectArea(5, 6)
```

```
// 反例

const car1 = { color: 'red' }   // HC0
car1.seats = 4                  // HC1（不是只包含了seats属性，它其实是包含了color和seats两个属性）

const car2 = { seats: 2 }       // HC2
car2.color = 'blue'             // HC3
```

`JS`是弱类型语言，我们在写的时候不会去强调或者声明它的类型，但对于`编译器`而言最终还是要明确一个类型。它就会在解析的时候根据自己的推断会给赋一个具体的类型。我们管这些类型叫做`隐藏类型`。在之后它所做的一些优化都是基于`隐藏类型`去做的。



###### 实例化后避免添加新属性

```
const car1 = { color: 'red' };    // In-object属性
car1.seats = 4;                   // Normal/Fast属性
```

`In-object`属性是这个对象从开始创建就带有的属性
`Normal/Fast`属性是存储在`property store`里，需要通过`描述数组`间接查找

###### 尽量使用`Array`代替`array-like`对象


```
Array.prototype.forEach.call( arrayLike, ( value, index ) => {
    console.log( `${index}:${value}` )
})
```

> 不如在真实数组上效率高

```
const arr = Array.prototype.slice.call( arrayLike, 0 );

arr.forEach( ( value, index ) => {
    console.log( `${index}:${value}` )
} )
```

> 最好还是先把这种`类数组`转成`数组`然后在去进行遍历



###### 避免读取超过数组的长度

```
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

> 首先会造成`undefined`和数字进行比较，并且还会让`array[3]`沿`原型链`进行查找

###### 避免元素类型转换


```
const array = [ 3, 2, 1 ];    // PACKED_SMI_ELEMENTS
array.push(4.4)               // PACKED_DOUBLE_ELEMENTS
```

> 原先类型是`PACKED_SMI_ELEMENTS`，加入`4.4`之后类型变成了`PACKED_DOUBLE_ELEMENTS`



##### HTML优化

| HTML优化 |
| ---- |
| 减少`iframes`使用 |
| 压缩空白符 |
| 避免节点深层级嵌套 |
| 避免`table布局` |
| 删除注释 |
| `CSS`&`Javascript`尽量外链 |
| 删除元素默认属性 |


##### CSS优化

| CSS优化 |
| ----- |
| 降低`CSS`对渲染的阻塞 |
|  利用`GPU`进行完成动画 |
| 使用`contain`属性  |
| 使用`font-display`属性 |


#### 资源优化

##### 资源的加载顺序

###### preload


`preload`只管加载不管解析

```
<link rel="preload" href="img/product.svg" as="image"> // 优先加载图片

// 当优先加载字体时必须要设置crossorigin属性
<link rel="preload" href="https://fonts.gstatic.com/font.woff2" as="font" type="font/woff2" crossorigin="anonymous">   // 优先加载字体
```

###### prefetch

`prefetch`关注的是后续可能会用到的资源，在页面有空闲的时候，加载后面需要用到的资源

```
<link rel="prefetch" as="style" href="product-font.css">
```



##### 资源的压缩与合并

减少`HTTP`请求数量
减少请求资源的大小


##### 图片优化


###### 图片格式比较


| 格式 | 优点 | 缺点 |
| ---- | ---- | ---- |
| `JPEG/JPG` | 压缩比很高但是色彩保存的还很好 |  由于压缩比比较高，如果图片比较强调纹理或者边缘，它会显得非常有锯齿感或者模糊 |
| `PNG` |  可以做透明背景的图片<br>如果我们想强调一些线条，纹理，边缘的细腻程度的时候，`PNG`做的比较好  |    体积会相对较大一些  |
| `WebP` |  跟`PNG`有同样的质量，压缩比比`PNG`还高  |  浏览器兼容性不好  |


###### 加载优化


| 方案 | 说明 |
| ---- | ---- |
|  图片懒加载  | `<img src="" loading="lazy">` |
| 渐进式图片 | 优点是始终可以让用户看到图片的全貌，只不过刚开始不太清晰逐渐给它加载清楚<br>等待时间是跟图片的大小和质量有关 |
| 响应式图片 |  `<img src="lighthouse-200.jpg" sizes="50vw" srcset="lighthouse-100.jpg 100w,lighthouse-200.jpg 200w,lighthouse-1800.jpg 1800w">` |


##### 字体优化


| 字体的两个问题 |  描述 |
| ------ | ----- |
| `FOIT`(Flash Of Invisible Text)  | 文字从看不到到看到，这样一个闪烁变化的过程 |
| `FOUT`(Flash Of Unstyled Text) | 文字开始看上去是一种样式，后来经过我们的样式渲染之后，又变成了另外一种字体，这个之间会有一个变化和闪动的过程 |

###### font-display

| `font-display`的值 | 描述 |
| ------ | -------- |
| auto | 让浏览器自动做选择 |
| block | `3s`之前如果还没下载完则先不显示，`3s`之后如果字体下载完了就可以去展示了，如果`3s`之后还没下载完那就先用一个默认的字体临时去显示，直到下载完了在换成你的字体 |
| swap | 开始先用一个默认的字体进行展示，直到需要的字体下载完成，在给替换成你的字体 |
| fallback | `100ms`之前如果还没下载完则先不显示，`100ms`之后如果字体下载完了就可以去展示了，如果`100ms`之后还没下载完那就先用一个默认的字体临时去显示，直到下载完了在换成你的字体  |
| optional | 浏览器可以判断用户的网络的一个速度情况，如果判断速度比较好，就用下载完的字体，如果判断网络情况不佳，预期短时间内很难把字体下载下来，那就用一个默认的字体，但是有一个问题是，一旦浏览器做出了选择，就不会在进行字体的替换了 |


#### 传输加载优化


 | 方法 | 描述 |
 | --- |  --- |
 | `Gzip`压缩 |  |
 | 启用`Keep Alive` |  |
 | `HTTP`缓存 | |
 | `Service Workers` |    延长了首屏时间，但页面总加载时间减少<br>只能在`localhost`或`https`下使用 |
 | `HTTP2` | |
 | 服务端渲染`SSR` | 加速首屏加载<br/>更好的`SEO` |
 
 
##### HTTP缓存

| 缓存的分类 |
| ------ |
| 强缓存 |
| 协商缓存 |


###### `Expires`

`Expires`的值表示的是绝对时间

`Expires: Thu,21 Jan 2017 23:39:02 GMT`


######   `Cache-Control`


`Cache-Control: max-age=3600`

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


```
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



###### `Last-Modified`和`If-Modified-Since`

它通过对比上次修改时间以验证资源是否需要更新，在拿到资源文件的时候服务器会通过`Last-Modified`下发一个时间，在下次请求时会在请求头中加`If-Modified-Since`


###### `Etag`和`If-None-Match`


它通过对比资源的签名判断是否使用缓存，服务器下发资源的时候，会给你`Etag`值（资源对内容会产生唯一的一个签名，我们叫它数据签名），在下次请求时会在请求头中加`If-None-Match`


 

### 提升页面性能的方法有哪些


| 方法 |
| ----- |
|    资源压缩合并，减少`HTTP`请求   | 
| 非核心代码异步加载 |
| 使用`CDN` |
| 预解析`DNS` |


#### 非核心代码异步加载

| 异步加载的方式 | 描述 |
| ------ | ----- |
| 动态脚本加载 | 创建个`script`标签，把标签加到`body`上面去 |
| `defer` | 在`HTML`解析完之后才会执行，如果是多个，按照加载的顺序依次执行 |
| `async` | 在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关 |


```
<script src="" defer></script>
<script src="" async></script>
```



#### 预解析DNS


```
<link rel="dns-prefetch" href="www.baidu.com"/>
```

```
// 强制打开a标签的DNS预解析，默认a标签的DNS预解析开启，例如HTTP协议中
// HTTPS中有些浏览器会关闭a标签的DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on" >
```


### 渲染优化


#### `CSS`放前面，`JS`放后面

####  懒加载(图片懒加载，下拉加载更多)

```
<script>
    var img = document.getElementById("img")
    img.src = img.getAttribute("data-realsrc")
</script>
<body>
    <img id="img" src="preview.png" data-realsrc="abc.png"/>
</body>
```

#### 减少DOM查询，对DOM查询做缓存

```
// 未缓存DOM查询
var i
for(i=0;i<document.getElementsByTagName('p').length;i++){}

// 缓存了DOM查询
var pList = document.getElementsByTagName('p')
var i
for(i=0;i<pList.length;i++){}
```

#### 减少DOM操作,多个操作尽量合并在一起执行

```
<script>
    var listNode = document.getElementById('list')
    var frag = document.createDocumentFragment()
    var li
    for(var x=0;x<10;x++){
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

#### 事件节流

#### 尽早执行操作(如`DOMContentLoaded`)































  
  
  
  








	
		








      
  
       














 
 
 
