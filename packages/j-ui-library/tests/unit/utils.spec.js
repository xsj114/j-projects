import {
    debounce,
    isObject,
    isNull,
    isUndefined,
    generateId,
    valueEquals,
    getValueByPath,
    on,
    off,
} from '@utils/utils';

describe( 'utils', () => {
    describe( 'debounce', () => {
        beforeEach( () => {
            jest.useFakeTimers();
        } );

        test( 'debounce', () => {
            const fn = jest.fn();

            const debounceFn = debounce( 2000, fn );
            debounceFn();
            expect( setTimeout ).toHaveBeenCalledTimes( 1 );
            expect( setTimeout ).toHaveBeenCalledWith( expect.any( Function ), 2000 );

            jest.runAllTimers();
            expect( fn ).toHaveBeenCalledTimes( 1 );
        } );

        test( 'fast call debounce', () => {
            const fn = jest.fn();

            const debounceFn = debounce( 2000, fn );
            debounceFn();
            debounceFn();
            expect( setTimeout ).toHaveBeenCalledTimes( 2 );
            expect( clearTimeout ).toHaveBeenCalledTimes( 1 );

            jest.runAllTimers();
            expect( fn ).toHaveBeenCalledTimes( 1 );
        } );

        afterEach( () => {
            jest.clearAllTimers();
        } );
    } );

    describe( 'isObject', () => {
        test( 'value is null', () => {
            expect( isObject( null ) ).toBe( false );
        } );

        test( 'value is undefined', () => {
            expect( isObject( undefined ) ).toBe( false );
        } );


        test( 'value is string', () => {
            expect( isObject( 'test' ) ).toBe( false );
        } );


        test( 'value is number', () => {
            expect( isObject( 1 ) ).toBe( false );
        } );

        test( 'value is boolean', () => {
            expect( isObject( true ) ).toBe( false );
            expect( isObject( false ) ).toBe( false );
        } );

        test( 'value is symbol', () => {
            const symbol = Symbol();
            expect( isObject( symbol ) ).toBe( false );
        } );

        test( 'value is function', () => {
            expect( isObject( ()=>{} ) ).toBe( false );
        } );

        test( 'value is array', () => {
            expect( isObject( [ 1, 2 ] ) ).toBe( false );
        } );

        test( 'value is set', () => {
            const set = new Set();
            expect( isObject( set ) ).toBe( false );
        } );

        test( 'value is map', () => {
            const map = new Map();
            expect( isObject( map ) ).toBe( false );
        } );


        test( 'value is class', () => {
            const classObject = class {};
            expect( isObject( classObject ) ).toBe( false );
        } );


        test( 'object', () => {
            const object = {};
            expect( isObject( object ) ).toBe( true );
        } );
    } );


    describe( 'isNull', () => {
        test( 'value is null', () => {
            expect( isNull( null ) ).toBe( true );
        } );

        test( 'value is undefined', () => {
            expect( isNull( undefined ) ).toBe( false );
        } );


        test( 'value is string', () => {
            expect( isNull( 'test' ) ).toBe( false );
        } );


        test( 'value is number', () => {
            expect( isNull( 1 ) ).toBe( false );
        } );

        test( 'value is boolean', () => {
            expect( isNull( true ) ).toBe( false );
            expect( isNull( false ) ).toBe( false );
        } );

        test( 'value is symbol', () => {
            const symbol = Symbol();
            expect( isNull( symbol ) ).toBe( false );
        } );

        test( 'value is function', () => {
            expect( isNull( ()=>{} ) ).toBe( false );
        } );

        test( 'value is array', () => {
            expect( isNull( [ 1, 2 ] ) ).toBe( false );
        } );

        test( 'value is set', () => {
            const set = new Set();
            expect( isNull( set ) ).toBe( false );
        } );

        test( 'value is map', () => {
            const map = new Map();
            expect( isNull( map ) ).toBe( false );
        } );


        test( 'value is class', () => {
            const classObject = class {};
            expect( isNull( classObject ) ).toBe( false );
        } );


        test( 'object', () => {
            const object = {};
            expect( isNull( object ) ).toBe( false );
        } );
    } );


    describe( 'isUndefined', () => {
        test( 'value is null', () => {
            expect( isUndefined( null ) ).toBe( false );
        } );

        test( 'value is undefined', () => {
            expect( isUndefined( undefined ) ).toBe( true );
        } );


        test( 'value is string', () => {
            expect( isUndefined( 'test' ) ).toBe( false );
        } );


        test( 'value is number', () => {
            expect( isUndefined( 1 ) ).toBe( false );
        } );

        test( 'value is boolean', () => {
            expect( isUndefined( true ) ).toBe( false );
            expect( isUndefined( false ) ).toBe( false );
        } );

        test( 'value is symbol', () => {
            const symbol = Symbol();
            expect( isUndefined( symbol ) ).toBe( false );
        } );

        test( 'value is function', () => {
            expect( isUndefined( ()=>{} ) ).toBe( false );
        } );

        test( 'value is array', () => {
            expect( isUndefined( [ 1, 2 ] ) ).toBe( false );
        } );

        test( 'value is set', () => {
            const set = new Set();
            expect( isUndefined( set ) ).toBe( false );
        } );

        test( 'value is map', () => {
            const map = new Map();
            expect( isUndefined( map ) ).toBe( false );
        } );


        test( 'value is class', () => {
            const classObject = class {};
            expect( isUndefined( classObject ) ).toBe( false );
        } );


        test( 'object', () => {
            const object = {};
            expect( isUndefined( object ) ).toBe( false );
        } );
    } );


    describe( 'valueEquals', () => {
        describe( 'both values are basic types', () => {
            test( 'both value is string', () => {
                expect( valueEquals( 'test', 'test' ) ).toBe( true );
                expect( valueEquals( 'test', 'test-two' ) ).toBe( false );
            } );

            test( 'both value is number', () => {
                expect( valueEquals( 1, 1 ) ).toBe( true );
                expect( valueEquals( 1, 2 ) ).toBe( false );
            } );

            test( 'both value is null', () => {
                expect( valueEquals( null, null ) ).toBe( true );
            } );

            test( 'both value is undefined', () => {
                expect( valueEquals( undefined, undefined ) ).toBe( true );
            } );

            test( 'both value is undefined', () => {
                expect( valueEquals( true, true ) ).toBe( true );
                expect( valueEquals( false, false ) ).toBe( true );
                expect( valueEquals( true, false ) ).toBe( false );
            } );
        } );

        describe( 'value not is basic type', () => {
            test( 'both values only have one array', () => {
                expect( valueEquals( 1, [ 1, 2, 3 ] ) ).toBe( false );
                expect( valueEquals( [ 1, 2 ], 'test' ) ).toBe( false );
            } );

            test( 'both value are array', () => {
                expect( valueEquals( [ 1, 2, 3 ], [ 1, 2 ] ) ).toBe( false );
                expect( valueEquals( [ 1, 2, 3 ], [ 1, 2, 3 ] ) ).toBe( true );
                expect( valueEquals( [ '1', '2', '3', true ], [ '1', '2', '3', true ] ) ).toBe( true );
                expect( valueEquals( [ '1', 2, '3' ], [ '1', '2', '3' ] ) ).toBe( false );
            } );
        } );
    } );

    describe( 'getValueByPath', () => {
        test( 'getValueByPath', () => {
            expect( getValueByPath( { a: 1 }, 'a' ) ).toBe( 1 );
            expect( getValueByPath( { a: { b: 2 } }, 'a.b' ) ).toBe( 2 );
            expect( getValueByPath( {
                a: {
                    b: {
                        c: 4,
                    },
                },
            }, 'a.b.c' ) ).toBe( 4 );

            expect( getValueByPath( {
                a: {
                    b: {
                        c: 4,
                    },
                },
            }, 'a.b' ) ).toEqual( { c: 4 } );

            expect( getValueByPath( null, 'a' ) ).toBe( null );
            expect( getValueByPath( { a: 1 } ) ).not.toBeDefined();
        } );
    } );


    describe( 'on', () => {
        describe( 'on and addEventListener exists', () => {
            test( 'paramer exists', () => {
                const dom = document.createElement( 'div' );
                const fn = jest.fn();
                on( dom, 'click', fn );
                dom.click();
                expect( fn ).toHaveBeenCalledTimes( 1 );
            } );

            test( 'paramer not exists', () => {
                const dom = document.createElement( 'div' );
                const fn = jest.fn();
                on( dom, fn );
                dom.click();
                expect( fn ).toHaveBeenCalledTimes( 0 );
            } );
        } );

        describe( 'on and addEventListener not exists', () => {
            beforeEach( () => {
                Object.defineProperty( document, 'addEventListener', {
                    writable: true,
                    value: undefined,
                } );
            } );

            test( 'paramer exists', () => {
                const dom = document.createElement( 'div' );
                dom.attachEvent = jest.fn();

                const fn = jest.fn();
                on( dom, 'click', fn );
                dom.click();
                expect( dom.attachEvent ).toHaveBeenCalledTimes( 1 );
            } );

            test( 'paramer not exists', () => {
                const dom = document.createElement( 'div' );
                dom.attachEvent = jest.fn();
                on( dom );
                dom.click();
                expect( dom.attachEvent ).toHaveBeenCalledTimes( 0 );
            } );
        } );
    } );


    describe( 'off', () => {
        describe( 'off and removeEventListener exists', () => {
            test( 'paramer exists', () => {
                const dom = document.createElement( 'div' );
                dom.removeEventListener = jest.fn();

                const fn = jest.fn();
                off( dom, 'click', fn );

                expect( dom.removeEventListener ).toHaveBeenCalledTimes( 1 );
            } );

            test( 'paramer not exists', () => {
                const dom = document.createElement( 'div' );
                dom.removeEventListener = jest.fn();

                off( dom );
                expect( dom.removeEventListener ).toHaveBeenCalledTimes( 0 );
            } );
        } );


        describe( 'off and removeEventListener not exists', () => {
            beforeEach( () => {
                Object.defineProperty( document, 'removeEventListener', {
                    writable: true,
                    value: undefined,
                } );
            } );

            test( 'paramer exists', () => {
                const dom = document.createElement( 'div' );
                dom.detachEvent = jest.fn();
                off( dom, 'click', jest.fn() );
                expect( dom.detachEvent ).toHaveBeenCalledTimes( 1 );
            } );

            test( 'paramer not exists', () => {
                const dom = document.createElement( 'div' );
                dom.detachEvent = jest.fn();
                off( dom );
                expect( dom.detachEvent ).toHaveBeenCalledTimes( 0 );
            } );
        } );
    } );


    describe( 'generateId', () => {
        test( 'generateId', () => {
            jest.spyOn( global.Math, 'random' ).mockReturnValue( 0.12345 );
            expect( generateId() ).toBe( 12345 );
        } );
    } );
} );


