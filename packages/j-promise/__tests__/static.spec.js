import JPromise from '../src/index.js';

jest.useFakeTimers();

describe( 'JPromise.resolve', ()=> {
    it( 'basie use param is promise', () => {
        const promise = new JPromise( ( resolve, reject )=>{} );
        const promise1 = JPromise.resolve( promise );
        jest.runAllTimers();
        expect( promise ).toEqual( promise1 );
    } );


    it( 'basie use param is thenable object', () => {
        const thenable = {
            then: function( resolve, reject ) {
                resolve( 42 );
            },
        };
        const promise = JPromise.resolve( thenable );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 42 );
    } );


    it( 'basie use param is no thenable object', () => {
        const promise = JPromise.resolve( 'success' );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 'success' );
    } );


    it( 'basie use no param', () => {
        const promise = JPromise.resolve( );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( undefined );
    } );
} );


describe( 'JPromise.reject', ()=> {
    it( 'basie use', () => {
        const promise = JPromise.reject( 'error' );
        const promise1 = promise.catch( ( err )=>err );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'rejected' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 'error' );
        expect( promise1[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise1[ '[[PromiseResult]]' ] ).toEqual( 'error' );
    } );
} );


describe( 'JPromise.all', ()=> {
    it( 'basie use and resolve', () => {
        const p1 = JPromise.resolve( 'success' );
        const p2 = JPromise.resolve();
        const p3 = JPromise.resolve( '1' );
        let result = [];


        const promise = JPromise.all( [ p1, p2, p3 ] );
        const promise1 = promise.then( function( res ) {
            result = res;
        } );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( [ 'success', undefined, '1' ] );
        expect( promise1[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise1[ '[[PromiseResult]]' ] ).toEqual( undefined );
        expect( result ).toEqual( [ 'success', undefined, '1' ] );
    } );


    it( 'basie use and reject', () => {
        const p1 = JPromise.reject( 'error' );
        const p2 = JPromise.resolve();
        const p3 = JPromise.resolve( '1' );
        let result = [];


        const promise = JPromise.all( [ p1, p2, p3 ] );
        const promise1 = promise.then( '', function( res ) {
            result = res;
        } );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'rejected' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 'error' );
        expect( promise1[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise1[ '[[PromiseResult]]' ] ).toEqual( undefined );
        expect( result ).toEqual( 'error' );
    } );

    it( 'a special example', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const p1 = new JPromise( ( resolve, reject ) => {
            resolve( 'hello' );
        } )
            .then( ( result ) => result )
            .catch( ( e ) => e );

        const p2 = new JPromise( ( resolve, reject ) => {
            throw new Error( '报错了' );
        } )
            .then( ( result ) => result )
            .catch( ( e ) => e );

        JPromise.all( [ p1, p2 ] )
            .then( fn1 )
            .catch( fn2 );

        jest.runAllTimers();
        expect( fn1 ).toHaveBeenCalledTimes( 1 );
        expect( fn2 ).toHaveBeenCalledTimes( 0 );
    } );


    it( 'a special example', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const p1 = new JPromise( ( resolve, reject ) => {
            resolve( 'hello' );
        } )
            .then( ( result ) => result )
            .catch( ( e ) => e );

        const p2 = new JPromise( ( resolve, reject ) => {
            throw new Error( '报错了' );
        } )
            .then( ( result ) => result );

        JPromise.all( [ p1, p2 ] )
            .then( fn1 )
            .catch( fn2 );

        jest.runAllTimers();
        expect( fn1 ).toHaveBeenCalledTimes( 0 );
        expect( fn2 ).toHaveBeenCalledTimes( 1 );
    } );

    it( 'basie use and param is []', () => {
        const promise = JPromise.all( [] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( [] );
    } );
} );


describe( 'JPromise.race', ()=> {
    it( 'basie use', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        const p1 = new JPromise( ( resolve, reject )=>{
            setTimeout( () => {
                resolve( 'success' );
            }, 1000 );
        } );
        const p2 = JPromise.reject( 'error' );

        JPromise.race( [ p1, p2 ] ).then( fn1 ).catch( fn2 );
        jest.runAllTimers();
        expect( fn1 ).toHaveBeenCalledTimes( 0 );
        expect( fn2 ).toHaveBeenCalledTimes( 1 );
    } );

    it( 'basie use and reject', () => {
        const p1 = new JPromise( ( resolve, reject )=>{
            setTimeout( () => {
                resolve( 'success' );
            }, 1000 );
        } );
        const p2 = JPromise.reject( 'error' );

        const promise = JPromise.race( [ p1, p2 ] ).then( ( res )=>res ).catch( ( err )=>err );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 'error' );
    } );


    it( 'basie use and resolve', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        const p1 = new JPromise( ( resolve, reject )=>{
            resolve( 'success' );
        } );
        const p2 = new JPromise( ( resolve, reject ) => {
            setTimeout( () => {
                reject( 'error' );
            }, 1000 );
        } );

        JPromise.race( [ p1, p2 ] ).then( fn1 ).catch( fn2 );
        jest.runAllTimers();
        expect( fn1 ).toHaveBeenCalledTimes( 1 );
        expect( fn2 ).toHaveBeenCalledTimes( 0 );
    } );


    it( 'basie use and param is []', () => {
        const promise = JPromise.race( [] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( undefined );
    } );
} );


describe( 'JPromise.any', ()=> {
    it( 'basie use and resolve', () => {
        const resolved = JPromise.resolve( 42 );
        const rejected = JPromise.reject( -1 );
        const alsoRejected = JPromise.reject( Infinity );
        let result;

        const promise = JPromise.any( [ resolved, rejected, alsoRejected ] ).then( function( res ) {
            result = res;
            return res;
        } );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( 42 );
        expect( result ).toEqual( 42 );
    } );


    it( 'basie use and reject', () => {
        const rejected = JPromise.reject( -1 );
        const alsoRejected = JPromise.reject( Infinity );
        let result;

        const promise = JPromise.any( [ rejected, alsoRejected ] ).catch( function( res ) {
            result = res;
            return res;
        } );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ].errors ).toEqual( [ -1, Infinity ] );
        expect( result instanceof AggregateError ).toBe( true );
    } );


    it( 'basie use and param is []', () => {
        const promise = JPromise.any( [] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( undefined );
    } );
} );

describe( 'Promise.allSettled', () => {
    it( 'basie use and param is []', () => {
        const promise = JPromise.allSettled( [] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( [] );
    } );

    it( 'basie use and sync', () => {
        const resolved = JPromise.resolve( 42 );
        const rejected = JPromise.reject( -1 );
        const promise = JPromise.allSettled( [ resolved, rejected ] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( [ { status: 'fulfilled', value: 42 }, { status: 'rejected', value: -1 } ] );
    } );


    it( 'basie use and async', () => {
        const resolved = new JPromise( ( resolve, reject )=> {
            setTimeout( ()=>{
                resolve( 42 );
            }, 1000 );
        } );
        const rejected = new JPromise( ( resolve, reject )=> {
            setTimeout( ()=>{
                reject( -1 );
            }, 1000 );
        } );
        const promise = JPromise.allSettled( [ resolved, rejected ] );
        jest.runAllTimers();
        expect( promise[ '[[PromiseState]]' ] ).toEqual( 'fulfilled' );
        expect( promise[ '[[PromiseResult]]' ] ).toEqual( [ { status: 'fulfilled', value: 42 }, { status: 'rejected', value: -1 } ] );
    } );
} );

describe( 'Promise.try', () => {
    it( 'catch sync error', () => {
        let errMsg = '';
        const fn = () => {
            // eslint-disable-next-line no-throw-literal
            throw '同步错误';
        };
        JPromise.try( fn ).catch( ( err )=> {
            errMsg = err;
        } );

        jest.runAllTimers();
        expect( errMsg ).toBe( '同步错误' );
    } );

    it( 'catch async error', () => {
        let errMsg = '';
        const fn = () => {
            return new JPromise( ( resolve, reject ) => {
                setTimeout( () => {
                    reject( '异步错误' );
                }, 1000 );
            } );
        };
        JPromise.try( fn ).catch( ( err ) => {
            errMsg = err;
        } );
        jest.runAllTimers();
        expect( errMsg ).toBe( '异步错误' );
    } );
} );


