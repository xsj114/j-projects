import { on } from '@utils/utils';

const nodeList = [];

let startClick;

let seed = 0;

const ctx = '@@clickoutside';


on( document, 'mousedown', ( e ) => ( startClick = e ) );
on( document, 'mouseup', ( e ) => {
    nodeList.forEach( ( node ) => node[ ctx ].documentHandle( e, startClick ) );
} );

export default {
    bind( el, binding, vnode ) {
        nodeList.push( el );
        const id = seed++;
        el[ ctx ] = {
            id,
            documentHandle: createDocumentHandle( el, binding, vnode ),
            bindingFn: binding.value,
            methodName: binding.expression,
        };
    },
    unbind( el ) {
        const len = nodeList.length;
        for ( let i = 0; i < len; i++ ) {
            if ( nodeList[ i ][ ctx ].id === el[ ctx ].id ) {
                nodeList.splice( i, 1 );
                break;
            }
        }
        delete el[ ctx ];
    },
};

const createDocumentHandle = ( el, binding, vnode ) => {
    return function( mouseup, mousedown ) {
        if (
            !vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target ||
            el.contains( mouseup.target ) ||
            el.contains( mousedown.target ) ||
            ( vnode.context.popperElement &&
            (
                vnode.context.popperElement.contains( mousedown.target ) ||
                vnode.context.popperElement.contains( mouseup.target )
            )
            )
        ) {
            return;
        }

        if ( binding.expression && el[ ctx ].methodName && vnode.context[ el[ ctx ].methodName ] ) {
            // 测试时使用
            vnode.context[ el[ ctx ].methodName ]();
        } else {
            el[ ctx ].bindingFn && el[ ctx ].bindingFn();
        }
    };
};


