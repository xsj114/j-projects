import isArguments from './arguments';
import isArray from './array';
import isAsyncFunction from './async-function';
import isBoolean from './boolean';
import isDate from './date';
import isError from './error';
import isFormdata from './formdata';
import isFunction from './function';
import isIterable from './iterable';
import isMap from './map';
import isNull from './null';
import isNumber from './number';
import isObject from './object';
import isPromise from './promise';
import isRegexp from './regexp';
import isSet from './set';
import isString from './string';
import isSymbol from './symbol';
import isUndefined from './undefined';
import isWeakMap from './weak-map';
import isWeakSet from './weak-set';
import isWindow from './window';


interface Is {
    [key: string]: ( arg?: unknown, ...rest: unknown[] ) => boolean
}

const is: Is = {
    arguments: isArguments,
    array: isArray,
    asyncFunction: isAsyncFunction,
    boolean: isBoolean,
    date: isDate,
    error: isError,
    formdata: isFormdata,
    function: isFunction,
    iterable: isIterable,
    map: isMap,
    null: isNull,
    number: isNumber,
    object: isObject,
    promise: isPromise,
    regexp: isRegexp,
    set: isSet,
    string: isString,
    symbol: isSymbol,
    undefined: isUndefined,
    weakmap: isWeakMap,
    weakset: isWeakSet,
    window: isWindow,
};

export default is;
module.exports = is;
module.exports.default = is;
