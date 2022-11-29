import JPromise from '../src/index.js';

jest.useFakeTimers();

describe( 'JPromise', ()=> {
    describe( 'JPromise.prototype.then', () => {
        it( 'basie use and sync resolve', () => {
            let p;
            p = new JPromise( ( resolve, reject )=>{
                resolve( 'success' );
            } );
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use and async resolve', () => {
            let p;
            p = new JPromise( ( resolve, reject )=>{
                setTimeout( ()=>{
                    resolve( 'success' );
                }, 1000 );
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use and throw error', () => {
            let p;
            p = new JPromise( ( resolve, reject )=>{
                throw 'error';
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );


        it( 'basie use and sync resolve', () => {
            let result;
            let p;

            p = new JPromise( ( resolve, reject )=> {
                resolve( 'hello' );
            } ).then( ( res )=> {
                result = res;
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( undefined );
            expect( result ).toBe( 'hello' );
        } );

        it( 'basie use and sync resolve and return value', () => {
            let result;
            let p;

            p = new JPromise( ( resolve, reject )=> {
                resolve( 'hello' );
            } ).then( ( res )=> {
                result = res;
                return res;
            } );


            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'hello' );
            expect( result ).toBe( 'hello' );
        } );

        it( 'basie use and sync resolve and mock fn', () => {
            const fn1 = jest.fn();
            const fn2 = jest.fn();
            const p = new JPromise( ( resolve, reject )=> {
                resolve( 'hello' );
            } ).then( fn1, fn2 );
            jest.runAllTimers();
            expect( fn1 ).toHaveBeenCalledTimes( 1 );
            expect( fn2 ).toHaveBeenCalledTimes( 0 );
        } );

        it( 'basie use and async resolve', () => {
            let result;
            let p;

            p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    resolve( 'hello' );
                }, 1000 );
            } ).then( ( res )=> {
                result = res;
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( undefined );
            expect( result ).toBe( 'hello' );
        } );

        it( 'basie use and async resolve and return value', () => {
            let result;
            let p;

            p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    resolve( 'hello' );
                }, 1000 );
            } ).then( ( res )=> {
                result = res;
                return res;
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'hello' );
            expect( result ).toBe( 'hello' );
        } );


        it( 'basie use and sync reject', () => {
            let result;
            let p;
            const fn = jest.fn();

            p = new JPromise( ( resolve, reject )=> {
                reject( 'error' );
            } ).then( fn, ( err ) => {
                result = err;
            } );


            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( undefined );
            expect( result ).toBe( 'error' );
            expect( fn ).toHaveBeenCalledTimes( 0 );
        } );


        it( 'basie use and sync reject and return value', () => {
            let p;

            const fn = jest.fn();

            p = new JPromise( ( resolve, reject )=> {
                reject( 'error' );
            } ).then( fn, ( err )=>err );


            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and sync reject and mock fn', () => {
            const fn1 = jest.fn();
            const fn2 = jest.fn();
            const p = new JPromise( ( resolve, reject )=> {
                reject( 'error' );
            } ).then( fn1, fn2 );
            jest.runAllTimers();
            expect( fn1 ).toHaveBeenCalledTimes( 0 );
            expect( fn2 ).toHaveBeenCalledTimes( 1 );
        } );

        it( 'basie use and async reject', () => {
            let result;
            let p;

            p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    reject( 'error' );
                }, 1000 );
            } ).then( ()=>{}, ( err )=> {
                result = err;
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( undefined );
            expect( result ).toBe( 'error' );
        } );

        it( 'basie use and async reject and return value', () => {
            let p;


            p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    reject( 'error' );
                }, 1000 );
            } ).then( ()=>{}, ( err )=> err );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and sync resolve and onFulfilled is not function', () => {
            const p = new JPromise( ( resolve, reject )=> {
                resolve( 'success' );
            } ).then( '', ( err )=> err );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use and async resolve and onFulfilled is not function', () => {
            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    resolve( 'success' );
                }, 1000 );
            } ).then( '', ( err )=> err );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use and sync reject and onRejected is not function', () => {
            const p = new JPromise( ( resolve, reject )=> {
                reject( 'error' );
            } ).then();

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and async reject and onRejected is not function', () => {
            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    reject( 'error' );
                }, 1000 );
            } ).then();

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and sync resolve and onFulfilled call throw error', () =>{
            const p = new JPromise( ( resolve, reject )=> {
                resolve( 'success' );
            } ).then( ()=>{
                throw 'error';
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and async resolve and onFulfilled call throw error', () =>{
            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    resolve( 'success' );
                }, 1000 );
            } ).then( ()=>{
                throw 'error';
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );


        it( 'basie use and sync reject and onRejected call throw error', () =>{
            const p = new JPromise( ( resolve, reject )=> {
                reject( 'promise error' );
            } ).then( ()=>{
            }, () => {
                throw 'error';
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and async reject and onRejected call throw error', () =>{
            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    reject( 'promise error' );
                }, 1000 );
            } ).then( ()=>{}, ()=>{
                throw 'error';
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and sync resolve and onFulfilled called return object', () => {
            const p = new JPromise( ( resolve, reject )=> {
                resolve( 'success' );
            } ).then( ( res )=>{
                return {
                    value: res,
                };
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( {
                value: 'success',
            } );
        } );

        it( 'basie use and async resolve and onFulfilled called return object', () => {
            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    resolve( 'success' );
                }, 1000 );
            } ).then( ( res )=>{
                return {
                    value: res,
                };
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( {
                value: 'success',
            } );
        } );

        it( 'basie use and sync reject and onRejected called return object', () => {
            const error = new Error( 'error' );

            const p = new JPromise( ( resolve, reject )=> {
                reject( error );
            } ).then( ( res )=>{}, ( err )=>{
                return {
                    value: err,
                };
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( {
                value: error,
            } );
        } );

        it( 'basie use and async reject and onRejected called return object', () => {
            const error = new Error( 'error' );

            const p = new JPromise( ( resolve, reject )=> {
                setTimeout( ()=>{
                    reject( error );
                }, 1000 );
            } ).then( ( res )=>{}, ( err )=>{
                return {
                    value: err,
                };
            } );

            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( {
                value: error,
            } );
        } );


        it( 'basie use resolve and multiple then', () => {
            const p = new JPromise( ( resolve, reject )=>{
                setTimeout( ()=>{
                    expect( p[ '[[PromiseThenable]]' ].length ).toBe( 2 );
                    resolve( 'success' );
                }, 1000 );
            } );

            const p1 = p.then( ( res )=>res );
            const p2 = p.then( ( res )=>res );


            jest.runAllTimers();
            expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p1[ '[[PromiseResult]]' ] ).toBe( 'success' );
            expect( p2[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p2[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use reject and multiple then', () => {
            const p = new JPromise( ( resolve, reject )=>{
                setTimeout( ()=>{
                    expect( p[ '[[PromiseThenable]]' ].length ).toBe( 2 );
                    reject( 'error' );
                }, 1000 );
            } );

            const p1 = p.then( '', ( res )=>res );
            const p2 = p.then( '', ( res )=>res );


            jest.runAllTimers();
            expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p1[ '[[PromiseResult]]' ] ).toBe( 'error' );
            expect( p2[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p2[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );


        it( 'basie use and call resolve first and then reject', () => {
            const p = new JPromise( ( resolve, reject )=>{
                resolve( 'success' );
                reject( 'error' );
            } );
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'success' );
        } );

        it( 'basie use and call reject first and then resolve', () => {
            const p = new JPromise( ( resolve, reject )=>{
                reject( 'error' );
                resolve( 'success' );
            } );
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'error' );
        } );

        it( 'basie use and param is promise', () => {
            const p = new JPromise( ( resolve ) => {
                resolve(
                    new JPromise( ( resolve ) => {
                        resolve( 'resolve' );
                    } ),
                );
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( 'resolve' );
        } );


        it( 'basie use and param is promise and pending', () => {
            const p = new JPromise( ( resolve ) => {
                resolve(
                    new JPromise( ( resolve, reject )=>{} ),
                );
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'pending' );
            expect( p[ '[[PromiseResult]]' ] ).toBe( null );
        } );


        describe( 'onFulfilled and onRejected called return same promise', () => {
            it( 'cycle', () => {
                let fn;
                const p = new JPromise( ( resolve, reject )=> {
                    fn = resolve;
                } );

                expect( ()=>{
                    fn( p );
                } ).toThrow( 'Chaining cycle detected for promise' );
            } );
        } );


        describe( 'onFulfilled and onRejected called return function', () => {
            it( 'sync resolve', () => {
                const fn = ( resolve, reject ) => {
                    let num = 0;
                    resolve( ++num );
                };

                const object = {
                    then: fn,
                };

                let result;

                const p = new JPromise( ( resolve, reject )=> {
                    resolve( 'success' );
                } ).then( ( res )=>{
                    return object;
                }, ( err )=>err );
                const p1 = p.then( ( res )=> result = res );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( result ).toEqual( 1 );
            } );


            it( 'async resolve', () => {
                const fn = ( resolve, reject ) => {
                    let num = 0;
                    resolve( ++num );
                };

                const object = {
                    then: fn,
                };

                let result;

                const p = new JPromise( ( resolve, reject )=> {
                    setTimeout( ()=>{
                        resolve( 'success' );
                    }, 1000 );
                } ).then( ( res )=>{
                    return object;
                }, ( err )=>err );
                const p1 = p.then( ( res )=> result = res );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( result ).toEqual( 1 );
            } );


            it( 'sync reject', () => {
                const fn = ( resolve, reject ) => {
                    let num = 0;
                    resolve( ++num );
                };

                const object = {
                    then: fn,
                };

                let result;

                const p = new JPromise( ( resolve, reject )=> {
                    reject( 'success' );
                } ).then( ( res )=>{
                    return object;
                }, ( err )=>{
                    return object;
                } );
                const p1 = p.then( ( res )=> result = res );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( result ).toEqual( 1 );
            } );


            it( 'async reject', () => {
                const fn = ( resolve, reject ) => {
                    let num = 0;
                    reject( ++num );
                };

                const object = {
                    then: fn,
                };

                let result;

                const p = new JPromise( ( resolve, reject )=> {
                    setTimeout( ()=>{
                        reject( 'error' );
                    }, 1000 );
                } ).then( ( res )=>object, ( err )=>object );
                const p1 = p.then( '', ( err )=> {
                    result = err;
                } );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 1 );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( undefined );
                expect( result ).toEqual( 1 );
            } );


            it( 'object.then is throw', () => {
                const object = {
                    then: ()=>{
                        throw 'error';
                    },
                };

                const p = new JPromise( ( resolve, reject )=> {
                    resolve( 'success' );
                } ).then( ( res )=>{
                    return object;
                }, ( err )=>err );
                const p1 = p.then( '', ( err )=>err );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'error' );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 'error' );
            } );


            it( 'object.then is throw and already resolve', () => {
                const object = {
                    then: ( resolve, reject )=>{
                        resolve( 'success' );
                        throw 'error';
                    },
                };


                const p = new JPromise( ( resolve, reject )=> {
                    resolve( 'success' );
                } ).then( ( res )=>{
                    return object;
                }, ( err )=>err );
                const p1 = p.then( ( res )=>res, ( err )=>err );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'success' );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 'success' );
            } );


            it( 'object.then is throw and already reject', () => {
                const object = {
                    then: ( resolve, reject )=>{
                        reject( 'is error' );
                        throw 'error';
                    },
                };


                const p = new JPromise( ( resolve, reject )=> {
                    reject( 'error' );
                } ).then( ( res )=>{
                    return object;
                }, () => {
                    return object;
                } );
                const p1 = p.then( ( res )=>res, ( err )=>err );
                jest.runAllTimers();

                expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'is error' );
                expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p1[ '[[PromiseResult]]' ] ).toEqual( 'is error' );
            } );
        } );


        describe( 'onFulfilled and onRejected called return promise', () => {
            it( 'sync resolve and return promise is sync resolve', () => {
                const p = new JPromise( ( resolve, reject )=>{
                    resolve( 'success' );
                } ).then( ( res ) => {
                    return new JPromise( ( resolve, reject )=>{
                        resolve( res );
                    } );
                } ).then( ( res )=>res );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'success' );
            } );


            it( 'async resolve and return promise is sync resolve', () => {
                const p = new JPromise( ( resolve, reject )=>{
                    setTimeout( ()=>{
                        resolve( 'success' );
                    }, 1000 );
                } ).then( ( res ) => {
                    return new JPromise( ( resolve, reject )=>{
                        resolve( res );
                    } );
                } ).then( ( res )=>res );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'success' );
            } );

            it( 'async reject and return promise is async resolve', () => {
                const p = new JPromise( ( resolve, reject )=>{
                    setTimeout( ()=>{
                        reject( 'error' );
                    }, 1000 );
                } ).then( '', ( err ) => {
                    return new JPromise( ( resolve, reject )=>{
                        setTimeout( ()=>{
                            resolve( err );
                        }, 1000 );
                    } );
                } ).then( ( res )=>res );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'error' );
            } );


            it( 'async resolve and return promise is async reject', () => {
                const p = new JPromise( ( resolve, reject )=>{
                    setTimeout( ()=>{
                        resolve( 'success' );
                    }, 1000 );
                } ).then( ( res ) => {
                    return new JPromise( ( resolve, reject )=>{
                        setTimeout( ()=>{
                            reject( res );
                        }, 1000 );
                    } );
                } ).then( ( res )=>res, ( err )=>err );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'success' );
            } );


            it( 'async reject and return promise is async reject', () => {
                const p = new JPromise( ( resolve, reject )=>{
                    setTimeout( ()=>{
                        reject( 'error' );
                    }, 1000 );
                } ).then( '', ( res ) => {
                    return new JPromise( ( resolve, reject )=>{
                        setTimeout( ()=>{
                            reject( res );
                        }, 1000 );
                    } );
                } ).then( ( res )=>res, ( err )=>err );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( 'error' );
            } );

            it( 'pending', () => {
                const fn = jest.fn();
                const fn1 = jest.fn();

                const p = new JPromise( ( resolve, reject )=>{
                    setTimeout( ()=>{
                        resolve( 'success' );
                    }, 1000 );
                } ).then( ( res ) => {
                    return new JPromise( ( resolve, reject )=>{
                    } );
                } ).then( fn, fn1 );

                jest.runAllTimers();
                expect( p[ '[[PromiseState]]' ] ).toBe( 'pending' );
                expect( p[ '[[PromiseResult]]' ] ).toEqual( null );
                expect( fn ).toHaveBeenCalledTimes( 0 );
                expect( fn1 ).toHaveBeenCalledTimes( 0 );
            } );
        } );
    } );


    describe( 'JPromise.prototype.catch', () => {
        it( 'basie use and sync reject', () => {
            const p = new JPromise( ( resolve, reject )=>{
                reject( 'err' );
            } ).catch( ( err )=>err );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( 'err' );
        } );

        it( 'basie use and async reject', () => {
            const p = new JPromise( ( resolve, reject )=>{
                setTimeout( ()=>{
                    reject( 'err' );
                }, 1000 );
            } ).then( '', '' );
            const p1 = p.catch( ( err )=>err );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( 'err' );
            expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p1[ '[[PromiseResult]]' ] ).toEqual( 'err' );
        } );
    } );


    describe( 'JPromise.prototype.finally', () => {
        it( 'basie use and async resolve', () => {
            let num = 10;

            const p = new JPromise( ( resolve, reject ) => {
                setTimeout( () => {
                    resolve( 'success' );
                }, 1000 );
            } );
            const p1 = p.finally( ()=>{
                num++;
                return num;
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( 'success' );
            expect( p1[ '[[PromiseState]]' ] ).toBe( 'fulfilled' );
            expect( p1[ '[[PromiseResult]]' ] ).toEqual( 11 );
            expect( num ).toEqual( 11 );
        } );


        it( 'basie use and async rejected', () => {
            let num = 10;

            const p = new JPromise( ( resolve, reject ) => {
                setTimeout( () => {
                    reject( 'error' );
                }, 1000 );
            } );
            const p1 = p.finally( ()=>{
                num++;
                return num;
            } );
            jest.runAllTimers();
            expect( p[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p[ '[[PromiseResult]]' ] ).toEqual( 'error' );
            expect( p1[ '[[PromiseState]]' ] ).toBe( 'rejected' );
            expect( p1[ '[[PromiseResult]]' ] ).toEqual( 11 );
            expect( num ).toEqual( 11 );
        } );
    } );
} );

