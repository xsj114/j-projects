[toc]

# Typescript学习笔记

## 基础类型

### 布尔值

```
    let isDone:boolean = false
    let isDone:boolean = true
```

### 数字

```
    // 10进制
    let decLiteral: number = 20
    
    // 16进制
    let hexLiteral:number = 0x14
    
    // 2进制
    let binaryLiteral:number = 0b10100
    
    // 8进制
    let octalLiteral:number = 0o24
```

### 字符串

```
    let name:string = 'bob'
    let age:number  = 30
    let sentence = `Hello, my name is ${name}
        I'll be ${age + 1} year.
    `
```

### 数组

```
let list:number[] = [1,2,3]

let list:Array<number> = [1,2,3]
```


### 元组Tuple

已知数组成员数量和类型
```
let x:[string,number] 
x = ['hello', 10]

```

### 枚举

```
enum Color {
    Red = 1,
    Green,
    Blue
}
    
let c:Color = Color.Blue
console.log(c)  // 3
    
let colorName:string = Color[2]
console.log(colorName) // Green
```

### unknown

任何类型都可以分配给unknown
```
let notSure: unknown = 4
notSure = false
```


### any

使用any其实就是退出类型检查

任何类型都可以分配给any

```
let looselyTyped: any = 4
looselyTyped.ifItExists()

与unknown对比

let looselyTyped: unknown = 4
looselyTyped.ifItExists()  // Property 'ifItExists' does not exist on type 'unknown'

```

### void

表示没有任何类型

void,any,never,undefined可分配给void
null仅在`--strictNullChecks`未启用时可分配

```
function warnUser():void {
}

// 如果声明一个void类型，值只能是null或者undefined
let unusable:void = null
let unusable:void = undefined

```

### null

null是所有类型的子类型，子类型是可以赋值给父类型
null,never和any可以分配给null
undefined仅在`--strictNullChecks`未启用时可分配

```
let n:null = null
```

### undefined

undefined是所有类型的子类型，子类型是可以赋值给父类型
undefined,never和any可以分配给undefined
null仅在`--strictNullChecks`未启用时可分配
```
let u:undefined = undefined
```

### never

never是所有类型的子类型，子类型是可以赋值给父类型

除了never自己，任何类型不能分配给never

```
function error (message:string): never {
    throw new Error(message)
}
 
function fail () {
    return error('something failed')
}
```


### object

object,any,never可分配给object
null，undefined仅在`--strictNullChecks`未启用时可分配
```
declare function create (o: object|null):void
create({prop: 0})
```

### 类型断言

```
let someValue:any = 'this is a string'

let strLength:number = (<string>someValue).length

let strLength:number = (someValue as string).length

```

### 类型兼容

`typescript`中的类型兼容基于结构化子类型



#### 比较原始类型和对象类型


如果x要兼容y，那么y至少具有与x相同的成员

```
interface Named {
  name: string;
};
let x: Named;
let y = { name: "Alice", location: "Seattle" };
x = y;
```

#### 比较两个函数

x的每个参数在y中都有对应的兼容参数，x可以赋值给y
y的第二个参数在x中没有，y不可以赋值给x
```
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x;   // OK
x = y;   // Error
```

```
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });

x = y; // OK
y = x; // Error

```

##### 函数的可选参数

源类型上有额外的可选参数不是错误
```
let x  = (a: number, b: string) => console.log('x')
let y  = (a: number, b: string, c?: boolean) => console.log('y')
x = y
```

目标类型的可选参数在源类型里没有对应的参数也不是错误
```
let x = (a: number, b?: string) => console.log('x')
let y = (a: number) => console.log('y')
x = y
```

#### Enum

枚举类型与数字类型兼容
```
enum Status {
  Ready,
  Waiting,
}

let num: number = 2
num = Status.Ready
```

不同枚举类型之间是不兼容的

```
enum Status { Ready, Waiting };
enum Color  { Red, Blue, Green };
let s = Status.Ready;
s = Color.Red;  // Error
```

#### Class

类既有静态类型又有实例类型，比较一个类类型的两个对象时，仅比较实例的成员。静态成员和构造函数不影响兼容性

```
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(numFeet: number) {}
}

let a: Animal;
let s: Size;

a = s; 
s = a; 
```

##### class中的private和protected

类的私有成员和受保护成员会影响兼容性。 当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。受保护成员也是如此。
```
class Animal { 
    private feet: number;
}

class Dog extends Animal {}

class Parent {
    private feet: number
}

class Children extends Parent {}

let a: Animal;
let d: Dog;
let p: Parent;
let c: Children;

a = d // Ok
p = c // Ok

d = c // Error
```

#### Generic

类型参数只影响使用其做为类型一部分的结果类型

```
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK
```

```
interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y; // Error
```

没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。 然后用结果类型进行比较。

```
let identity = function <T>(x: T): T {};
let reverse = function <U>(y: U): U {};
identity = reverse;
```




## interface


### 可选属性

```
interface Square {
    color: string
    area: number
}

interface SquareConfig {
    color?: string
    width?: number
}

function createSquare (config: SquareConfig):Square {
    let newSquare = {color: 'white', area: 100}   
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let mySquare = createSquare({color: 'black'})

```

### 只读属性

```
interface Point {
    readonly x:number
    readonly y:number
}

let p: Ponit = {x: 10,y: 20}
p.x = 5 // error
```


### 泛型只读数组

```
let a:number[] = [1, 2, 3, 4]
let ro:ReadonlyArray<number> = a
ro[0] = 12 // error
ro.push(5) // error
```

### 字符串签名索引

```
interface Square {
    color: string
    area: number
}

interface SquareConfig {
    color?: string
    width?: number
    [propName:string]: any
}

function createSquare (config: SquareConfig):Square {
    let newSquare = {color: 'white', area: 100}   
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let mySquare = createSquare({color: 'black', colors: 'blue'})
```

### 接口描述函数类型

```
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString)
    return result > -1
}
```

### 索引签名

typescript支持两种索引签名（字符串和数字）
```
interface StringArray {
    [index: number]: string
}

let myArray: StringArray 
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

数字签名的返回类型必须是字符串签名返回类型的子类型
```
class Animal {
    name: string
}

class Dog extends Animal {
    breed: string
}

// error
interface NotOkay {
    [x:number]: Animal
    [x:string]: Dog
}

interface NotOkay {
    [x:number]: Dog
    [x:string]: Animal
}
```

### 只读索引签名

```
interface ReadonlyStringArray {
    readonly [index: number]: string
}

let myArray: ReadonlyStringArray =. ['Alice', 'Bob']
myArray[2] = 'Mallory' // error
```

### class类型

类实现一个接口，实际是对实例部分做一个检查，构造器实际是类的静态部分，所以不会做检查

```
// 实例接口
interface ClockInterface {
    currentTime: Date
    setTime(d: Date)
}

// 构造器接口
interface ClockConstructor {
    new(hour: number, minute: number)
}

class Clock implements ClockInterface {
    currentTime: Date
    
    constructor (h: number,m: number) {
    }
    
    setTime (d: Date) {
        this.currentTime = d
    }
}
```

```
interface ClockInterface {
    tick()
}

interface ClockConstructor {
    new(hour:number,minute:number): ClockInterface
}

function createClock(ctor: ClockConstructor,hour: number,minute: number): ClockInterface {
    return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
    constructor(h: number,m: number){}
    tick(){
        console.log('beep beep')
    }
}

class AnalogClock implements ClockInterface{
    constructor(h: number,m: number){}
    tick(){
        console.log('tick toc')
    }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

```

### 继承接口

```
interface Shape {
    color: string 
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape,PenStroke {
    sideLength: number
}

// 强制断言
let squre = {} as Square
squre.color = 'blue'
squre.sideLength = 10
squre.penWidth = 5.0
```

### 混合类型

```
interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = (function (start: number) {}) as Counter
    counter.interval = 123
    counter.reset = function () {
    }
    return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

### 接口继承类

当一个接口继承一个类的类型的时候，它会继承这个类的成员，但不包括它的实现

```
class Control {
    private state: any
}

interface SelectableControl extends Control{
    select()
}

class Button extends Control implements SelectableControl {
   select(){}
}

class Textbox extends Control {
    select(){}
}

// error
class ImageC implements SelectableControl {
    private state: any
    select(){}
}

```

## 类

### 示例

```
class Greeter {
    greeting: string
    constructor (message: string) {
        this.greeting = message
    }
    greet () {
        retutn 'Hello, ' + this.greeting
    }
}

let greeter = new Greeter('world')
greeter.greet()
```

### 继承

```
class Animal {
    move (distance: number = 0) {
        console.log(`Animal moved ${distance}m`) 
    }
}

class Dog extends Animal {
    bark () {
        console.log('Woof! Woof!')
    }
}

const dog = new Dog()
dog.bark()
dog.move(10)

```

```
class Animal {
    name: string
    constructor (name: string) {
        this.name = name
    }
    move (distance: number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}

class Snake extends Animal {
    constructor (name: string) {
        super(name)
    }
    move (distance: number = 5) {
        console.log('Slithering...')
        super.move(distance)
    }
}

class Horse extends Animal {
    constructor (name: string) {
        super(name)
    }
    move (distance: number = 45) {
        console.log('Galloping...')
        super.move(distance)
    }
}

let sam = new Snake('Sammy')
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(34)

```

### 修饰符

#### public

```
class Animal {
    public name: string
    public constructor(name: string){
        this.name = name
    }
    public move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}
```

#### private

typescript中，当我们去比较两种类型的时候，并不在乎它们是从哪来的，如果他们所有的成员类型都是兼容的话，我们认为它是类型兼容的，但是我们比较带有private和protected的时候，如果其中一个类型带有private或protected成员的时候，只有当另外一个类型也存在这样一个private或protected成员，并且它们都是来自同一处声明的时候，我们才认为这两个是类型兼容的

private只可以在当前类中访问

```
class Animal {
    private name: string
    public constructor(name: string){
        this.name = name
    }
    public move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m`)
    }
}

// error
new Animal('Cat').name

```

```
class Animal {
    private name: string
    public constructor(name: string){
        this.name = name
    }
}

class Rhino extends Animal {
    constructor () {
        super('Rhino')
    }
}

class Employee {
    private name: string
    constructor (name: string) {
        this.name = name
    }
}

let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino
animal = employee // error 因为都有私有name，来源不一样，所以无法兼容
```


#### protected

protected成员在子类中可以访问

```
class Person {
    protected name: string
    constructor(name: string){
        this.name = name
    }
}

class Employee extends Person {
    private department: string
    constructor (name: string, department: string) {
        super(name)
        this.department = department
    }
    getElevatorPitch () {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }
}

let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())
console.log(howard.name) // error

```

```
class Person {
    protected name: string
    protected constructor(name: string){
        this.name = name
    }
}

// error
let john = new Person('John')

```

#### readonly

```
class Person {
    readonly name: string
    constructor (name: string) {
        this.name = name
    }
}

let john = new Person('John')
john.name = '' // error
```

#### 参数属性

所谓参数属性就是给构造函数参数，前面加上一个访问限定符来声明

```
class Person {
    constructor (readonly name: string) {}
}
let john = new Person('John')
```


#### 存取器

```
let passcode = 'secret passcode'

class Employee {
    private _fullName: string
    get fullName(): string {
        return this._fullName
    }
    set fullName(newName: string) {
        if (passcode && passcode === 'secret passcode') {
            this._fullName = newName
        } else {
            console.log('Error')
        }
    }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
    console.log(employee.fullName)
}
```

#### 类的静态属性

```
class Grid {

    static origin = {x: 0,y: 0}
    
    scale: number
    
    constructor (scale: number) {
        this.scale = scale
    }
    
    claculateDistanceFromOrigin (point: {x: number, y: number}) {
        let xDist = point.x - Grid.origin.x
        let yDist = point.y - Grid.origin.y
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
    }
}

let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)

console.log(grid1.claculateDistanceFromOrigin({x:3, y: 4}))
console.log(grid2.claculateDistanceFromOrigin({x:3, y: 4}))
```


### 抽象类

抽象类通常是作为其他派生类的基类使用，一般不能被直接实例化

```
abstract class Animal {
    // 抽象方法是不能直接被实现的，必须在他的派生类中实现
    abstract makeSound(): void
    move ():void {
        console.log('roaming the earth...')
    }
}
```

```
abstract class Department {
    name: string
    constructor (name: string) {
        this.name = name
    }
    
    printName(): void {
        console.log('Department name' + this.name)
    }
    
    abstract printMeeting(): void
}

class AccountingDepartment extends Department {

    constructor () {
        super('Accounting ad Auditing')
    }
    
    printMeeting():void {
        console.log('The Accounting Department meets each Moday at 10am')
    }
    
    genterateReports():void {
        console.log('Generating accounting reports...')
    }
}

let department: Department
department = new Department() // error
department = new AccountingDepartment()
department.printName()
department.printMeeting()
department.genterateReports() // error
```

### 高级技巧

```
class Greeter {
    static standardGreeting = 'Hello, there'
    
    greeting: string
    
    constructor (message?: string) {
        this.greeting = message
    }
    
    greet () {
        if (this.greeting) {
            return 'Hello, ' + this.greeting
        } else {
            return Greeter.standardGreeting
        }
    }
}

let greeter: Greeter
greeter = new Greeter('world')
console.log(greeter.greet())

// typeof Greeter的意思是取Greeter类的一个类型，而不是实例的类型，是它的一个静态的类型
let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

```

类作为接口使用

```
class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {
    x: 1,
    y: 2,
    z: 3
}

```


## 函数


```
function add (x: number, y: number): number {
    return x + y
}

let myAdd = function (x: number, y: number): number {
    return x + y
}

let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}
```

### 可选参数

```
function buildName (firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + ' ' + lastName
    } else {
        return firstName
    }
}

let result1 = buildName('Bob')
let result2 = buildName('Bob', 'Adams', 'Sr.') // error
let result3 = buildName('Bob', 'Adams')

```

### 默认参数

```
function buildName (firstName: string, lastName = 'Smith'): string {
    return firstName + ' ' + lastName
}

let result1 = buildName('Bob', undefined)

```

### this用法



```
interface Card {
    suit: string
    card: number
}

interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13)
            return {
                suit: this.suits[pickedSuit],
                card: pickedCard % 13
            }
        }
    }
}
    
let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
    
console.log('card: ' + pickedCard.card + 'of' + pickedCard.suit)
```

```
interface UIElement {
    addClickListener (onclick: (this:void, e: Event) => void): void
}

class Handler {
    type: string
    
    // 原始onClickBad函数
    onClickBad (this: void, e: Event) {
        this.type = e.type // error this是void没有type属性
    }
    
    // 改造后onClickBad函数，使用箭头函数来解决又想满足接口的约定，又能访问到Handler的this
    onClickBad = (e: Event) => {
        this.type = e.type
    }
    
}

let h = new Handler()

let uiElement: UIElement = {
    addClickListener () {
    
    }
}

uiElement.addClickListener(h.onClickBad)

```

### 重载

```
let suits = ['heart', 'spades', 'clubs', 'diamonds']

function pickCard (x: {suit: string; card: number}[] ): number
function pickCard (x: number): {suit: string; card: number}

function pickCard(x): any {
    if (Array.isArray(x)) {
        let pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    } else if (typeof x === 'number') {
        let pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }   
}

let myDeck = [
    {suit: 'diamonds', card: 2},
    {suit: 'spades', card: 10},
    {suit: 'hearts', card: 4}
]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log('card: ' + pickedCard1.card + ' of' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + ' of' + pickedCard2.suit)

```

## 泛型

### 基本示例

```

// <T>代表类型变量
function identity<T> (arg: T): T {
    return arg
}

let output = identity<string>('myString')

```

```
function identity<T> (arg: T): T {
    return arg
}

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
```

### 泛型类型

```
function identity<T>(arg: T): T {
    return T
}

interface GenericIdentityFn {
    <T>(arg: T): T
}

// 以下写法是等价的
let myIdentity: <T>(arg: T) => T = identity
let myIdentity: {<T>(arg: T): T} = identity
let myIdentity: GenericIdentityFn = identity
```

```
function identity<T>(arg: T): T {
    return T
}

interface GenericIdentityFn<T> {
    (arg: T): T
}

let myIdentity: GenericIdentityFn<number> = identity
```


### 泛型类

```
class GenericNumber<T> {
    zeroValue: T
    add: (x:T, y:T) => T
}

let myGenericNumber = new GenericNumber<number>()

```

### 泛型约束

```
interface Lengthwise {
    length: number
}

function loggingIdentity <T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

```
function getProperty <T, K extends keyof T> (obj: T,key: K) {
    return obj[key]
}
let x = {a: 1,b: 2,c: 3,d: 4}
getProperty(x, 'a')
getProperty(x, 'm') // error
```

```
class Beekeeper {
    hasMask: boolean
}

class LionKeeper {
    nametag: string
}

class Animal {
    numLengs: number
}

class Bee extends Animal {
    keeper: Beekeeper
}

class Lion extends Animal {
    keeper: LionKeeper
}

function createInstance <T extends Animal> (c: new() => T): T {
    return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
```


## 类型推断

在初始化变量和成员，设置参数默认值以及确定函数返回类型时会发生这种推断

### 基础

```
// 变量x被自动推断为number类型
let x = 3 
```

### 最佳通用类型

```
// 变量x类型为null和number的联合类型
let x = [0, 1, null]
```




### 上下文类型

当表达式的类型由其位置隐含时，便发生上下文类型

```
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button)
    console.log(mouseEvent.clickTime) // Error
}

window.onmousedown = function (mouseEvent: any) {
    console.log(mouseEvent.clickTime)
}
```

上下文类型充当最佳通用类型的候选类型
```
// 此例子最佳通用类型有三个候选者，分别是，Animal[], Bee类型,Lion类型
// Animal[]作为最佳通用类型

class Animal {
    numLegs: number
}

class Bee extends Animal {}

class Lion extends Animal {}

function createZoo(): Animal[] {
    return [new Bee(), new Lion()]
}
```



## 高级类型


### 字符串字面量类型

```
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
    animate (dx: number, dy: number, easing: Easing) {
        if (easing === 'ease-in') {
        } else if (easing === 'ease-out') {
        } else if (easing === 'ease-in-out') {
        } else {}
    }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy')

```

### 交叉类型

```
function extend<T, U> (first: T, second: U): T & U {
    let result = {} as T & U
    for (let id in first) {
        result[id] = first[id] as any
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id] as any
        }
    }
    return result
}

class Person {
    constructor (public name: string) {
        
    }
}

interface Loggable {
    log(): void
}

class ConsoleLogger implements Loggable {
    log () {}
}

var jim = extend( new Person('jim'), new ConsoleLogger() )

```

### 联合类型

```
function padLeft (value: string, padding: string | number) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value
    }
    if (typeof padding === 'string') {
        return padding + value
    }
    throw new Error(`Expected string or number got ${padding}`)
}

padLeft('Hello world', 4)
```

```
interface A {
    p: string
}

interface B {
    p: number
}

let obj: A | B = {
    p: '123'
}

let obj2: A | B = {
    p: 123
}
```

```
interface Brid {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Brid {}

let pet = getSmallPet()
pet.layEggs()
pet.swim() // error
```

### 类型保护

#### in操作符

```
interface Brid {
    fly()
    layEggs()
}

interface Fish  {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Brid {}

let pet = getSmallPet()
pet.layEggs()

if ("swim" in pet) {
    pet.swim()
}

```

#### 类型谓词

```
interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Bird {}

let pet = getSmallPet()

if ( isFish(pet) ) {
    pet.swim()
} else {
    pet.fly()
}

function isFish (pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}
```

#### typeof

`typeof v === "typename"`

其中"typename"是 （"undefined", "number", "string", "boolean", "bigint", "symbol", "object", "function"）中的一个，如果是其他字符串，则TS不识别为类型保护


```

function padLeft (value: string, padding: string | number) {
    if ( typeof padding === 'number' ) {
        return Array(padding + 1).join(' ') + value
    }
    
    if ( typeof padding === 'string' ) {
        return padding + value
    }
    
    throw new Error(`Expected string or number got ${padding}`)
}
```

#### instanceof

```
class Bird {
    fly () {
        console.log('bird fly')
    }
    layEggs () {
        console.log(`bird lay eggs`)
    }
}

class Fish {
    swim () {
        console.log('fish swim')
    }
    layEggs () {
        console.log('fish lay eggs')
    }
}

function getRandomPet():Fish | Bird {
    return Math.random() > 0.5 ? new Bird() : new Fish() 
}

let pet = getRandomPet()

if ( pet instanceof Bird ) {
    pet.fly()
}

if ( pet instanceof Fish ) {
    pet.swim()
}
```

### 可为null的类型

`identifier!`

从identifier的类型里去除了null和undefined

```
function broken (name: string | null): string {
    function postfix (epithet: string) {
        return name!.charAt(0) + '. the' + epithet
    }
    name = name || 'Bob'
    return postfix(name)
}
```

```
function fn(stringOrNull: string | null): string {
  return stringOrNull ?? "default";
}

console.log(fn('123')) // '123'
console.log(fn(undefined)) // 'default'
console.log(fn(null)) // 'default'
```

### 类型别名

别名实际上并不会创建新类型，而是会创建一个新名称来引用该类型
与interface的主要区别是，type不能扩展
```
type Second = number;
let timeInSecond: number = 10;
let time: Second = 10;
```

### 索引类型查询操作符

`keyof T`
keyof T的结果为T上已知的公共属性名的联合

`keyof any`
 keyof any = string | number | symbol

```
interface Person {
    name: string;
    age: number;
}

let personProps: keyof Person; // 'name' | 'age'
```

### 索引访问操作符

`T[K]`

```
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName];
}
```

### 映射类型

```
type Optional<T> = {
    [P in keyof T]?: T[P]
}

interface Person {
    name: string
    age: number
}

type PersonPartial = Optional<Person>

let obj: PersonPartial = {}
```

```
type Nullable<T> = {
    [P in keyof T]: T[P] | null
}

interface Person {
    readonly name: string
    age: number
}

let user: Nullable<Person> = {
    name: null,
    age: null
}

user.name = 'user' // Error Cannot assign to 'name' because it is a read-only property
```

### 条件类型

`T extends U ? X : Y`

```
declare function f<T extends boolean>(x: T): T extends true ? string : number;

let x = f(Math.random() < 0.5);
```

条件类型不能递归引用自己
```
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; // Error
```

条件类型推断声明

```
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

```
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

// type T1 = string
type T1 = Foo<{ a: string; b: string }>;

// type T2 = string | number
type T2 = Foo<{ a: string; b: number }>;
```

## utility types

### Partial\<Type\>

```
interface Person {
    name: string
    age: number
}

let person: Person = {
    name: 'ming',
    age: 23
}

let user: Partial<Person> = {
    name: 'ming'
}

```

#### Implementation

```
type Partial<T> = {
    [ P in keyof T ]?: T[ P ];
}
```


### Required\<Type\>

```
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5, b: 'string' };
```

#### Implementation

```
type Required<T> = {
    [ P in keyof T ]-?: T[ P ];
}
```

### Readonly\<Type\>

```
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "World",
};

todo.title = "Hello";  // error
```

#### Implementation

```
type Readonly<T> = {
    readonly [ P in keyof T ]: T[ P ];
}
```

### Record\<Keys,Type\>

```
let obj: Record<'a'|'b', boolean> = {
    a: true,
    b: false
}
```

#### Implementation

```
type Record<K, T> = {
    [ P in K ]: T;
}
```

### Pick\<Type, Keys\>

```
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

#### Implementation

```
type Pick<T,K extends keyof T> = {
    [P in K]: T[P]
}
```

### Omit\<Type, Keys\>

```
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description" | "completed">;

const todo: TodoPreview = {
    title: "Clean room"
};
```

#### Implementation

```
type Omit <T, K extends keyof T> = {
    [ P in Exclude<keyof T, K> ]: T[P]
}
```

### Exclude\<Type, ExcludedUnion\>

```
// T0 = "b" | "c"
type T0 = Exclude<"a" | "b" | "c", "a">;

let b: T0 = 'b'
let c: T0 = 'c'
```

#### Implementation

```
type Exclude<T, U> = T extends U ? never : T;
```

### Extract\<Type, Union\>

```
type T0 = Extract<"a" | "b" | "c", "a">
let a: T0 = 'a'
```

#### Implementation

```
type Extract<T, U> = T extends U ? T : never;
```

### NonNullable\<Type\>


```
type T0 = NonNullable<string | number | undefined | null>;
```

#### Implementation

```
type NonNullable<T> = T extends undefined | null ? never : T;
```


### Parameters\<Type\>

构造的是元组类型
```
type T1 = Parameters<(s: string) => void>;

let arr: T1 = ['1']
```

```
declare function f1(arg: { a: number; b: string }): void;
type T3 = Parameters<typeof f1>;
let arr: T3 = [{
    a: 1,
    b: 'b'
}]
```

#### Implementation

```
type Parameters<T extends ( ...args: any[] ) => any> = T extends ( ...args: infer P ) => any ? P : never;
```

### ConstructorParameters\<Type\>

```
class Person {
    constructor( public name: string, age: number ) {}
}

// type X = [name: string, age: number]
type X = ConstructorParameters<typeof Person>

let arr: X = ['', 32]
```

#### Implementation

```
type ConstructorParameters<T extends new ( ...args: any[] ) => any> = T extends new ( ...args: infer U ) => any ? U : never;
```

### ReturnType\<Type\>

```
// type T0 = string
type T0 = ReturnType<() => string>;
```

#### Implementation

```
type ReturnType<T extends ( ...args: any[] ) => any> = T extends ( ...args: any[] ) => infer U ? U : never;
```

### InstanceType\<Type\>

```
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;

let t: T0 = {
    x: 1,
    y: 1
}
```

```
class C {
    x: string
    y: number
}

type T0 = InstanceType<typeof C>;

let t: T0 = {
    x: '1',
    y: 1
}
```

#### Implementation

```
type InstanceType<T extends new ( ...args: any ) => any> = T extends new ( ...args: any ) => infer U ? U : any;
```

### ThisParameterType\<Type\>

提取函数this参数的类型，如果没有this参数是unknown类型
```
function toHex(this: Number) {
  return this.toString(16);
}

let a: ThisParameterType<typeof toHex> = 1
```

#### Implementation

```
type ThisParameterType<T> = T extends ( this: infer U, ...args: any[] ) => any ? U : unknown;
```


### OmitThisParameter\<Type\>

删除Type中的this，创建新的函数类型，如果没有this，则就是Type类型

```
function toHex (this: Number) {
  return this.toString(16);
}

const fn: OmitThisParameter<typeof toHex> = toHex.bind({a: 1});
```

#### Implementation

```
type OmitThisParameter<T> = T extends ( this: infer U, ...args: infer A ) => infer R ? ( ...args: A ) => R : T;
```

```
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends ( ...args: infer A ) => infer R ? ( ...args: A ) => R : T;
```

## 声明合并

### interface merge

接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型
对于函数成员，每个同名函数声明都会被当成这个函数的一个重载


```
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };
```

合并时后面的接口具有更高的优先级
```
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// already merge 
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

### namespaces merge

命名空间会创建出命名空间和值


```
namespace Animals {
  export class Zebra {}
}

namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// already merge 
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Zebra {}
  export class Dog {}
}
```

#### merge namespaces with class

```
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {}
}
```

#### merge namespaces with function 

```
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}
```


## mixins

```
type GConstructor<T = {}> = new (...args: any[]) => T;
type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;

function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
        jump() {
            return this.setPos(0, 20);
        }
    }
}

class Position {
    setPos (x,y) {
        return x + y
    }
}

let instance =  Jumpable(Position)
let j = new instance()
console.log(j.jump())
```


## modules

### export and import 

```
// fn.ts
export const numberRegexp = /^[0-9]+$/;

// index.ts
import {numberRegexp} from './fn'
```

导出重命名
```
// fn.ts
const numberRegexp = /^[0-9]+$/;
export {numberRegexp as reg}

// index.ts
import {reg} from './fn'
```

重新导出
```
// index.ts
import {reg, num } from './fn'

// fn.ts
export const num = 5
export {numberRegexp as reg} from './base'

// base.ts
export const numberRegexp = /^[0-9]+$/;
```

```
// index.ts
import {utilities, str}  from './fn'

// fn.ts
export const str = 'hello'
export * as utilities from './base'

// base
export const numberRegexp = /^[0-9]+$/
export const num = 3
```

导出所有
```
// index.ts
import * as all from './fn'

// fn.ts
export * from './base'

// base.ts
export const num = 5
export const str = 'hello'
```

导入重命名

```
// index.ts
import {num as n} from './fn'

// fn.ts
export const num = 5
export const str = 'hello'
```

导入类型

```
// index.ts
import {A} from './fn' | import type {A} from './fn'

class Animal implements A {
    a: number
}

// fn.ts
export interface A {
    a: number
}
```

默认导出

```
// index.ts
import a from './fn'

// fn.ts
const a = 1
export default a
```




### export = and import =

为了支持CommonJS和AMD的exports,TS提供了以下语法

```
// index.ts
import str =  require('./fn')

// fn.ts
const str = 'hello'
export = str
```

## 模块解析

模块解析策略分为两种，分别是Classic或Node，如果解析失败了，且是非相对的模块名，编译器将查找`声明模块`

### Classic策略

对于相对模块解析（/root/src/folder/A.ts文件里有import { b } from "./moduleB"）

会按下面顺序查找

```
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
```

对于非相对模块解析（/root/src/folder/A.ts文件里有import { b } from "moduleB"）

会按下面顺序查找
```
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
```

### Node策略

对于相对模块解析（/root/src/moduleA.ts文件里有import { b } from "./moduleB"）

会按下面顺序查找

```
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (如果指定了types属性)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
```

对于非相对模块解析（/root/src/moduleA.ts文件里有import { b } from "moduleB"）

会按下面顺序查找
```
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (如果指定了types属性)
/root/src/node_modules/@types/moduleB.d.ts
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (如果指定了types属性)
/root/node_modules/@types/moduleB.d.ts
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts

/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (如果指定了types属性)
/node_modules/@types/moduleB.d.ts
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts
```

### 相对模块

相对模块不能解析为一个外部模块声明
```
import {a} from './fn'
```

### 非相对模块

非相对模块可以被解析成外部模块声明
```
import * as $ from "jQuery"
```



## 问题


```
type HttpRequest = ( url: string, options: Record<string, any> ) => Promise<any>;

<HttpRequest>function request( url, options = {} ) {
    return Promise.resolve( { url, options } );
}
```

```
class Controller {}

class Provider {
    constructor( public options: Record<string, any> ) {}
}

type YnnOptions = {
    controllers: Record<string, typeof Controller>;
    providers: Record<string, { new(): any }>;
}

const options: YnnOptions = {
    controllers : {
        index : Controller,
    },
    providers : {
        // Type 'typeof Provider' is not assignable to type 'new () => any'.
        user : Provider
    }
}
```

```
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

type T1 = Boxed<string>;
type T2 = Boxed<number[]>;
```

```
type NotNullable<T> = Diff<T, null | undefined>;

type Diff<T, U> = T extends U ? never : T;

function f1<T>(x: T, y: NotNullable<T>) {
    x = y;
    y = x; // error
}
    
function f2<T extends string | undefined>(x: T, y: NotNullable<T>) {
    x = y;
    y = x; // error
    let s1: string = x;
    let s2: string = y;
}
```

```
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T1 = FunctionPropertyNames<Part>;
type T2 = NonFunctionPropertyNames<Part>;
type T3 = FunctionProperties<Part>;
type T4 = NonFunctionProperties<Part>;
```

```
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

// type T1 = string
type T1 = Foo<{ a: string; b: string }>;
// type T2 = string | number
type T2 = Foo<{ a: string; b: number }>;



type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;

type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

// type T2 = never
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;
```


```
在4.0.3版本中，赋值为null或undefined，并不会报错

type T0 = NonNullable<string | number | undefined | null>

interface Person {
    name: T0
}

let p: Person = {
     name: undefined
}
```

```
// email? 是什么意思
const user: { email?: string } = { 
    email : 'a@b.com'
}

let account, domain = user.email?.split( '@' ) || []
```

```
type PartialWith<T, M extends keyof T> = {
		[ K in {
				[ P in keyof T ]: P extends M ? never : P
		}[ keyof T ] ]: T[ K ];
} & {
		[ P in M ]?: T[ P ];
}
```

```
type MergeRecord<M, N> = {
    [ P in keyof M |  keyof N ]: M[ keyof M ] | N[ keyof N ];
}

// Options = {
//    [x: string]: number | boolean;
//    [x: number]: number | boolean;
// }
type Options = MergeRecord<Record<string, number>, Record<number, boolean>>;
```

```
type PickWithTypes<T, S> = {
		[ K in {
				[ P in keyof T ]: S extends T[ P ] ? P : never;
		}[ keyof T ] ]: T[ K ];
}

type SomeTypes = {
	name: string;
	age: number;
	sex: string;
	married: boolean;
}

// type A = {
//     age: number;
// }
type A = PickWithTypes<SomeTypes, number>;

// type B = {
//     name: string;
//     sex: string;
// }
type B = PickWithTypes<SomeTypes, string>;


// type C = {
//     name: string;
//     sex: string;
//     married: boolean;
// }
type C = PickWithTypes<SomeTypes, string | boolean>;
```

```
type Omit<T, K extends keyof any> = {
		[ Key in {
				[ P in keyof T ]: P extends K ? never : P
		}[ keyof T ] ]: T[ Key ];	
}
```

```
function f1( name: string ): string;
function f1( name: number ): number;
function f1( name: number ): boolean;
function f1( name: number ): Date;
function f1( name: number ): Promise<any>;
function f1( name: number ): () => {};
function f1( name: number ): new () => any;

function f1( name: any ): any {
	return name;
}

type OverloadedReturnType<T> = 
    T extends { (...args: any[]) : infer R; (...args: any[]) : infer R; (...args: any[]) : infer R ; (...args: any[]) : infer R } ? R  :
    T extends { (...args: any[]) : infer R; (...args: any[]) : infer R; (...args: any[]) : infer R } ? R  :
    T extends { (...args: any[]) : infer R; (...args: any[]) : infer R } ? R  :
    T extends (...args: any[]) => infer R ? R : any

// type T1 = new () => any
type T1 = ReturnType<typeof f1>;

// type T2 = (new () => any) | Date | Promise<any> | (() => {})
type T2 = OverloadedReturnType<typeof f1>;
```


