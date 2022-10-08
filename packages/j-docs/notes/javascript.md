---
title: JAVASCRIPT
titleTemplate: 学习笔记
outline: 'deep'
---


[toc]

# JAVASCRIPT

## 原生JS拖拽的封装

```html
<style type="text/css">
	#div1{
	   width:100px;
	   height:100px;
	   position:absolute;
	   background:red;
	}
</style>

<script>
    var oDiv=document.getElementById('div1');
    drag(oDiv)
    
    function drag(obj){
		obj.onmousedown=function(ev){
		  var ev = ev || event;
		  var disX = ev.clientX-this.offsetLeft
		  var disY = ev.clientY-this.offsetTop
		  if(obj.setCapture){ obj.setCapture() }
		  document.onmousemove=function(ev){
			  var ev = ev||event;
			  var L = ev.clientX-disX
			  var T = ev.clientY-disY
			  if( L < 0 ){ L=0; }
			  else if( L > document.documentElement.clientWidth-obj.offsetWidth ){
				  L = document.documentElement.clientWidth-obj.offsetWidth
			  }
			  if(T<0){ T=0; }
			  else if( T > document.documentElement.clientHeight-obj.offsetHeight ){
				  T = document.documentElement.clientHeight-obj.offsetHeight
			  }
			  obj.style.left = L + 'px'
			  obj.style.top = T + 'px'
		  }
		  document.onmouseup = function () {
			  document.onmousemove = document.onmouseup=null;
			  if( obj.releaseCapture ) { obj.releaseCapture(); }
		  }
		  return false
	   }
	}
</script>

<body>
    <div id="div1"></div>
</body>
```

```js
// 面向对象编写拖拽

var d1 = new Drag('div1');
d1.init();

function Drag(id){
	this.oDiv = document.getElementById(id);
	this.disX = 0;
	this.disY = 0;
}

Drag.prototype.init = function(){
	var This = this;
	this.oDiv.onmousedown = function(ev){
		var ev = ev || window.event;
		This.fnDown(ev);
		return false;
	}
}

Drag.prototype.fnDown = function(ev){
	var This = this;
	this.disX = ev.clientX - this.oDiv.offsetLeft;
	this.disY = ev.clientY - this.oDiv.offsetTop;
	document.onmousemove = function(ev){
		var ev = ev || window.event;
		This.fnMove(ev);
	}
	document.onmouseup = this.fnUp;				
}

Drag.prototype.fnMove = function(ev){
	this.oDiv.style.left = ev.clientX - this.disX + 'px';
	this.oDiv.style.top = ev.clientY - this.disY + 'px';
}

Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
}
```

## 数据劫持

```js
var data = {
	title : '新闻',
	num : 1
}

observer(data);

console.log(data)

function observer(obj){
	Object.keys(obj).forEach((item) => {
		defineReactive(obj,item,obj[item]);
	});
}

function defineReactive(obj,key,value){
	Object.defineProperty(obj,key,{
		get () {
			return value;
		},
		set (newValue) {
			value = newValue;
		}
	})
}
```

## 面向对象

### 面向对象编程的特点

抽象-抓住核心问题<br/>
封装-只能通过对象来访问方法<br/>
继承-从已有对象上继承出新的对象<br/>
多态-多对象的不同形态<br/>

### 面向对象的语法

对象下面的变量，叫做对象的属性<br/>
对象下面的函数，叫做对象的方法

### 面向对象程序

```js
var obj = new Object();
obj.name = '小明';
obj.showName = function(){
	console.log(this.name);
}
obj.showName();
```

### 面向对象中的工厂方式

```js
function CreatePerson (name) {
	//原料
	var obj = new Object();
	//加工
	obj.name = name;
	obj.showName = function(){
		console.log(this.name);
	}
	//出厂
	return obj;
}

var p1 = CreatePerson('小明');
p1.showName();
```

### 面向对象的构造函数

```js
function CreatePerson(name){
	this.name = name;
	this.showName = function(){
		console.log(this.name);
	}		    	
}

//当new去调用一个函数，这个时候，函数中的this就是创建出来的对象，而且函数的返回值直接就是this了(隐式返回)

// new后面调用的函数叫做构造函数
var p1 = new CreatePerson('小明');
var p2 = new CreatePerson('小强');

p1.showName();
p2.showName();

console.log(p1.showName==p2.showName); // false
```

### 原型

去改写对象下面公用的方法或者属性，让公用的方法或者属性在内存中只存在一份,提高性能<br/>
如果属性是变化的就不能放在原型上

```js
// prototype要写在构造函数的下面
function CreatePerson(name){
    this.name = name;		    	
}
CreatePerson.prototype.showName = function(){
	console.log(this.name);
}
var p1 = new CreatePerson('小明');
p1.showName();
```



### 原型链


实例对象与原型之间的连接叫做原型链,原型链的最外层是`Object.prototype`

原型链的本质是让原型对象等于另一个类型的实例

所有函数的默认原型都是`Object`的实例



### 继承

在原有对象的基础上略做修改，得到一个新的对象，不影响原有对象的功能


#### 混入式继承

属性的继承调用父类的构造函数，利用call改变指向

方法的继承采用`for...in...`的形式拷贝继承

```js
//父类
function CreatePerson(name,sex){                                    
    this.name = name;
    this.sex = sex;
}
CreatePerson.prototype.showName = function(){
	console.log(this.name);
}

var p1 = new CreatePerson('小明','男');
p1.showName();

//子类
function CreateStar(name,sex,job){                                 
    CreatePerson.call(this,name,sex);
    this.job = job;
}

CreateStar.prototype.showJob = function(){
    console.log(this.job);
}

extend(CreateStar.prototype,CreatePerson.prototype);

var p2 = new CreateStar('黄晓明','男','演员');
p2.showName();

function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}
```

#### 类式继承

利用构造函数（类）继承<br/>
做属性和方法继承的时候要分开继承


```js
// 父类
function A(){                  
    this.name = [1,2,3];
}
A.prototype.showName = function(){
    console.log(this.name);
}
// 子类
function B(){                 
    A.call(this);
}
// 避免属性继承，只有方法的继承
var F = function(){};
F.prototype = A.prototype;
B.prototype = new F();
// 修正指向问题
B.prototype.constructor = B;   


var b1 = new B();
b1.showName();
b1.name.push(4);
console.log(b1.name)   // [1, 2, 3, 4]
var b2 = new B();
console.log(b2.name);  // [1,2,3]
```

#### 原型继承

创建一个构造函数<br/>
构造函数的原型指向对象<br/>
然后调用`new`操作符创建实例并返回这个实例<br/>

```js
var a = {
	name : '小明'
}
var b = cloneObj(a);
b.name = '小强';

console.log(b.name); // 小强
console.log(a.name); // 小明
	
function cloneObj (obj) {
	var F = function () {};
	F.prototype = obj;
	return new F();
}
```


### 包装对象

基本类型会找到对应的包装对象类型<br/>
然后包装对象把所有的属性和方法给了基本类型<br/>
然后包装对象消失

```js
// 基本类型都有自己对应的包装对象
var str = 'hello';
str.charAt(0);
```


## 类型的比较

> 对象类型的比较，值和引用都相同才行
```js
var a = [1,2,3];
var b = [1,2,3];
console.log(a == b);  // false


var a = [1,2,3];
var b = a;
console.log(a == b)   // true
```

> 基本类型的比较只要值相同就可以


```js
var a = 5;
var b = 5;
console.log(a == b); // true
```

> 基本类型赋值的时候只是值的复制

```js
var a = 5;
var b = a;
b += 3;
console.log(a);   // 5
console.log(b);   // 8
```

> 对象类型赋值不仅是值的复制，而且也是引用的传递

```js
var a = [1,2,3];
var b = a;
b.push(4);
console.log(b);   // [1,2,3,4]
console.log(a);   // [1,2,3,4]

```

> 只要是赋值就必然会重新生成

```js
var a = [1,2,3];
var b = a;
b = [1,2,3,4];
console.log(b);		// [1,2,3,4]
console.log(a);     // [1,2,3]
```

## 常用的属性和方法

### hasOwnProperty()

判断是不是对象自身下面的属性

```js
var arr = [];
arr.num = 10;
Array.prototype.num2 = 20;

console.log( arr.hasOwnProperty('num') );  // true
console.log( arr.hasOwnProperty('num2') ); // false
```

### constructor

查看对象的构造函数

```js
function Fn () {}
var f = new Fn();
console.log(f.constructor);  // ƒ Fn () {}
```

### instanceof

查看对象与构造函数在原型链上是否有关系

```js
function Fn () {}
var f = new Fn();
console.log(f instanceof Fn);   // true
```

### toString()


> 系统对象下面的都是自带的

```js
var arr = [];
console.log(arr.toString == Object.prototype.toString);  // false
```

> 自己写的对象都是通过原型链找`Object`下面的


```js
function Fn () {}
var f = new Fn();
console.log(f.toString == Object.prototype.toString);   //true
```

> 利用`toString`做类型的判断

```js
var arr = new Array();
console.log(Object.prototype.toString.call(arr) == '[object Array]');   // true
```


## 自定义事件

主要是跟函数有关系<br/>
就是让函数能够具备事件的某些特性

### 自定义事件实现

```html
<script>
    var oSpan=document.getElementById('span1');
    
    bindEvent(oSpan, 'show', function(){
        console.log(3);
    })
    bindEvent(oSpan, 'show', function(){
        console.log(4);
    })
    bindEvent(oSpan, 'hide', function(){
        console.log(5);
    })
    
    fireEvent(oSpan, 'show'); 
    
    function bindEvent(obj, events, fn){
        obj.listeners = obj.listeners || {};
        obj.listeners[events] = obj.listeners[events] || [];
        obj.listeners[events].push(fn);
        if(obj.addEventListener){
            obj.addEventListener(events, fn, false);  
        } else{
            obj.attachEvent('on' + events, fn);
		}
	}
	
	// 主动触发自定义事件
	function fireEvent(obj, events){                     
	   for(var i = 0; i < obj.listeners[events].length; i++){
	       obj.listeners[events][i]();
	   }
	}
</script>

<body>
    <span id="span1">span</span>
</body>
```


```js
var	customeEvent = new Event('custome')
window.addEventListener('custome', function(){
	console.log('custome');
})
window.dispatchEvent(customeEvent);
```

## AJAX


```js
function ajax(method, url, data, success) {
  	var xhr = null;
	if(window.XMLHttpRequest){
	  xhr = new XMLHttpRequest();
	} else {
	   // IE6以下  new ActiveXObject('Microsoft.XMLHTTP')
	  xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	if( method == 'get' && data ) {
		url += '?' + data; 
	}
	xhr.open(method, url, true);
	if(method == 'get'){
		xhr.send();
	} else {
	   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	   xhr.send(data);
	}
	xhr.onreadystatechange = function () {
	    if (xhr.readyState == 4) {
		    if (xhr.status == 200) {
				success && success(xhr.responseText);
		    } else {
				console.log('出错了，ERR：' + xhr.status);
			}
	  	}
	}
}
```

> readyState


| 状态码 | 描述 |
| --- | --- |
| 0 | （未初始化）还没有调用`send()`方法 |
| 1 | （载入）已调用`send()`方法，正在发送请求 |
| 2 |（载入完成）`send()`方法执行完成，已经接收到全部响应内容 |
| 3 |（交互）正在解析响应内容  |
| 4  | （完成）响应内容解析完成，可以在客户端调用了 |



  
 
 

### JSONP

```js
function fn (data) {
    // 数据处理
}

var oScript = document.createElement('script');
oScript.src = "url?callback=fn";
document.body.appendChild(oScript);
```

### IE实现跨域请求

```js
var oXDomainRequest = new XDomainRequest();
oXDomainRequest.onload = function(){
	// 请求加载完成
	console.log(this.responseText);
}
```

### 进度事件

```js
var xhr = new XMLHttpRequest();
// 上传进度对象
var oUpload = xhr.upload;
// 上传进度事件
oUpload.onprogress = function (ev) {
    // ev.total为要发送的总量
    // ev.loaded为已发送的总量
    var iScale = ev.loaded / ev.total
}
```




## 图片预加载

当我们给`Image`对象的`src`属性赋予一个`url`的时候，这个`Image`对象就会去加载`url`资源<br/>
加载完成以后的资源被保存到了浏览器的缓存文件夹里<br/>
当我们要去调用这个`url`地址的时候,直接是从缓存文件夹读取到的,所以速度很快


```html
<script type="text/javascript">
    var oImage = new Image()
    var oImg = document.getElementById('img')
    
    oImage.src = 'https://test.jpg'
    
    // 资源加载完成时触发
    oImage.onload = function(){
        console.log('加载完成')
        document.onclick = function(){
            oImg.src = 'https://test.jpg'
        }
    }
    
    // 资源加载失败时触发
    oImage.onerror = function () {
        console.log('加载失败')
    }
</script>

<body>
    <img id="img"/>
</body>
```
    
## JS中的运动

### 定时器在浏览器中的问题

当浏览器中的页面被最小化或者切换时,定时器会放缓,如果页面中有多个定时器,就容易出现问题


### 速度版运动框架

```js
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr]
	} else {
		return getComputedStyle(obj, false)[attr]
	}
}

function startMove (obj, json, fn) {
	clearInterval(obj.iTimer)
	var iCur = 0
	var iSpeed = 0
	obj.iTimer = setInterval(function(){
		var iBtn = true
		for(var attr in json){
			var iTarget = json[attr]
			if(attr === 'opacity'){
				iCur = Math.round(getStyle(obj, 'opacity') * 100)
			} else{
				iCur = parseInt(getStyle(obj,attr))
			}
			iSpeed = (iTarget-iCur) / 8
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
			if(iCur !== iTarget) {
				iBtn = false
				if(attr === 'opacity' ) {
					obj.style.opacity = (iCur+iSpeed) / 100
					obj.style.filter = 'alpha(opacity=' + (iCur+iSpeed) + ')'
				} else {
					obj.style[attr] = iCur + iSpeed + 'px'
				}
			}
		}
		if(iBtn) {
			clearInterval(obj.iTimer)
			fn && fn.call(obj)
		}
	},30)
}
```

### 时间版运动框架

```js
function getStyle (obj, attr) {
    if (obj.currentStyle) {
    	return obj.currentStyle[attr]
    } else {
    	return getComputedStyle(obj,false)[attr]
    }
}

var Tween = {
    linear: function (t, b, c, d){
        //匀速                  
        return c*t/d+b;
    },
    easein: function (t, b, c, d) {
        //加速曲线     
        return c*(t/=d)*t+b;
    }
}

function startMove (obj, json, times, fx, fn) {
	var iCur = {}
	for (var attr in json) {
		iCur[attr] = 0
		if (attr === 'opacity') {
			iCur[attr] = Math.round(getStyle(obj,'opacity') * 100)
		} else {
			iCur[attr] = parseInt(getStyle(obj,attr))
		}
	}
	var startTime = Date.now()
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		var changeTime = Date.now();
		var t = times - Math.max(0, startTime - changeTime + times)
		for(var attr in json){
			var value = Tween[fx](t, iCur[attr], json[attr]-iCur[attr], times)
			if (attr === 'opacity') {
				obj.style.opacity = value/100
				obj.style.filter = 'alpha(opacity=' + value + ')'
			} else {
				obj.style[attr] = value + 'px'
			}
		}
		if(t === times) {
			clearInterval(obj.timer)
			fn && fn.call(obj)
		}
	},13)
}
```


> 速度版运动框架，不能保证同时到达，时间版运动框架，可以同时到达


## 正则表达式

### 正则的写法

```js
var reg = /a/i                     
var reg = new RegExp('a','i')
```

### 正则中常用的方法

> test()

正则去匹配字符串，如果匹配成功，就返回真，如果匹配失败，就返回假  

```js
var str = 'abcdef'
var reg = /b/
console.log(reg.test(str))
```

> search()

正则去匹配字符串,如果匹配成功,就返回匹配成功的位置,如果匹配失败就返回`-1`

```js
var str = 'abcdef'
var reg = /b/
console.log(str.search(reg)) 
```


> match() 

正则去匹配字符串,如果匹配成功,就返回匹配成功的数组,如果匹配不成功,就返回`null`

```js
var str = 'sdk123sdk'
var re = /123/
console.log(str.match(re))
```

> replace()

正则去匹配字符串,匹配成功的字符去替换成新的字符

```js
var str = 'aaa'
var reg = /a/
str = str.replace(reg, 'b')
console.log(str)
```

### 正则中的`[]`

`[]`的整体代表一个字符<br/>
`^`写在`[]`里面的话就代表排除的意思

### 转义字符



|  字符 | 含义 |
| ---- | ---- |
| `\s`   |    空格   |
| `\S`  | 非空格 |
| `\d` | 数字 |
| `\D` | 非数字 |
| `\w` | 字符 (数字,字母,下划线`_`) |
| `\W` | 非字符 |
| `.` | 任意字符 |
| `\b` | 独立的部分(起始,结束,空格) |
| `\B` | 非独立的部分 |
| `\1` | 重复的第一个子项 |



### 量词

| 字符 | 描述 |
| ---- | ---- |
|   `+`   |  至少出现一次 |
| `\|` | 或的意思 |
| `{4,7}` |  最少出现4次,最多出现7次 |
| `{4,}`  | 最少出现4次 |
| `{4}` | 正好出现4次 |
| `?` | 0次或者1次 |
| `*` | 至少出现0次  |




### 标识符

默认区分大小写，如果不区分大小写,在正则的最后加标识`i`<br/>
想全部查找,要加标识`g`<br/>
`^`在正则最开始位置代表起始的意思<br/>
`$`在正则的最后位置代表结束的意思


### 常用正则表达式

```js
// 验证中文姓名的正则
var regCheckCnName = /^([\u4E00-\u9FA5\uF900-\uFA2D\.]){0,}$/;

// 验证英文姓名的正则
regCheckEnName = /^([a-zA-Z\.\s]){0,}$/;

// 验证手机的正则
var regCheckCnMobile = /^1(3[0-9]|5[0-9]|8[0-9]|4[0-9]|7[0-9])\d{8}$/;

// 验证公司的正则
var regCheckComName = /^([\u4E00-\u9FA5\uF900-\uFA2D]|[a-zA-Z\d\s\.\,\'\_\-\(\)\（\）]){0,}$/;

// 验证部门的正则
var regCheckDepar = /^([\u4E00-\u9FA5\uF900-\uFA2D]|[a-zA-Z\s\（\）\(\)\/\-]){0,}$/;

// 验证职务的正则
var regCheckRank = /^[\/\.\,\sa-zA-Z\u4e00-\u9fa5\uF900-\uFA2D]+$/;

// 验证邮箱的正则
var regCheckEmail = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9-]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

// 验证中文电话的正则
var regCheckTelCn = /^([0-9]{1,4}[-]){1}([0-9]{1,4}[-]){1}([1-9][0-9]{7,8})([-][0-9]{0,5}){0,1}$/;

// 验证英文电话的正则
var regCheckTelEn = /^([0-9]{1,4}[-]){1}([1-9][0-9]{5,11})([-][0-9]{0,6}){0,1}$/;

// 验证中文传真的正则
var regCheckTelCn = /^([0-9]{1,4}[-]){1}([0-9]{1,4}[-]){1}([1-9][0-9]{7,8})([-][0-9]{0,5}){0,1}$/;

// 验证英文传真的正则
var regCheckTelEn = /^([0-9]{1,4}[-]){1}([1-9][0-9]{5,11})([-][0-9]{0,6}){0,1}$/;

// 验证国内邮编
var checkCnZipCode = /^[0-9]{6}$/;

// 验证港澳台邮编
var checkgatZipCode = /^[0-9]{5,6}$/;

// 验证国外邮编
var checkEnZipCode = /^[0-9a-zA-Z]{3,}$/;

// 验证密码的正则
var checkPassword = /^([a-zA-Z0-9]){0,}$/;

```


    

## DOM相关知识

### 文档节点

文档节点是每个文档的根节点,文档节点只有一个子节点,即`<html>`元素,我们称之为文档元素,文档元素是文档的最外层元素



### document

在浏览器中,`document`对象表示整个`HTML`页面,而且`document`对象是`window`对象的一个属性,因此可以将其作为全局对象来访问



### 节点

`javascript`中的所有节点类型都继承自`Node`类型,每个节点都有一个`nodeType`属性,用于表明节点的类型

每个节点都有一个`childNodes`属性,其中保存着一个`NodeList`对象

`NodeList`是一种类数组对象,用于保存一组有序的节点, 应该尽量减少访问`NodeList`的次数,因为每次访问`NodeList`,都会运行一次基于文档的查询

```js
// 访问保存在NodeList中的节点,通过方括号的方法
var firstChild = someNode.childNodes[0]

// 访问保存在NodeList中的节点,通过item方法
var secondChild = someNode.childNodes.item(1)
```


### DOM的属性

| 属性 | 描述 | 备注 |
| ---- | --- | ---- |
| `childNodes` |  子节点列表集合 | 在标准下包含了文本和元素类型的节点，也会包含非法嵌套的子节点<br/>在非标准下只包含元素类型的节点 |
| `children`  | 子节点列表集合 | 在标准下和非标准下都只包含元素类型的节点	 |
| `nodeType` | 当前元素的节点类型 |  |
| `attributes` | 属性列表集合 | |
| `firstChild` | 获取元素的第一个子节点 |  标准下会包含文本类型的节点<br/>在非标准下只包含元素类型的节点 |
| `firstElementChild` | 获取第一个元素类型的子节点 | 标准下获取第一个元素类型的子节点<br/>非标准下是没有这个属性的 |
| `lastChild` | 获取元素最后一个子节点 | 标准下会包含文本类型的节点<br/>在非标准下只包含元素类型的节点 |
| `lastElementChild` | 获取最后一个元素类型的子节点 | 标准下获取最后一个元素类型的子节点 <br/>非标准下是没有这个属性的 |
| `nextSibling` | 下一个兄弟节点 |  标准下会包含文本类型的节点<br/> 在非标准下只包含元素类型的节点 |
| `nextElementSibling` | 获取下一个兄弟元素类型节点 | 标准下获取下一个兄弟元素类型节点<br/>非标准下是没有这个属性的|
| `previousSibling` | 上一个兄弟节点 | 标准下会包含文本类型的节点<br/>在非标准下只包含元素类型的节点 |
| `previousElementSibling`  |获取上一个兄弟元素类型节点 |  标准下获取上一个兄弟元素类型节点<br/>非标准下是没有这个属性的|
| `parentNode` | 获取当前节点的父级节点 | 没有兼容问题 |
| `offsetParent` | 获取离当前元素最近的一个有定位属性的父节点 | 如果没有定位父级，默认是`body`  |
| `offsetLeft` | 当前元素到定位父级的距离 | |
| `offsetTop` | 当前元素到定位父级的距离 | |
| `clientWidth` | 可视区宽 | 样式宽+`padding` |
| `clientHeight` | 可视区高| 样式高+`padding` |
| `offsetWidth` | 占位宽 | 样式宽+`padding`+`border` |
| `offsetHeight` | 占位高 | 样式高+`padding`+`border` |

## BOM

###  文档元素可视区的宽和高


```js
document.documentElement.clientWidth
document.documentElement.clientHeight
```

### 滚动条滚动距离(可视区顶部到文档顶部的距离)

```js
// 除谷歌浏览器
document.documentElement.scrollTop  
document.documentElement.scrollLeft 
```

```js
// 针对谷歌浏览器
document.body.scrollTop 
document.body.scrollLeft
```

### 文档高

```js
// 有兼容问题
document.documentElement.offsetHeight
// 没兼容问题
document.body.offsetHeight
```




## 移动端事件

| 事件名 | 描述 |
|  ---- | ---- |
| `ontouchstart` | 手指触摸 |
| `ontouchmove` | 手指移动 |
| `ontouchend` | 手指离开 |

### 移动端的点透

当上层元素发生点击的时候,下层元素也有点击（焦点）

#### 特性

在300ms之后,如果上层元素消失或者隐藏,目标点就会漂移到下层元素身上,就会触发点击行为

#### 解决

```js
// 阻止默认事件
document.addEventListener('touchstart',function(ev){
    ev.preventDefault()
})
```

### 事件对象

```js
// 当前位于屏幕上的所有手指的一个列表
event.touches

// 位于当前DOM元素上的手指的一个列表
event.targetTouches

// 涉及当前事件的手指的一个列表
event.changedTouches
```

### 多指操作

`gesture`相关的事件,只有`IOS`下有,安卓没有这个事件

```html
<style>
    #box{
    	width: 200px;
    	height: 200px;
    	background: red;
    	color: #FFFFFF;
    	font-size: 30px;
    }
</style>

<script>
document.addEventListener('touchstart',function(e){
	e.preventDefault();
})

window.onload = function(){
	var box = document.querySelector('#box')
	
	box.addEventListener('gesturestart', function(e){
	   // 当手指触摸元素,当前屏幕上有两根或者两根以上的手指执行
		this.style.background='blue'
	})
	box.addEventListener('gestureend', function(e){
	   // 当我们触发了gesturestart时,然后抬起手指,这时,屏幕上的手指个数少于2个或者当前元素没有手指了,就会触发gestureend
		this.style.background='red'
	})
	box.addEventListener('gesturechange',function(e){
	   // 当我们触发了gesturestart时,手指位置发生变化时执行
	   
	   // 缩放比：change时两根手指之间距离和start时两根手指之间的距离比值
	   console.log(e.scale) 
	   
	   // 旋转差：change时两根手指形成的直线和start时两根手指形成的直线,中间形成的夹角
	   console.log(e.rotation)
	})
}
</script>

<body>
    <div id="box"></div>
</body>
```



## Event对象的常见应用


| 应用 | 示例 |
| ---- | ---- |
| 阻止默认事件 | `event.preventDefault()` |
|    阻止冒泡      |   `event.stopPropagation()` |
| 事件响应优先级 |  `event.stoplmmediatePropagation()` |
| 当前所绑定的事件 |  `event.currentTarget` |
| 当前被点击的元素 |  `event.target` |
 
  
## `[]`的使用

如果是系统定义的东西，使用`[]`要加引号<br/>
使用`[]`是因为有可能内容会发生改变


```js
box["style"]["width"]
```



