// 获取指定对象指定属性的值
export const getValueByPath = function( object, prop ) {
    prop = prop || '';
    const paths = prop.split( '.' );
    let current = object;
    let result = null;
    for ( let i = 0; i < paths.length; i++ ) {
        const path = paths[ i ];
        if ( !current ) break;
        if ( i === paths.length - 1 ) {
            result = current[ path ];
            break;
        }
        current = current[ path ];
    }
    return result;
};


// 判断是不是对象
export const isObject = function( value ) {
    return Object.prototype.toString.call( value ).toLowerCase() === '[object object]';
};

// 判断是不是null
export const isNull = function( value ) {
    return Object.prototype.toString.call( value ).toLowerCase() === '[object null]';
};

// 判断是不是undefined
export const isUndefined = function( value ) {
    return Object.prototype.toString.call( value ).toLowerCase() === '[object undefined]';
};


// 随机生成id
export const generateId = () => {
    return Math.floor( Math.random() * 100000 );
};

// 防抖函数
export const debounce = function( delay, callback ) {
    let timeoutId = null;
    function wrapper() {
        const self = this;
        const args = arguments;
        function exec() {
            callback.apply( self, args );
        }
        if ( timeoutId ) {
            clearTimeout( timeoutId );
        }
        timeoutId = setTimeout( exec, delay );
    }
    return wrapper;
};

// 事件监听
export const on = function( element, event, handler ) {
    if ( document.addEventListener ) {
        if ( element && event && handler ) {
            element.addEventListener( event, handler, false );
        }
    } else {
        if ( element && event && handler ) {
            element.attachEvent( 'on' + event, handler );
        }
    }
};

// 取消事件监听
export const off = function( element, event, handler ) {
    if ( document.removeEventListener ) {
        if ( element && event && handler ) {
            element.removeEventListener( event, handler, false );
        }
    } else {
        if ( element && event ) {
            element.detachEvent( 'on' + event, handler );
        }
    }
};


// 两个数组内容是否相等
export const valueEquals = ( a, b ) => {
    if ( a === b ) return true;
    if ( !( a instanceof Array ) ) return false;
    if ( !( b instanceof Array ) ) return false;
    if ( a.length !== b.length ) return false;
    for ( let i = 0; i < a.length; i++ ) {
        if ( a[ i ] !== b[ i ] ) return false;
    }
    return true;
};
