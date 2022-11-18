---
title: HTML
titleTemplate: 学习笔记
outline: 'deep'
---

[toc]

# HTML


## 常见元素

| Head区元素 |
| ----- |
| meta |
| title |
| style |
| link |
| script |
| base |

| body区元素|
| ----- |
| div<br/>section<br/>article<br/>aside<br/>header<br/>footer |
| p |
| span<br/>em<br/>strong |
| table<br/>thead<br/>tbody<br/>tr<br/>td |
| ul<br/>ol<br/>li<br/>dl<br/>dt<br/>dd |
| a |
| form<br/>input<br/>select<br/>textarea<br/>button |


## HTML版本


| HTML版本 | 描述 |
| ----- | ---- |
| HTML4/4.0.1 | 写法比较灵活，标签和标签属性，大小写比较随意，导致浏览器做了很多兼容 |
| XHTML | 要求非常严格，比如所有标签必须是小写的，所有属性必须是小写的,所有属性必须要有值 |
| HTML5 | 写法没有那么严格了 |

## HTML元素嵌套关系


块级元素可以包含行内元素<br/>
块级元素不一定能包含块级元素（比如p元素不能包含div元素）<br/>
行内元素一般不能包含块级元素

:::tip
a元素在嵌套关系的计算中，是要被拿掉的，不参与计算

```html
<!--合法的,因为拿掉a元素之后，是body元素包裹div元素，肯定是合法的-->
<a>
    <div></div>
</a>
```

<br/>

```html
<!--不合法的,因为拿掉a元素后，是p元素包裹div元素，但是p元素不能包裹div元素，所以不合法-->

<p>
    <a>
        <div></div>
    </a>
</p>
```
:::

## HTML5

### 新增标签

```html
// 进度标签
<progress value="100" max="600"></progress>

<header></header>

<article></article>

<aside></aside>

<nav></nav>

<section></section>

<footer></footer>

```

### 表单验证与属性

```html
// formaction属性覆盖form元素的action属性
<form action="https://www.google.com">
    <input type="submit" value="提交" formaction="http://www.baidu.com">
</form>
```

```html
<script>
    var oText=document.getElementById('text');
    oText.addEventListener("invalid",fn,false);
    
    function fn(ev){
        // 验证反馈对象
        console.log(this.validity);
        ev.preventDefault();
    }
</script>

<body>
    <form>
        <input type="text" required id="text">
        <input type="submit">
    </form>
</body>
```

### 新增选择器

```html
<script>
    var oDiv=document.querySelector('div');
    oDiv.classList.toggle('box2');
    oDiv.style.background='red';
</script>

<body>
    <div class="box1 box2 box3">test</div>
</body>
```

### 自定义属性

```html
<script>
    oDiv=document.getElementById('div');
    console.log(oDiv.dataset)
    console.log(oDiv.dataset.test);
    console.log(oDiv.dataset.testAll);
</script>

<body>
	<div id="div" data-test="test" data-test-all="testAll"></div>
</body>
```

### 内容编辑

```html
<div contenteditable></div>
```


### 拖放属性

```html
<script>
    var aLi=document.getElementsByTagName('li');
    var oDiv=document.getElementById('div');
    
    // 元素正在拖动到放置目标时触发
    oDiv.ondragover=function(ev){
        // 用来保存，通过拖放动作，拖动到浏览器的数据
        console.log(ev.dataTransfer)
        return false;	
    }
    // 有元素拖放到元素中时执行
    oDiv.ondrop=function(ev){
        console.log(1)
    }
</script>

<body>
    <div id="div"></div>
    <ul>
        <li draggable="true">a</li>
        <li draggable="true">b</li>
        <li draggable="true">c</li>
    </ul>
</body>
```

#### 拖拽图片上传示例

```html
<script>
    oDiv=document.getElementById('div');
    oUl=document.getElementById('ul');
    oDiv.ondragenter=function(){
        oDiv.innerHTML='可以释放啦';
    }
    oDiv.ondragleave=function(){
        oDiv.innerHTML='将文件拖拽到此区域';
    }
    oDiv.ondragover=function(ev){
        ev.preventDefault();
    }
    oDiv.ondrop=function(ev){
		ev.preventDefault();
		var fs=ev.dataTransfer.files;
		for(var i=0;i<fs.length;i++){
			if(fs[i].type.indexOf('image')!=-1){
				var fd=new FileReader();
				fd.readAsDataURL(fs[i]);
				fd.onload=function(){
					// console.log(this.result)
					var oLi=document.createElement('li');
					var oImg=document.createElement('img');
					oImg.src=this.result;
					oLi.appendChild(oImg);
					oUl.appendChild(oLi);
				}
			} else{
				console.log('请上传图片类型')
			}
		}
	}
</script>

<body>
    <div id="div">将文件拖拽到此区域</div>
    <ul id="ul"></ul>
</body>
```

### 本地存储Storage

```js
// sessionStorage是窗口的临时存储,页面关闭本地存储消失,不共享
// localStorage是永久存储,共享

// 存储事件，当数据有修改或删除的情况下,就会触发,当前窗口修改时，不会触发
window.addEventListener('storage',function(ev){
	console.log(ev)
	console.log(ev.key);
	console.log(ev.newValue);
	console.log(ev.oldValue);
	console.log(ev.storageArea);
	console.log(ev.url);
},false)
```

### 多窗口之间通信

有两种方式实现多窗口之间通信

#### iframe

```html

// 当本页面和包含页面不在同一个域名下的时候，这样操作就会有跨域操作安全限制问题

<script>
    var oBtn=document.getElementById('btn');
    var oMyIframe=document.getElementById('myFrame');
    
    // 要操作一个iFrame里面的dom元素，首先要获取到iFrame引入的页面的window
    
    // oMyIframe.contentWindow为被iframe包含的页面的window对象
    let frameWindow = oMyIframe.contentWindow;
    frameWindow.document.body.style.background='red';
</script>

<body>
    <input type="button" id="btn" />
    <iframe src="" id="myFrame"></iframe>
</body>

```

```html
// 被包含的子级页面要改变父级页面
// 如果当前页面是顶级，没有被其他页面所包含，那么parent就是当前页面的window对象
// 如果被包含了则parent就是包含当前页面的父级页面的window对象
// window 当前窗口
// parent 父级窗口
// top    顶级窗口
<script>
    var oBtn=document.getElementById('btn');
    var oMyIframe=document.getElementById('myFrame');
    parent.document.body.style.background='green';
</script>

<body>
    <input type="button" id="btn" />
    <iframe src="" id="myFrame"></iframe>
</body>
```
    
#### window.open

```html
<script type="text/javascript">
    var oBtn=document.getElementById('btn')
    oBtn.onclick = function () {
        // window.open返回被打开窗口的window对象
        window.open(url)
    }
</script>

<body>
    <input type="button"  id="btn">
</body>

```

```html
<script type="text/javascript">
    // window.opener是通过window.open方法打开当前页面的窗口window
    window.opener.document.body.style.background = 'green'
</script>
<body></body>
```

#### postMessage

可以通过postMessage给另外一个窗口发送消息

```html
// index.html
<body>
    <script type="text/javascript">
        window.onload = function(){
            var oBtn=document.getElementById('btn');
            var oIframe=document.getElementById('iframe');
            oBtn.onclick = function(){
                // 注意:当本页面和包含页面不在同一个域名下的时候，这样操作就会有跨域操作安全限制问题
                // (接受消息窗口的window对象).postMessage(发送的数据)
                oIframe.contentWindow.postMessage('新内容');
            }
        }
    </script>
    <input type="button" id="btn"  />
    <iframe src="./iframe.html" id="iframe"></iframe>
</body>
```

```html
// iframe.html
<body>
    <script type="text/javascript">
        // 当窗口接收到通过postMessage发送过来的数据的时候触发message事件
        window.addEventListener('message',function(ev){
			//message事件的事件对象下保存了发送过来的数据
			//ev.data   发送过来的数据
			//ev.origin 发送消息的域
			console.log(ev.data)
			document.body.innerHTML = ev.data
		},false)
    </script>
</body>
```


### Web Worker

为JavaScript创造多线程环境,对多线程的支持非常好,允许主线程创建 Worker线程,在主线程运行的同时,Worker线程在后台运行,两者互不干扰

```js
var w = new Worker('worker.js')
w.postMessage('hi')
w.onmessage = function(ev){
    console.log(ev.data) // worker send:hi
}
```

```js
// worker.js
// self 代表子线程自身
self.onmessage=function(ev){
	console.log(ev.data)  // hi
	self.postMessage('worker send:'+ ev.data);
}
```


### Geolocation

地理位置对象

```js
// 单次定位请求
// navigator.geolocation.getCurrentPosition()

navigator.geolocation.getCurrentPosition(function(position){
    //经度
    console.log(position.coords.longitude)
    //纬度
    console.log(position.coords.latitude)
    //准确度
    console.log(position.coords.accuracy)
    //海拔
    console.log(position.coords.altitude)
    //海拔准确度
    console.log(position.coords.altitudeAccuracy)
    //行进方向
    console.log(position.coords.heading)
},function(err){
    console.log(err)
},{				
    enableHighAccuracy: true,   // 更精确的查找
    timeout: 5000,  // 请求超时的时间
    maximumAge: 5000  // 可缓存的时间
})
```

```js
// 多次定位请求
// navigator.geolocation.watchPosition()

navigator.geolocation.watchPosition(function(position){
    // 经度
    console.log(position.coords.longitude)
    // 纬度
    console.log(position.coords.latitude)
    // 准确度
    console.log(position.coords.accuracy)
    // 海拔
    console.log(position.coords.altitude)
    // 海拔准确度
    console.log(position.coords.altitudeAccuracy)
    // 行进方向
    console.log(position.coords.heading)
},function(err){
    console.log(err)
},{					
    enableHighAccuracy: true,    // 更精确的查找
    timeout: 5000,               // 请求超时的时间
    maximumAge: 5000,            // 可缓存的时间
    frequency: 1000              // 更新的频率
})
```

```js
// 关闭定位请求
// navigator.geolocation.clearWatch()

var timer = navigator.geolocation.watchPosition(function(position){
    console.log(position)
},function(err){
    console.log(err)
    navigator.geolocation.clearWatch(timer)
},{
    enableHighAccuracy: true, // 更精确的查找
    timeout: 5000,            // 请求超时的时间
    maximumAge: 5000,         // 可缓存的时间
    frequency: 1000           // 更新的频率
})
```

