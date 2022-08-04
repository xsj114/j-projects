const HttpCode = require( '../src/index.js' );

let c = null;

beforeEach( () => {
    c = new HttpCode();
} );

it( 'test all codes exist', () => {
    expect( c.codes.size ).toBe( 63 );
} );

it( 'test static property', () => {
    HttpCode.lang = 'en';
    expect( c.get( '307' ) ).toBe( 'Temporary Redirect' );
    HttpCode.lang = 'cn';
} );

it( 'test get method', () => {
    expect( c.get( 307 ) ).toEqual( '临时跳转' );
    try {
        expect( c.get( [ 301 ] ) ).toThrow();
    } catch ( e ) {
        expect( e.message ).toBe( 'first param must be string or number' );
    }
} );

it( 'test set method', () => {
    c.set( 304, '未修改!' );
    expect( c.get( 304 ) ).toEqual( '未修改!' );
    c.set( 301, {
        cn: '永久移动!',
    } );
    expect( c.get( 301 ) ).toEqual( '永久移动!' );
} );

it( 'test set param', () => {
    try {
        expect( c.set( 301, [ '永久移动!' ] ) ).toThrow();
    } catch ( e ) {
        expect( e.message ).toBe( 'second param must be string or object' );
    }
    try {
        expect( c.set( { 301: '301' } ) ).toThrow();
    } catch ( e ) {
        expect( e.message ).toBe( 'first param must be string or number' );
    }
} );

