// Promises/A+官网https://promisesaplus.com/#notes
import is from 'j-is';


class JPromise {
    constructor( executor ) {
        this[ '[[PromiseState]]' ] = 'pending';
        this[ '[[PromiseResult]]' ] = null;
        this[ '[[PromiseThenable]]' ] = [];

        try {
            executor( promiseResolve.bind( null, this ), promiseReject.bind( null, this ) );
        } catch ( e ) {
            promiseReject.bind( null, this )( e );
        }
    }

    static allSettled( promises ) {
        let index = 0;
        const res = [];

        return new JPromise( ( resolve, reject ) => {
            const len = promises.length;
            if ( !len ) {
                resolve( res );
                return;
            }

            const processPromise = ( value, i, status ) => {
                res[ i ] = {
                    status,
                    value,
                };
                if ( ++index === len ) {
                    resolve( res );
                }
            };
            for ( let i = 0; i < len; i++ ) {
                JPromise.resolve( promises[ i ] )
                    .then(
                        ( value ) => {
                            processPromise( value, i, 'fulfilled' );
                        },
                        ( reason ) => {
                            processPromise( reason, i, 'rejected' );
                        },
                    );
            }
        } );
    }

    static all( promises ) {
        let index = 0;
        const res = [];

        return new JPromise( ( resolve, reject ) => {
            const len = promises.length;
            if ( !len ) {
                resolve( res );
                return;
            }

            const processPromise = ( value, i ) => {
                res[ i ] = value;
                if ( ++index === len ) {
                    resolve( res );
                }
            };
            for ( let i = 0; i < len; i++ ) {
                JPromise.resolve( promises[ i ] ).then( ( value ) => {
                    processPromise( value, i );
                }, ( reason ) => {
                    reject( reason );
                } );
            }
        } );
    }

    static race( promises ) {
        return new JPromise( ( resolve, reject ) => {
            const len = promises.length;

            if ( len === 0 ) {
                resolve();
                return;
            }

            for ( let i = 0; i < len; i++ ) {
                JPromise.resolve( promises[ i ] ).then( ( value ) => {
                    resolve( value );
                }, ( reason ) => {
                    reject( reason );
                } );
            }
        } );
    }

    static any( promises ) {
        let index = 0;
        const res = [];

        return new JPromise( ( resolve, reject ) => {
            const len = promises.length;
            if ( len === 0 ) {
                resolve();
                return;
            }

            const processPromise = ( reason, i ) => {
                res[ i ] = reason;
                if ( ++index === len ) {
                    reject( new AggregateError( res ) );
                }
            };
            for ( let i = 0; i < len; i++ ) {
                JPromise.resolve( promises[ i ] ).then( ( value ) => {
                    resolve( value );
                }, ( reason ) => {
                    processPromise( reason, i );
                } );
            }
        } );
    }


    static try( value ) {
        return new JPromise( ( resolve, reject ) => {
            return JPromise.resolve( value() ).then( resolve, reject );
        } );
    }


    static resolve( value ) {
        // 参数是一个Promise对象,不做任何修改、原封不动地返回这个实例
        if ( value instanceof JPromise ) return value;

        return new JPromise( ( resolve, reject ) => {
            if ( value && ( is.object( value.then ) || is.function( value.then ) ) ) {
                // 参数是一个thenable对象,Promise.resolve()方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then()方法
                value.then( resolve.bind( null ), reject.bind( null ) );
            } else {
                // 参数不是具有then()方法的对象，或根本就不是对象和不带有任何参数,这两种情况都返回一个新的Promise对象，状态为resolved
                resolve( value );
            }
        } );
    }

    static reject( reason ) {
        return new JPromise( ( resolve, reject ) => {
            reject( reason );
        } );
    }

    finally( callback ) {
        return this.then(
            () => JPromise.resolve( callback() ),
            () => JPromise.reject( callback() ),
        );
    }

    catch( onRejected ) {
        return this.then( null, onRejected );
    }


    then( onFulfilled, onRejected ) {
        const promise = new JPromise( ()=>{} );
        // then may be called multiple times on the same promise
        this[ '[[PromiseThenable]]' ].push( {
            // If onFulfilled is not a function, it must be ignored.
            onFulfilled: is.function( onFulfilled ) ? onFulfilled : null,
            // If onRejected is not a function, it must be ignored.
            onRejected: is.function( onRejected ) ? onRejected : null,
            called: false,
            promise,
        } );

        if ( this[ '[[PromiseState]]' ] !== 'pending' ) promiseExecute( this );

        return promise;
    }
}

function promiseExecute( promise ) {
    let result; let thenable;

    if ( !promise[ '[[PromiseThenable]]' ].length ) return;

    while ( promise[ '[[PromiseThenable]]' ].length ) {
        thenable = promise[ '[[PromiseThenable]]' ].shift();

        if ( thenable.called ) continue;
        thenable.called = true;

        if ( promise[ '[[PromiseState]]' ] === 'fulfilled' ) {
            // If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
            if ( is.null( thenable.onFulfilled ) ) {
                promiseResolve( thenable.promise, promise[ '[[PromiseResult]]' ] );
                continue;
            }

            // onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
            setTimeout( ( thenable ) => {
                try {
                    // onFulfilled and onRejected must be called as functions (i.e. with no this value).
                    result = thenable.onFulfilled.call( null, promise[ '[[PromiseResult]]' ] );
                    if ( result instanceof JPromise ) {
                        result.then(
                            ( value ) => promiseResolve( thenable.promise, value ),
                            ( value ) => promiseReject( thenable.promise, value ),
                        );
                    } else {
                        promiseResolve( thenable.promise, result );
                    }
                } catch ( e ) {
                    // If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
                    promiseReject( thenable.promise, e );
                }
            }, 0, thenable );
        }

        if ( promise[ '[[PromiseState]]' ] === 'rejected' ) {
            // If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
            if ( is.null( thenable.onRejected ) ) {
                promiseReject( thenable.promise, promise[ '[[PromiseResult]]' ] );
                continue;
            }

            // onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
            setTimeout( ( thenable )=>{
                try {
                    // onFulfilled and onRejected must be called as functions (i.e. with no this value).
                    result = thenable.onRejected.call( null, promise[ '[[PromiseResult]]' ] );
                    if ( result instanceof JPromise ) {
                        result.then(
                            ( value ) => promiseResolve( thenable.promise, value ),
                            ( value ) => promiseReject( thenable.promise, value ),
                        );
                    } else {
                        promiseResolve( thenable.promise, result );
                    }
                } catch ( e ) {
                    // If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
                    promiseReject( thenable.promise, e );
                }
            }, 0, thenable );
        }
    }
}

function promiseReject( promise, reason ) {
    if ( promise[ '[[PromiseState]]' ] !== 'pending' ) return;
    promise[ '[[PromiseState]]' ] = 'rejected';
    promise[ '[[PromiseResult]]' ] = reason;
    promiseExecute( promise );
}

function promiseResolve( promise, value ) {
    if ( promise === value ) {
        throw new TypeError( 'Chaining cycle detected for promise' );
    }

    if ( !is.null( value ) && ( is.function( value ) || is.object( value ) ) ) {
        let then;
        try {
            then = value.then;
        } catch ( e ) {
            promiseReject( promise, e );
            return;
        }
        if ( is.function( then ) ) {
            try {
                then.call(
                    value,
                    promiseResolve.bind( null, promise ),
                    promiseReject.bind( null, promise ),
                );
            } catch ( e ) {
                if ( promise[ '[[PromiseState]]' ] === 'pending' ) {
                    promiseReject( promise, e );
                }
            }
            return;
        }
    }

    if ( promise[ '[[PromiseState]]' ] !== 'pending' ) return;
    promise[ '[[PromiseState]]' ] = 'fulfilled';
    promise[ '[[PromiseResult]]' ] = value;
    promiseExecute( promise );
}


export default JPromise;

/*
 * Promise的特点
 * 对象的状态不受外界影响
 * 一旦状态改变，就不会再变，任何时候都可以得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
 *
 * 立即resolve()的Promise对象，是在本轮事件循环的结束时执行，而不是在下一轮事件循环的开始时，如下
 * setTimeout(function () {console.log('three');}, 0);
 * Promise.resolve().then(function () {console.log('two');});
 * console.log('one');
 * // one two three
 *
 * Promise的缺点
 * 无法取消Promise，一旦新建它就会立即执行，无法中途取消
 * 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
 * 当处于pending状态时，无法得知目前进展到哪一个阶段
 * */
