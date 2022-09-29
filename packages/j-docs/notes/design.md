---
title: 设计模式
titleTemplate: 学习笔记
---

[toc]
    
    
# 设计模式

## 设计原则

### SOLID五大设计原则

| 类型 | 描述|
| ---| --- |
| S| 单一职责原则 |
| O | 开放封闭原则（不修改代码，可以扩展） |
| L | 李氏置换原则（所有父类出现的地方，子类能全部出现） |
| I | 接口独立原则|
| D | 依赖倒置原则（编程依赖与抽象，依赖与接口，而不是依赖于具体的实现）|

## 设计模式

| 创建型|
| --- |
| 工厂模式（工厂方法模式，抽象工厂模式，建造者模式） |
| 单例模式 |
| 原型模式 | 

| 结构型 | 
| ---- |
| 适配器模式 |
| 装饰器模式 |
| 代理模式 |
| 外观模式 |
| 桥接模式 |
| 组合模式 |
| 享元模式 |

| 行为型 |
| --- |
| 策略模式 |
| 模版方法模式 |
| 观察者模式 |
| 迭代器模式 |
| 职责链模式 |
| 命令模式 |
| 备忘录模式 |
| 状态模式 |
| 访问者模式 |
| 中介者模式 |
| 解释器模式 |

### 工厂模式

将new操作单独封装<br/>
遇到new时，就要考虑是否该使用工厂模式

#### UML类图

| Creator |
| -----   |
|         |
|   +create(name):Product |

| Product |
| -----   |
|    +name |
|    +init()<br/>+fn1()<br/>+fn2() |

#### 代码演示

```js
class Product {
    
    constructor(name){
        this.name = name
    }
    
    init () {
        console.log('init')
    }
    
    fn1 () {
        console.log('fn1')
    }
    
    fn2 () {
        console.log('fn2')
    }
}
```

```js
class Creator {
    
    create (name) {
        return new Product(name)
    }
    
}
```

```js
let creator = new Creator()
let p = creator.create('p1')
p.init()
p.fn1()
```

### 单例模式


系统中被唯一使用<br/>
一个类只有一个实例

#### 代码演示

```js
class SingleObject {
    login () {
        console.log('login...')
    }
}
    
SingleObject.getInstance = (function(){
    let instance
    return function () {
        if (!instance) {
            instance = new SingleObject()
        }
        return instance
    }
})()
```

```js
let obj1 = SingleObject.getInstance()
obj1.login()

let obj2 = SingleObject.getInstance()
obj2.login()

console.log('obj1===obj2',obj1===obj2)  // true

// 注意下面代码，js不能控制new一个实例，所以如果想完全实现单例模式，还需要文档约束
let obj3 = new SingleObject()
obj3.login()
console.log('obj1===obj3',obj1===obj3)  // false
```


### 适配器模式


旧接口格式和使用者不兼容<br/>
中间加一个适配转换接口

#### UML类图

| Client |
| ----   |
| +target:Target |
| +do()   |

| Target |
| --- |
| +adaptee:Adaptee |
| +request() |

| Adaptee |
| ---- |
|       |
| +specificRequest()   |

#### 代码演示

```js
class Adaptee {
    specificRequest(){
        return  '德国标准插头'
    }
}
```

```js
class Target {
    constructor () {
        this.adaptee = new Adaptee()
    }
    
    request () {
        let info = this.adaptee.specificRequest()
        return `${info}->转换器->中国标准插头`
    }
    
}
```

```js
let target = new Target()
target.request()
```

### 装饰器模式


为对象添加新功能<br/>
不改变其原有的结构和功能

#### UML类图

| Client |
| -----  |
|   +circle: Circle<br/>+des:Decorator |
|   +main()   |

| Decorator |
| ----- |
| +circle:Circle |
| +draw()<br/>+setRedBorder(circle)|

| Circle |
| ---- |
|  |
|  +draw() |


#### 代码演示

```js
class Circle {
    draw () {
        console.log('draw')
    }
}
```

```js
class Decorator {
    
    constructor (circle) {
        this.circle = circle
    }
    
    draw () {
        this.circle.draw()
        this.setRedBorder(circle)
    }
    
    setRedBorder (circle) {
        console.log('setRedBorder')
    }
    
}
```

```js
let circle = new Circle()
circle.draw()
    
let dec = new Decorator(circle)
dec.draw()
```

### 代理模式


使用者无权访问目标对象<br/>
中间加代理，通过代理做授权和控制

#### UML类图

| Client |
| ---- |
| +proxyImg: ProxyImg |
| +main() |

| ProxyImg |
| ---- |
| +realImg:RealImg |
| +display() |

| ReadImg |
| ---- |
| +fileName:String |
| +display()<br/>-loadFromDisk()|

#### 代码演示

```js
class ReadImg {
    
    constructor(fileName){
        this.fileName = fileName
        this.loadFromDisk()
    }
    
    display () {
        console.log('display...' + this.fileName)
    }
    
    loadFromDisk () {
        console.log('loading...' + this.fileName)
    }
    
}
```

```js
class ProxyImg {
    
    constructor (fileName) {
        this.realImg = new ReadImg(fileName)
    }
    
    display () {
        this.realImg.display()
    }
    
}
```

```js
let proxyImg = new ProxyImg('test.png')
proxyImg.display()
```

### 外观模式


为子系统中的一组接口提供了一个高层接口<br/>
使用者使用这个高层接口



### 观察者模式


发布&订阅<br/>
一对多

#### UML类图

| Observer |
| -----   |
| +name:String<br/>+subject:Subject|
| +update() |

| Subject |
|  -----  |
|    -observers:Array<br/>-state:init |
| +getState():init<br/>+setState(state)<br/>+attach(observer)<br/>+notifyAllObservers()|


#### 代码演示

```js
class Subject {
    constructor () {
        this.state = 0
        this.observers = []
    }
    
    getState () {
        return this.state
    }
    
    setState (state) {
        this.state = state
        this.notifyAllObservers()
    }
    
    notifyAllObservers () {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    
    attach(observer){
        this.observers.push(observer)
    }
    
}
```

```js
class Observer {
    constructor (name,subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    
    update () {
        console.log(`${this.name} update,state: ${this.subject.getState()}`)
    }
}
```

```js
let s = new Subject()
let o1 = new Observer('o1',s)
let o2 = new Observer('o2',s)
s.setState(1)
```

### 迭代器模式


顺序访问一个集合<br/>
使用者无需知道集合的内部结构（封装）

#### UML类图

| Container |
| ---- |
| +list:Array |
| +getIterator():iterator|

| Iterator |
| ---- |
| -list:Array<br/>-index:int |
| +next():int<br/>+hasNext():boolean|

#### 代码演示

```js
class Container {
    constructor (list) {
        this.list = list
    }
    // 生成遍历器
    getIterator () {
        return new Iterator(this)
    }
}
    
class Iterator {
    constructor (container) {
        this.list = container.list
        this.index = 0
    }
    
    next () {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    
    hasNext(){
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}
```

### 状态模式


一个对象有状态变化<br/>
每次状态变化都会触发一个逻辑<br/>
不能总是用`if...else`来控制

#### UML类图

| State |
| ---  |
| -color  |
| +handle(context) |

| Context |
|  ---- |
| -state |
| +getState():State<br/>+setState(state) |


#### 代码演示

```js
class State {
    
    constructor(color){
        this.color = color    
    }
    
    handle(context){
        console.log(`${this.color}`)
        context.setState(this)
    }
    
}
    
class Context {
    
    constructor () {
        this.state = null
    }
    
    getState () {
        return this.state
    }
    
    setState (state) {
        this.state = state
    }   
    
}

let context = new Context()
let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

green.handle(context)
console.log(context.getState())
yellow.handle(context)
console.log(context.getState())
red.handle(context)
console.log(context.getState())
```

### 原型模式


clone自己生成一个新对象

#### 代码演示

```js
const prototype = {
    getName: function () {
        return this.first + ' ' + this.last
    },
    say: function () {
        console.log('hello')
    }
}
```

```js
let x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
console.log(x.getName())
console.log(x.say())
```

```js
let y = Object.create(prototype)
y.first = 'C'
y.last = 'D'
console.log(y.getName())
console.log(y.say())
```

### 命令模式


执行命令时，发布者和执行者分开<br/>
中间加入命令对象，作为中转站

#### 代码演示

```js
class Receiver {
    exec () {
        console.log('执行')
    }
}

class Command {
    constructor (reveiver) {
        this.reveiver = reveiver
    }
    
    cmd () {
        console.log('触发命令')
        this.reveiver.exec()
    }
}

class Invoker {
    constructor (command) {
        this.command = command
    }
    invoke () {
        console.log('开始')
        this.command.cmd()
    }
}

let soldier = new Receiver()
let trumpeter = new Command(soldier)
let general = new Invoker(trumpeter)
general.invoke()
```

### 备忘录模式


随时记录一个对象的状态变化<br/>
随时可以恢复之前的某个状态（如撤销功能）

#### 代码演示

```js
class Memento {
    constructor (content) {
        this.content = content
    }
    getContent () {
        return this.content
    }
}

class CareTaker {
    constructor () {
        this.list = []
    }
    add (memento) {
        this.list.push(memento)
    }
    get (index) {
        return this.list[index]
    }
}

class Editor {
    constructor () {
        this.content = null
    }
    setContent (content) {
        this.content = content 
    }
    getContent () {
        return this.content
    }
    saveContentToMemento () {
        return new Memento(this.content)
    }
    getContentFromMemento (memento) {
        this.content = memento.getContent()
    }
}
```

### 中介者模式


多个对象之间相互引用，如果其中一个对象改变了，那其他访问它的对象也需要跟着改变，这时可以用中介者模式，对象和对象之间的访问，都通过一个中介者访问的话，如果其中一个对象改变了，我们只需要改变中介者就可以了

#### 代码演示

```js
class A {
    constructor () {
        this.number = 0
    }
    setNumber (num, m) {
        this.number = num
        if (m) {
            m.setB()
        }
    }
}

class B {
    constructor () {
        this.number = 0
    }
    setNumber (num, m) {
        this.number = num
        if (m) {
            m.setA()
        }
    }
}

class Mediator {
    constructor (a, b) {
        this.a = a
        this.b = b
    }
    setB () {
        let number = this.a.number
        this.b.setNumber(number * 100)    
    }
    setA () {
        let number = this.b.number
        this.a.setNumber(number / 100)
    }
}
```

### 桥接模式


用于把抽象化与实现化解耦<br/>
使得二者可以独立变化


### 组合模式


生成树形结构，表示"整体-部分"关系<br/>
让整体和部分都具有一致的操作方式


### 享元模式


共享内存（主要考虑内存，而非效率）<br/>
相同的数据，共享使用

### 策略模式


不同策略分开处理<br/>
避免出现大量`if...else`或者`switch...case`


### 职责链模式


一步操作可能分为多个职责角色来完成<br/>
把这些角色都分开，然后用一个链串起来<br/>
将发起者和各个处理者进行隔离





### 访问者模式


将数据操作和数据结构进行分离

### 解释器模式


描述语言语法如何定义，如何解释和编译

