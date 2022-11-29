import EventEmitter from '../src/index.js';

let ev;

beforeEach( () => {
    ev = new EventEmitter();
} );

it( 'test on method', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    ev.on( 'info', fn1 );
    ev.on( 'info', fn2 );
    expect( ev._listeners.size ).toBe( 1 );
    expect( ev._listeners.get( 'info' ).size ).toBe( 2 );
} );


describe( 'test emit method', () => {
    it( 'emit call', () => {
        const fn = jest.fn();
        ev.on( 'info', fn );
        ev.emit( 'info', 3, 4 );
        expect( fn.mock.calls ).toEqual( [ [ 3, 4 ] ] );
        expect( fn ).toHaveBeenCalledTimes( 1 );
    } );

    it( 'emit call no handlers', () => {
        expect( ev.emit( 'error' ) ).toBe( false );
    } );
} );

it( 'test once method', () => {
    const fn = jest.fn();
    ev.once( 'info', fn );
    ev.emit( 'info', 1, 2 );
    expect( fn.mock.calls ).toEqual( [ [ 1, 2 ] ] );
    ev.emit( 'info', 5, 6 );
    expect( fn ).toHaveBeenCalledTimes( 1 );
} );

describe( 'test removeListener method', () => {
    it( 'removeListener call', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        expect( ev._listeners.get( 'info' ).size ).toBe( 2 );
        ev.removeListener( 'info', fn1 );
        expect( ev._listeners.get( 'info' ).size ).toBe( 1 );
    } );

    it( 'removeListener call no handlers', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        expect( ev.removeListener( 'error', fn1 ) ).toBe( false );
        expect( ev._listeners.get( 'info' ).size ).toBe( 2 );
    } );
} );

describe( 'test removeAllListeners method', () => {
    it( 'test rule is all', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        ev.on( 'error', fn3 );
        ev.removeAllListeners( 'all' );
        expect( ev._listeners.size ).toBe( 0 );
    } );

    it( 'test rule is string', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        ev.on( 'error', fn3 );
        ev.removeAllListeners( 'info' );
        expect( ev._listeners.size ).toBe( 1 );
        expect( ev._listeners.get( 'error' ).size ).toBe( 1 );
        expect( ev._listeners.get( 'error' ).has( fn3 ) ).toBe( true );
    } );

    it( 'test rule is fn', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        ev.on( 'error', fn3 );
        ev.removeAllListeners( ( name )=>{
            return name === 'error';
        } );
        expect( ev._listeners.size ).toBe( 1 );
        expect( ev._listeners.get( 'info' ).size ).toBe( 2 );
    } );

    it( 'test rule is array', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        ev.on( 'info', fn1 );
        ev.on( 'info', fn2 );
        ev.on( 'error', fn3 );
        ev.removeAllListeners( [ 'info', 'error' ] );
        expect( ev._listeners.size ).toBe( 0 );
    } );
} );


