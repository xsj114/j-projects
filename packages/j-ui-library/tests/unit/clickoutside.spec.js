import clickoutside from '@utils/clickoutside';
import { triggerClick } from '../util';

const ctx = '@@clickoutside';

describe( 'clickoutside', () => {
    test( 'create', () => {
        const fn = jest.fn();

        const el = document.createElement( 'div' );
        const vnode = {
            context: {},
        };

        const binding = {
            value: fn,
        };
        clickoutside.bind( el, binding, vnode );

        expect( el[ ctx ] ).toBeTruthy();
        expect( el[ ctx ].documentHandle ).toEqual( expect.any( Function ) );
        expect( el[ ctx ].bindingFn ).toEqual( expect.any( Function ) );
    } );


    test( 'context not exist', () => {
        const fn = jest.fn();

        const el = document.createElement( 'div' );
        const vnode = {};
        const binding = {
            value: fn,
        };
        clickoutside.bind( el, binding, vnode );
        triggerClick( el );
        expect( fn ).not.toHaveBeenCalled();
    } );

    test( 'click inside', () => {
        const fn = jest.fn();
        const el = document.createElement( 'div' );
        const insideElm = document.createElement( 'div' );
        const vnode = {
            context: {
            },
        };
        const binding = {
            value: fn,
        };
        el.appendChild( insideElm );
        clickoutside.bind( el, binding, vnode );
        triggerClick( insideElm );
        expect( fn ).not.toHaveBeenCalled();
        triggerClick( document );
        expect( fn ).toHaveBeenCalledTimes( 1 );
    } );


    test( 'click popperElement', () => {
        let count = 0;
        const el = document.createElement( 'div' );
        const insideElm = document.createElement( 'div' );
        const vnode = {
            context: {
                handleClick: () => count++,
                popperElement: document.createElement( 'div' ),
            },
        };
        const binding = {
            expression: 'handleClick',
        };

        vnode.context.popperElement.appendChild( insideElm );
        clickoutside.bind( el, binding, vnode );
        triggerClick( insideElm );
        expect( count ).toBe( 0 );
        triggerClick( document );
        expect( count ).toBe( 1 );
    } );


    test( 'unbind', () => {
        const fn = jest.fn();
        const el = document.createElement( 'div' );
        const vnode = {
            context: {},
        };
        const binding = {
            value: fn,
        };
        clickoutside.bind( el, binding, vnode );
        triggerClick( document );
        expect( fn ).toHaveBeenCalledTimes( 1 );
        clickoutside.unbind( el );
        triggerClick( document );
        expect( fn ).toHaveBeenCalledTimes( 1 );
    } );
} );
