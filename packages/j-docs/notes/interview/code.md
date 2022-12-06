---
title: CSS
titleTemplate: 面试总结
outline: 'deep'
---


[toc]


# 手写代码


## 用`reduce`实现数组`flat`方法


```js
const flat = ( data, layer = 1 ) => {
    layer = layer < 1 ? 1 : layer
    const result = data.reduce( ( previousValue, currentValue ) => {
        if ( currentValue instanceof Array && layer > 1 ) {
            currentValue = flat( currentValue, layer - 1 )
        }
        return previousValue.concat( currentValue )
    }, [] )
    return result
}


console.log( flat( [ 1, 2, [ 3, 4, [ 5, 6, [ 7 ] ] ] ], Infinity ) )
console.log( flat( [ 1, 2, [ 3, 4, [ 5, 6, [ 7 ] ] ] ], 1 ) )
console.log( flat( [ 1, 2, [ 3, 4, [ 5, 6, [ 7 ] ] ] ], 2 ) )
```


## 实现Array.prototype.reduce

```js
Array.prototype.customReduce = function (fn ,initialValue) {
    const array = this
    let prevValue
    let currentValue
    for ( let i = 0; i < array.length; i++ ) {
        if ( i === 0) {
            prevValue = initialValue ? initialValue : array[0]
            i = 1
        }
        prevValue = fn(prevValue, array[i], i, array)
    }
    return prevValue
}
```


## new
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


## 防抖
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


## 节流
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

## 深拷贝
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


##  call
```js
Function.prototype._call = function ( that ) {
    that.fn = this        
    const args = [ ...arguments ].slice( 1 )
    const result = that.fn( ...args )
    delete that.fn
    return result
}
```


##  apply
```js
Function.prototype._apply = function ( that ) {
    that.fn = this        
    const args = arguments[1]
    const result = args ? that.fn( args ) : that.fn()
    delete that.fn
    return result
}
```


## bind
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


## instanceof
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





